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
        descripcion: String,
        marca: String,
        categoria: String,
        cantidad: Number,
        unidad: String,
        precio: Number,
        calidad: Number,
    }]
}, {
    versionKey: false
});

const Presupuesto = mongoose.model('presupuestosconfirmados', PresupuestoSchema)
module.exports = Presupuesto;