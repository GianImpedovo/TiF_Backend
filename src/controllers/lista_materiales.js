const Proveedor = require('../servicios/proveedores_service.js');
const listaMateriales = require('../servicios/lista_materiales_service.js');

exports.agregarListado = async (req, res) => {
    const { listado, proveedores } = req.body
    const listaId = await listaMateriales.cargarLista(listado)
    await agregarListadoAProveedor(listaId, proveedores)
    res.status(200).send({
        listaId: listaId
    })
}

async function agregarListadoAProveedor(listaId, listaCuit){
    for (let i = 0; i < listaCuit.length; i++) {
        await Proveedor.agregarListadoPendiente(listaId, listaCuit[i])
    }
}