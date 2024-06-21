const Material = require('../servicios/material_service.js');

exports.obtenerTodosLosMateriales = async (req, res) => {
    const lista = await Material.obtenerTodosLosMateriales()
    res.status(200).send(lista)
}