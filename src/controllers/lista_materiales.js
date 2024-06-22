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

async function agregarListadoAProveedor(listaId, listaCuit){o

    for (let i = 1; i < listaCuit.length; i++) {
        await ProveedorController.presupuestoProveedor(listaCuit[i], listaId, null)
    }

    await Proveedor.agregarListadoPendiente(listaId, listaCuit[0])
}

exports.obtenerListados = async (req, res) => {
    const listas = await ListaMateriales.obtenerTodasLasListas()
    res.status(200).send(listas)
}

function obtenerMaterialesPendientes(materiales, proveedoresSeleccionados){
    console.log(proveedoresSeleccionados);
    let materialesPendientes = materiales.map(material => material.nombre);
    for (let i = 0; i < materialesPendientes.length; i++) {
        proveedoresSeleccionados.forEach( proveedor => {
            for (let j = 0; j < proveedor.materiales.length; j++) {
                if(proveedor.materiales[j].nombre === materialesPendientes[i]){
                    materialesPendientes[i] = ""
                }
            }
        });
    }
    materialesPendientes = materialesPendientes.filter(material => material !== "");

    return materialesPendientes
}

function obtenerProveedoresRecomendados(materialesPendientes, proveedoresRestantes){
    let proveedoresRecomendados = Array()
        
    proveedoresRestantes.forEach(proveedor => {
        let materialesDisponibles = [];

        materialesPendientes.forEach(materialPendiente => {
            proveedor.materiales.forEach(materialProveedor => {
                if (materialProveedor.nombre === materialPendiente && materialProveedor.stock > 0) {
                    materialesDisponibles.push({
                        nombre: materialProveedor.nombre,
                        descripcion: materialProveedor.descripcion,
                        precio: materialProveedor.precio
                    }
                    );
                }
            });
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

    return proveedoresRecomendados;
}

exports.obtenerRecomendaciones = async (req, res) => {
    const { listaId, listaCuitSeleccionados } = req.body
    const materiales = await ListaMateriales.obtenerListaMateriales(listaId)

    // 1. Voy a ver cuales son los materiales que me falta conseguir un proveedor
    const proveedoresSeleccionados = await Proveedor.obtenerProveedoresPorListaCuit(listaCuitSeleccionados)
    const materialesPendientes = obtenerMaterialesPendientes(materiales, proveedoresSeleccionados)

    // 2. Veo los proveedores que todavia No seleccione 
    const proveedoresRestantes = await Proveedor.obtenerProveedoresRestantesPorListaCuit(listaCuitSeleccionados)

    // 3. Dentro de los proveedores restantes ver cual me conviene mas
    console.log("materiales pendientes: ", materialesPendientes, "\nProve restantes", proveedoresRestantes);
    const proveedoresRecomendados = obtenerProveedoresRecomendados(materialesPendientes, proveedoresRestantes)

    res.status(200).send(proveedoresRecomendados)

}