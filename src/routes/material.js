const express = require('express');
const materialController = require('../controllers/material.js')


const router = express.Router();

router.get('/', materialController.obtenerTodosLosMateriales)

module.exports = router;