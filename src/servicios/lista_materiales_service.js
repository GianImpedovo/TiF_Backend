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

try {
    // Convertir el string uuid a un ObjectId
    const objectId = mongoose.Types.ObjectId(uuid);
    
    // Buscar en la base de datos usando el ObjectId
    const result = await ListaMateriales.find({ _id: objectId });
    
    // Verificar si se encontró el documento
    if (result.length === 0) {
        throw new Error('No se encontró la lista de materiales');
    }

    return result[0].materiales;
} catch (error) {
    console.error('Error al obtener la lista de materiales:', error);
    throw error;
}


exports.obtenerTodasLasListas = async () => {
    const result =  await ListaMateriales.find()
    return result
}