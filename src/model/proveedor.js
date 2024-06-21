const { UUID } = require('mongodb');
let mongoose = require('mongoose')
let Schema = mongoose.Schema;

const ProveedorSchema = new Schema({
    nombreProveedor: String,
    reputacion: Number,
    tiempoEntrega: String,
    precioEnvio: Number,
    materiales: [{
        nombre: String,
        descripcion: String,
        marca: String,
        unidad: String,
        cantidad: String,
        categoria: String,
        stock: Number,
        precio: Number,
    }],
    listadoPendiente: [String]
}, {
    versionKey: false
});

const Proveedor = mongoose.model('proveedores', ProveedorSchema)
module.exports = Proveedor;