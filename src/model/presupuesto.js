let mongoose = require('mongoose')
let Schema = mongoose.Schema;

const PresupuestoSchema = new Schema({
    NombreProveedor: String,
    reputacion: Number,
    tiempoEntrega: String,
    vencimiento: Date,
    precioTotal: Number,
    materiales: [{
        nombre: String,
        marca: String,
        categoria: String,
        cantidad: Number,
        precio: Number
    }]
});

const Presupuesto = mongoose.model('presupuestosConfirmados', PresupuestoSchema)
module.exports = Presupuesto;