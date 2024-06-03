

const Presupuesto =require('../servicios/presupuestos_service.js');


exports.getAllPresupuesto = async (req, res) => {
    // devolver ccaso positivo y si no un exception con su respectiva respuesta http
    try {
        const result = await Presupuesto.getAllPresupuestos();
        // resuñltado con status 200
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

function getLosMaterialesConProveedores(presupuestos){
    let materialesDesglosados = [];
    presupuestos.forEach(presupuesto => {
        presupuesto.materiales.forEach(material => {
            let materialConInfoProveedor = {
                nombre: material.nombre,
                marca: material.marca,
                cantidad: material.cantidad,
                precio: material.precio,
                calidad: material.calidad,
                NombreProveedor: presupuesto.NombreProveedor,
                reputacion: presupuesto.reputacion,
                tiempoEntrega: presupuesto.tiempoEntrega,
                puntaje: 0
            };
            materialesDesglosados.push(materialConInfoProveedor);
        });
    });

    return materialesDesglosados;

}

function separarMatPorElListado(materialesPorProveedor, listaMateriales){
    let materialesAgrupados = {};

    // Inicializar el objeto con los nombres de los materiales en listaMateriales
    listaMateriales.forEach(materialNombre => {
        materialesAgrupados[materialNombre] = [];
    });

    // Agrupar los materiales por nombre
    materialesPorProveedor.forEach(material => {
        listaMateriales.forEach(materialNombre => {
            if (materialNombre.includes(material.nombre)) { // material.nombre.includes(materialNombre) > Esta es otra posibilidad
                materialesAgrupados[materialNombre].push(material);
            }
        });
    });

    return materialesAgrupados;
}

function ordenarPorPrecio(materialesPorLista){
    for( let nombreMaterial in materialesPorLista){
        materialesPorLista[nombreMaterial].sort((a,b) => a.precio - b.precio)
    }
}

function ordenarPorTiempoEntrega(materialesPorLista){
    for( let nombreMaterial in materialesPorLista){
        materialesPorLista[nombreMaterial].sort((a,b) => a.tiempoEntrega - b.tiempoEntrega)
    }
}

function ordenarPorCalidadMaterial(materialesPorLista){
    for( let nombreMaterial in materialesPorLista){
        materialesPorLista[nombreMaterial].sort((a,b) => a.calidad - b.calidad)
    }
}

function ordenarPorPuntaje(materialesPorLista){
    for( let nombreMaterial in materialesPorLista){
        materialesPorLista[nombreMaterial].sort((a,b) => a.puntaje - b.puntaje)
    }
}

function sumarPuntaje(materialesPorLista){
    for( let nombreMaterial in materialesPorLista ){
        for (let i = 0; i < materialesPorLista[nombreMaterial].length; i++) {
            materialesPorLista[nombreMaterial][i].puntaje += i
        }
    }
}

function obtenerPresupuestoFinal(materialesPorLista){

    let listaMaterialesFinal = []
    let materialesPorProveedor = {}
    let precioFinal = 0
    for( let nombreMaterial in materialesPorLista ){
        listaMaterialesFinal.push(materialesPorLista[nombreMaterial][0])
    }

    listaMaterialesFinal.forEach(material => {
        let proveedor = material.NombreProveedor;
        if(!materialesPorProveedor[proveedor]){
            materialesPorProveedor[proveedor] = {
                NombreProveedor: proveedor,
                materiales: [],
                precioParcial: 0,
                tiempoEntrega: 0,
            }
        }

        let materialReducido = {
            nombre: material.nombre,
            cantidad: material.cantidad,
            precio: material.precio,
            marca: material.marca
        }

        materialesPorProveedor[proveedor].materiales.push(materialReducido)
        materialesPorProveedor[proveedor].precioParcial += material.precio
        materialesPorProveedor[proveedor].tiempoEntrega = material.tiempoEntrega
        precioFinal += material.precio
    })
    
    let resultado = {
        presupuestos: [],
        precioFinal: precioFinal
    }
    for( let clave in materialesPorProveedor ){
        resultado.presupuestos.push(materialesPorProveedor[clave])
    }

    return resultado
}

exports.comparePresupuestos = async (req, res) => {
    const { filter, listaMateriales } = req.body;  // [tiempo de entrega, menor precio, menor cant proveedores, calidad materiales]
    const presupuestos = await Presupuesto.getAllPresupuestos();
    const materialesPorProveedor = getLosMaterialesConProveedores(presupuestos);

    // Aca separo segun cada material del listado, un listado de 
    // los materiales ofrecidos por los proveedores
    const materialesPorLista = separarMatPorElListado(materialesPorProveedor, listaMateriales);

    if (filter.includes("menorPrecio")) {
        // Ordeno los materiales por precio 
        ordenarPorPrecio(materialesPorLista)
        sumarPuntaje(materialesPorLista)
    }

    if (filter.includes("tiempoEntrega")) {
        ordenarPorTiempoEntrega(materialesPorLista)
        sumarPuntaje(materialesPorLista)
    }

    if (filter.includes("calidadMateriales")) {
        ordenarPorCalidadMaterial(materialesPorLista)
        sumarPuntaje(materialesPorLista)
    }

    ordenarPorPuntaje(materialesPorLista)
    const presupuestoFinal = obtenerPresupuestoFinal(materialesPorLista)

    res.status(200).send(presupuestoFinal)

}