const Proveedores = require('../model/proveedor.js');

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

