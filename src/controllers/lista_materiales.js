const Proveedor = require('../servicios/proveedores_service.js');
const listaMateriales = require('../servicios/lista_materiales_service.js');
const ProveedorController = require('../controllers/proveedor.js')
const Proveedores = require('../servicios/proveedores_service.js');

exports.agregarListado = async (req, res) => {
    const { listado, proveedores } = req.body
    const listaId = await listaMateriales.cargarLista(listado)
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
    // Genero todos los presupuestos menos el del primero

    for (let i = 1; i < listaCuit.length; i++) {
        await ProveedorController.presupuestoProveedor(listaCuit[i], listaId, null)
    }

    await Proveedor.agregarListadoPendiente(listaId, listaCuit[0])
}

exports.obtenerListados = async (req, res) => {
    const listas = await listaMateriales.obtenerTodasLasListas()
    res.status(200).send(listas)
}