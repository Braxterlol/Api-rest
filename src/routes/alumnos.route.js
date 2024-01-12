const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnos.controller');

router.get('/', alumnosController.index);
router.get('/:id', alumnosController.getById);
router.post('/', alumnosController.create);

module.exports = router;