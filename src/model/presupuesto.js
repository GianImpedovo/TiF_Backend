let mongoose = require('mongoose')
let Schema = mongoose.Schema;


// EL PRESUPUSTO CORRESPONDE A UNA LISTA, Por ende tengo que agregar el id de la lista la que corresponde
const PresupuestoSchema = new Schema({
    listaId: String,
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