


exports.createPresupuesto = async (req, res) => {
    const presupuesto = req.body;
    const newPresupuesto = await _presupuesto.PresupuestoModel.create({
        input: presupuesto
    });
    res.status(201).json(newPresupuesto);
    }
exports.getAllPresupuesto = async (req, res) => {
    const result = await _presupuesto.PresupuestoModel.getAll();
    res.json(result);
    }
exports.getByIdPresupuesto = async (req, res) => {
    const { id } = req.params;
    const numId = parseInt(id);
    const result = await _presupuesto.PresupuestoModel.getById(numId);
    res.json(result);
    }
