const express = require('express');
const listaController = require('../controllers/lista_materiales.js')


const router = express.Router();

router.post('/', listaController.agregarListado)
router.get('/', listaController.obtenerListados)
router.get('/proveedores', listaController.obtenerTodosProveedores)

module.exports = router;