const Material = require('../model/material.js');

exports.obtenerTodosLosMateriales = async (page, limit) => {
    try {
        const options = {
            page: page,
            limit: limit
        };

        const result = await Material.paginate({}, options);
        return result;
    } catch (error) {
        throw new Error('Error al obtener los materiales: ' + error.message);
    }
};