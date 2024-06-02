

const Presupuesto =require('../servicios/presupuestos_service.js');


exports.getAllPresupuesto = async (req, res) => {
    // devolver ccaso positivo y si no un exception con su respectiva respuesta http
    try {
        const result = await Presupuesto.getAllPresupuestos();
        // resuñltado con status 200
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }

}