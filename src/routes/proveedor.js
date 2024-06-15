const express = require('express');
const proveedor = require('../controllers/proveedor.js')


const router = express.Router();

router.get('/:cuit', proveedor.obtenerProveedor)
router.get('/:cuit/lista', proveedor.obtenerMaterialesProveedor)
router.get('/:cuit/presupuesto', proveedor.generarPresupuesto)

module.exports = router;