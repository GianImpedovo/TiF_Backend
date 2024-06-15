const { UUID } = require('mongodb');
let mongoose = require('mongoose')
let Schema = mongoose.Schema;

const ListaMaterialesSchema = new Schema({
    _id: String,
    materiales: [{
        nombre: String,
        cantidad: Number
    }]
}, {
    versionKey: false
});


const ListaMateriales = mongoose.model('listamateriales', ListaMaterialesSchema)
module.exports = ListaMateriales