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
        marca: String,
        categoria: String,
        stock: Number,
        precio: Number,
        calidad: Number,
    }],
    listadoPendiente: [String]
}, {
    versionKey: false
});

const Proveedor = mongoose.model('proveedores', ProveedorSchema)
module.exports = Proveedor;