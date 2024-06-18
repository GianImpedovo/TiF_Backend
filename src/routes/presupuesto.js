const express = require('express');
const presupuestoController = require('../controllers/presupuesto.js')


const router = express.Router();

router.get('/opti', presupuestoController.comparePresupuestos)
router.get('/', presupuestoController.getAllPresupuesto)

module.exports = router;