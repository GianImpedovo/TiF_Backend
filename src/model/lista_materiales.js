const { UUID } = require('mongodb');
let mongoose = require('mongoose')
let Schema = mongoose.Schema;

const ListaMaterialesSchema = new Schema({
    _id: String,
    materiales: [{
        nombre: String,
        descripcion: String,
        marca: String,
        unidad: String,
        cantidad: String,
        categoria: String
    }]
}, {
    versionKey: false
});


const ListaMateriales = mongoose.model('listamateriales', ListaMaterialesSchema)
module.exports = ListaMateriales