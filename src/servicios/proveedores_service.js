const Proveedores = require('../model/proveedor.js');

exports.obtenerTodosProveedores = async () => {
    const result = await Proveedores.find({}, {_id: 0, listadoPendiente: 0})
    return result
}

exports.obtenerProveedor = async (cuit) => {
    const result =  await Proveedores.find({'cuit': cuit})
    return result
}

exports.obtenerMaterialesProveedor = async (cuit) => {
    const result =  await Proveedores.find({'cuit': cuit}, {'materiales': 1, '_id': 0})
    const materiales = result[0]
    return materiales['materiales']
}

exports.obtenerInformacionProveedor = async (cuit) => {
    const result =  await Proveedores.find({'cuit': cuit}, {'materiales': 0, '_id': 0})
    return result[0]
}

exports.eliminarDelListadoPendiente = async (idListado, cuit) => {
    const result = await Proveedores.updateOne(
        { cuit: cuit },
        {
            $pull: {
                listadoPendiente: idListado
            }
        }
    );

    return result.modifiedCount;
};

exports.agregarListadoPendiente = async (idListado, cuit) => {
    const result = await Proveedores.updateOne( {cuit: cuit},
        {
            $push: {
                listadoPendiente: idListado 
            }
        }
    )

    return result.modifiedCount
}

exports.obtenerListadoPendiente = async (cuit) => {
    const result =  await Proveedores.find({'cuit': cuit}, {'listadoPendiente': 1, '_id': 0})
    return result[0];
}
