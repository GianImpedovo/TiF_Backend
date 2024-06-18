
const Presupuesto = require('../model/presupuesto.js');


exports.getAllPresupuestos = async (req) => {
    const result = await Presupuesto.find({});
    return result
    }

exports.getPresupuestosPorPedido = async (listaId) => {
    const result = await Presupuesto.find({listaId: listaId})
    return result
}

exports.guardarPresupuesto = async (presupuesto) => {
    const nuevoPresupuesto = new Presupuesto(presupuesto)
    const result = await nuevoPresupuesto.save()
    return result._id
}