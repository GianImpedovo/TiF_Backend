const ListaMateriales = require('../model/lista_materiales.js');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');


exports.cargarLista = async (listado) => {
    const nuevoListado = new ListaMateriales({
        _id: uuidv4(),
        materiales: listado
    })
    const result = await nuevoListado.save()
    return result._id
}

exports.obtenerListaMateriales = async (uuid) => {
    try {
        
        
        // Buscar en la base de datos usando el ObjectId
        const result = await ListaMateriales.findById(uuid);
    

        return result[0].materiales;
    } catch (error) {
        console.error('Error al obtener la lista de materiales:', error);
        throw error;
    }
};

exports.obtenerTodasLasListas = async () => {
    const result =  await ListaMateriales.find()
    return result
}