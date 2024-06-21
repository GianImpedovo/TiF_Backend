const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Material = mongoose.model('materiales', materialSchema);

module.exports = Material;