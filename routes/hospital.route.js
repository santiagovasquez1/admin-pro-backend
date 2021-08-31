/*
    Ruta: /api/users
*/

const { Router } = require('express');
const { getHospitales, actualizarHospital, borrarHospital, createHospital } = require('../controllers/hospital.controller');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJwt');

router.get('/', validarJWT, getHospitales);
router.post('/', [
        validarJWT,
        check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createHospital);

router.put('/:id', [
    validarJWT,
    check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
], actualizarHospital);

router.delete('/:id', [
    validarJWT
], borrarHospital)

module.exports = router;