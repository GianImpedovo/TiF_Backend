const Proveedor = require('../servicios/proveedores_service.js');
const ListaMateriales = require('../servicios/lista_materiales_service.js');
const ProveedorController = require('../controllers/proveedor.js')
const Proveedores = require('../servicios/proveedores_service.js');

exports.agregarListado = async (req, res) => {
    const { listado } = req.body
    const listaId = await ListaMateriales.cargarLista(listado)
    res.status(200).send({
        listaId: listaId
    })
}

exports.obtenerTodosProveedores = async (req, res) => {
    const proveedores = await Proveedores.obtenerTodosProveedores()
    res.status(200).send(proveedores)
}

exports.agregarListadoAProveedor = async (req, res) => {
    const { listaId, proveedores } = req.body
    for (let i = 1; i < proveedores.length; i++) {
        await ProveedorController.presupuestoProveedor(proveedores[i], listaId, null)
    }
    await Proveedor.agregarListadoPendiente(listaId, proveedores[0])
}

exports.obtenerListados = async (req, res) => {
    const listas = await ListaMateriales.obtenerTodasLasListas()
    res.status(200).send(listas)
}

function obtenerMaterialesPendientes(materiales, proveedoresSeleccionados){
    // console.log(proveedoresSeleccionados);
    // Extraer la lista de materiales del objeto materiales
    let listaMateriales = materiales.materiales;

    let materialesPendientes = listaMateriales.map(material => material.nombre);
    for (let i = 0; i < materialesPendientes.length; i++) {
        proveedoresSeleccionados.forEach( proveedor => {
            for (let j = 0; j < proveedor.materiales.length; j++) {
                if(proveedor.materiales[j].nombre === materialesPendientes[i]){
                    materialesPendientes[i] = ""
                }
            }
        });
    }
    console.log("materiales pendientes: ", materialesPendientes);
    materialesPendientes = materialesPendientes.filter(material => material !== "");

    return materialesPendientes
}

function obtenerMaterialesMasBaratos(proveedores) {
    const materialesMejorPrecio = {};
    const materialesMejorTiempo = {};
  
    proveedores.forEach(proveedor => {
      proveedor.materialesDisponibles.forEach(material => {
        const nombre = material.nombre;
        const tiempoEntrega = parseInt(proveedor.tiempoEntrega, 10);
  
        // Mejor precio
        if (!materialesMejorPrecio[nombre] || material.precio < materialesMejorPrecio[nombre].precio) {
          materialesMejorPrecio[nombre] = {
            proveedor: proveedor.proveedor,
            nombre: material.nombre,
            marca: material.marca,
            descripcion: material.descripcion,
            precio: material.precio,
            reputacion: proveedor.reputacion,
            tiempoEntrega: tiempoEntrega,
            precioEnvio: proveedor.precioEnvio
          };
        }
  
        // Mejor tiempo de entrega
        if (!materialesMejorTiempo[nombre] || tiempoEntrega < materialesMejorTiempo[nombre].tiempoEntrega) {
          materialesMejorTiempo[nombre] = {
            proveedor: proveedor.proveedor,
            nombre: material.nombre,
            marca: material.marca,
            descripcion: material.descripcion,
            precio: material.precio,
            reputacion: proveedor.reputacion,
            tiempoEntrega: tiempoEntrega,
            precioEnvio: proveedor.precioEnvio
          };
        }
      });
    });
  
    return {
      mejorPrecio: Object.values(materialesMejorPrecio),
      mejorTiempo: Object.values(materialesMejorTiempo)
    };
  }

function obtenerProveedoresRecomendados(materialesPendientes, proveedoresRestantes){
    let proveedoresRecomendados = Array()
    proveedoresRestantes.forEach(proveedor => {
        let materialesDisponibles = [];

        materialesPendientes.forEach(materialPendiente => {
            let mejorOpcion = {
                nombre: "",
                marca: "",
                descripcion: "", 
                tiempoEntrega: "", 
                precio: 99999999
            }
            proveedor.materiales.forEach(materialProveedor => {
                if (materialProveedor.nombre === materialPendiente && materialProveedor.stock > 0 && materialProveedor.precio < mejorOpcion.precio) {
                    mejorOpcion.nombre = materialPendiente
                    mejorOpcion.marca = materialProveedor.marca
                    mejorOpcion.descripcion = materialProveedor.descripcion
                    mejorOpcion.precio = materialProveedor.precio
                }
            });
            if(mejorOpcion.nombre !== "") materialesDisponibles.push(mejorOpcion)
        });

        if (materialesDisponibles.length > 0) {
            proveedoresRecomendados.push({
                proveedor: proveedor.nombreProveedor,
                cuit: proveedor.cuit,
                materialesDisponibles: materialesDisponibles,
                reputacion: proveedor.reputacion,
                tiempoEntrega: proveedor.tiempoEntrega,
                precioEnvio: proveedor.precioEnvio
            });
        }
    });
    proveedoresRecomendados = obtenerMaterialesMasBaratos(proveedoresRecomendados)
    return proveedoresRecomendados;
}

exports.obtenerRecomendaciones = async (req, res) => {
    const { listaId, listaCuitSeleccionados } = req.body
    const materiales = await ListaMateriales.obtenerListaMateriales(listaId)
    console.log("materiales: ", materiales);
    // 1. Voy a ver cuales son los materiales que me falta conseguir un proveedor
    const proveedoresSeleccionados = await Proveedor.obtenerProveedoresPorListaCuit(listaCuitSeleccionados)
    const materialesPendientes = obtenerMaterialesPendientes(materiales, proveedoresSeleccionados)
    console.log("proveedores seleccionados: ", proveedoresSeleccionados);
    // 2. Veo los proveedores que todavia No seleccione 
    const proveedoresRestantes = await Proveedor.obtenerProveedoresRestantesPorListaCuit(listaCuitSeleccionados)

    // 3. Dentro de los proveedores restantes ver cual me conviene mas
    // console.log("materiales pendientes: ", materialesPendientes, "\nProve restantes", proveedoresRestantes);
    const proveedoresRecomendados = obtenerProveedoresRecomendados(materialesPendientes, proveedoresRestantes)

    res.status(200).send(proveedoresRecomendados)

}