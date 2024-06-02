
const Presupuesto = require('../model/presupuesto.js');


exports.getAllPresupuesto = async (req, res) => {
    const result = await Presupuesto.find({});
    console.log(result);
    res.json(result);
    }
exports.createPresupuesto = async (req, res) => {
    const presupuesto = req.body;
    const newPresupuesto = await Presupuesto.create({
        input: presupuesto
    });
    res.status(201).json(newPresupuesto);
    }
exports.getByIdPresupuesto = async (req, res) => {
    const { id } = req.params;
    const numId = parseInt(id);
    const result = await Presupuesto.getById(numId);
    res.json(result);
    }
