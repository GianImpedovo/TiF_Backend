const { Schema } = require('mongoose');

// coleccion de presupuestos confirmados



const presupuestosConfirmados = new Schema({
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

const Presupuesto = mongoose.model('presupuestosConfirmados', ServicioSchema)
module.exports = Servicio;