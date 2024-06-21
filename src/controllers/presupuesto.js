const ListaMateriales = require('../servicios/lista_materiales_service.js');
const Presupuesto = require('../servicios/presupuestos_service.js');

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

exports.getPresupuestoLista = async (req, res) => {
    const { idLista } = req.params
    try {
        const result = await Presupuesto.getPresupuestosPorPedido(idLista);
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
                nombreProveedor: presupuesto.nombreProveedor,
                reputacion: presupuesto.reputacion,
                tiempoEntrega: presupuesto.tiempoEntrega,
                precioEnvio: presupuesto.precioEnvio,
                puntaje: 0
            };
            materialesDesglosados.push(materialConInfoProveedor);
        });
    });

    return materialesDesglosados;

}

function separarMatPorElListado(materialesPorProveedor, listaMateriales){
    let materialesAgrupados = {};
    // console.log("entreo para separar por listado: ", materialesPorProveedor)
    // Inicializar el objeto con los nombres de los materiales en listaMateriales
    listaMateriales.forEach(materialNombre => {
        materialesAgrupados[materialNombre] = [];
    });
    // Agrupar los materiales por nombre
    materialesPorProveedor.forEach(material => {
        listaMateriales.forEach(materialNombre => {
            if (material.nombre.includes(materialNombre)) {
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

function ordenarPorReputacion(materialesPorLista){
    for( let nombreMaterial in materialesPorLista){
        materialesPorLista[nombreMaterial].sort((a,b) => a.reputacion - b.reputacion)
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
    let resultado = {
        presupuestos: [],
        materialesSinProveedor: [],
        precioFinal: 0
    }

    for( let nombreMaterial in materialesPorLista ){
        if(materialesPorLista[nombreMaterial].length != 0){
            listaMaterialesFinal.push(materialesPorLista[nombreMaterial][0])
        } else{
            resultado.materialesSinProveedor.push(nombreMaterial)
        }
    }

    listaMaterialesFinal.forEach(material => {
        if(material){
            let proveedor = material.nombreProveedor;
            if(!materialesPorProveedor[proveedor]){
                materialesPorProveedor[proveedor] = {
                    nombreProveedor: proveedor,
                    materiales: [],
                    precioParcial: 0,
                    tiempoEntrega: 0,
                    precioEnvio: 0
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
            materialesPorProveedor[proveedor].precioEnvio = material.precioEnvio
            precioFinal += material.precio
        }
    })

    for( let clave in materialesPorProveedor ){
        resultado.presupuestos.push(materialesPorProveedor[clave])
    }
    resultado.precioFinal = precioFinal
    return resultado
}

async function limpiarListaMateriales(idLista){
    const resultLista = await ListaMateriales.obtenerListaMateriales(idLista)
    let respuesta = Array()
    resultLista.forEach(material => {
        respuesta.push(material.nombre)
    })
    return respuesta
}

exports.comparePresupuestos = async (req, res) => {
    const { menorPrecio, tiempoEntrega, reputacion, lista } = req.query;  // [tiempo de entrega, menor precio, menor cant proveedores, calidad materiales]

    const listaMateriales = await limpiarListaMateriales(lista)

    const presupuestos = await Presupuesto.getPresupuestosPorPedido(lista);  // aca lo tengo que cambiar para obtener los presupuestos del listado!!!!
    
    const materialesPorProveedor = getLosMaterialesConProveedores(presupuestos);

    const isMenorPrecio = menorPrecio === 'true';
    const isTiempoEntrega = tiempoEntrega === 'true';
    const isReputacion = reputacion === 'true';

    const materialesPorLista = separarMatPorElListado(materialesPorProveedor, listaMateriales);
    console.log(materialesPorLista);
    if (isMenorPrecio) {
        ordenarPorPrecio(materialesPorLista)
        sumarPuntaje(materialesPorLista)
    }

    if (isTiempoEntrega) {
        ordenarPorTiempoEntrega(materialesPorLista)
        sumarPuntaje(materialesPorLista)
    }

    if (isReputacion) {
        ordenarPorReputacion(materialesPorLista)
        sumarPuntaje(materialesPorLista)
    }

    ordenarPorPuntaje(materialesPorLista)
    const presupuestoFinal = obtenerPresupuestoFinal(materialesPorLista)

    res.status(200).send(presupuestoFinal)

}


// function obtenerListaMateriales(){
//     const listaMateriales = [
//         {
//             nombre: "Ladrillos huecos",
//             cantidad: 300
//         },
//         {
//             nombre: "Cemento",
//             cantidad: 6 Bolsa
//         },
//         {
//             nombre: "Cal",
//             cantidad: 8 Bolsa
//         },
//         {
//             nombre: "Arena",
//             cantidad: 1 Bolsa
//         },
//         {
//             nombre: "Piedra",
//             cantidad: 1
//         },
//         {
//             nombre: "Cerecita",
//             cantidad: 10 kg
//         },
//     ]
//     return listaMateriales;
// }
