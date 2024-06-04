let mongoose = require('mongoose')
let Schema = mongoose.Schema;

const PresupuestoSchema = new Schema({
    NombreProveedor: String,
    reputacion: Number,
    tiempoEntrega: String,
    vencimiento: Date,
    precioTotal: Number,
    precioEnvio: Number,
    materiales: [{
        nombre: String,
        marca: String,
        categoria: String,
        cantidad: Number,
        precio: Number,
        calidad: Number,
    }]
});

const Presupuesto = mongoose.model('presupuestosconfirmados', PresupuestoSchema)
module.exports = Presupuesto;