const Proveedor = require('../servicios/proveedores_service.js');
const ListaMateriales = require('../servicios/lista_materiales_service.js');
const ProveedorController = require('../controllers/proveedor.js')
const Proveedores = require('../servicios/proveedores_service.js');

exports.agregarListado = async (req, res) => {
    const { listado, proveedores } = req.body
    const listaId = await ListaMateriales.cargarLista(listado)
    await agregarListadoAProveedor(listaId, proveedores)
    res.status(200).send({
        listaId: listaId
    })
}

exports.obtenerTodosProveedores = async (req, res) => {
    const proveedores = await Proveedores.obtenerTodosProveedores()
    res.status(200).send(proveedores)
}

async function agregarListadoAProveedor(listaId, listaCuit){
    // Genero todos los presupuestos me`no`s el del primero

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

exports.obtenerRecomendaciones = async (req, res) => {
    const { listaId, listaCuitSeleccionados } = req.body
    const materiales = await ListaMateriales.obtenerListaMateriales(listaId)
    let proveedoresSeleccionados = Array()
    let materialesPendientes = Array()

    for (let i = 0; i < listaCuitSeleccionados.length; i++) {
        let p = await Proveedor.obtenerProveedor(listaCuitSeleccionados[i])
        proveedoresSeleccionados.push(p)
    }

    materialesPendientes = obtenerMaterialesPendientes(materiales, proveedoresSeleccionados)


}