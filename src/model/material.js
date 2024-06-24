const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate-v2');

const materialSchema = new Schema({
    nombre: String,
    descripcion: String,
    marca: String,
    unidad: String,
    cantidad: String,
    categoria: String
}, {
    versionKey: false
});

materialSchema.plugin(mongoosePaginate);

const Material = mongoose.model('materiales', materialSchema);

module.exports = Material;