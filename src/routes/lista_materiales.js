const express = require('express');
const listaController = require('../controllers/lista_materiales.js')


const router = express.Router();

router.post('/', listaController.agregarListado)
router.get('/', listaController.obtenerListados)
router.get('/proveedores', listaController.obtenerTodosProveedores)
router.post('/recomendaciones', listaController.obtenerRecomendaciones)
router.post('/guardarProveedores', listaController.agregarListadoAProveedor)

module.exports = router;