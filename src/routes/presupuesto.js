const express = require('express');
const presupuestoController = require('../controllers/presupuesto.js')


const router = express.Router();

router.get('/opti', presupuestoController.comparePresupuestos)
router.get('/', presupuestoController.getAllPresupuesto)
// presupuestoRouter.get('/:id', PresupuestoController.getById)
// presupuestoRouter.put('/:id', PresupuestoController.update)
// presupuestoRouter.delete('/:id', PresupuestoController.delete)

module.exports = router;