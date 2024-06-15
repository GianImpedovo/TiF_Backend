const ListaMateriales = require('../model/lista_materiales.js');
const { v4: uuidv4 } = require('uuid');


exports.cargarLista = async (listado) => {
    const nuevoListado = new ListaMateriales({
        _id: uuidv4(),
        materiales: listado
    })
    const result = await nuevoListado.save()
    return result._id
}

exports.obtenerListaMateriales = async (uuid) => {
    const  result =  await ListaMateriales.find({_id: uuid})
    return result[0].materiales
}