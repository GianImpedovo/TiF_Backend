
const Presupuesto = require('../model/presupuesto.js');


exports.getAllPresupuestos = async (req) => {
    const result = await Presupuesto.find({});
    return result
    }

// servicio para a partir de todos los presupuestos confirmados, a partir de un objeto con los materiales y sus cantidades, devolver todas las posibilidades de un conjuntod de presupuestos que cumplan con los materiales y sus cantidades
exports.getPresupuestos = async (listaMateriales) => {
    const result = await Presupuesto.find({});
    let listaPresupuestos = Array()
    for (let i = 0; i < result.length; i++) {
        const element = result[i];
        let presupuesto = element.materiales
        let presupuestoValido = true
        for (let j = 0; j < presupuesto.length; j++) {
            const material = presupuesto[j];
            if (listaMateriales[material.nombre] < material.cantidad) {
                presupuestoValido = false
            }
        }
        if (presupuestoValido) {
            listaPresupuestos.push(element)
        }
    }
    return listaPresupuestos
} 