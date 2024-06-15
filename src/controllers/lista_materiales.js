const listaMateriales = require('../servicios/lista_materiales_service.js');

exports.agregarListado = async (req, res) => {
    const { listado } = req.body
    const listaId = await listaMateriales.cargarLista(listado)
    res.status(200).send({listaId: listaId})
}