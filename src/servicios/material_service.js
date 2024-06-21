const Material = require('../model/material.js');

exports.obtenerTodosLosMateriales = async () => {
    try {
        const result = await Material.find({},{_id: 0});
        return result;
    } catch (error) {
        throw new Error('Error al obtener los materiales: ' + error.message);
    }
};