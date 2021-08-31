/*
    Ruta: /api/Medicos
*/

const { Router } = require('express');
const { getDoctors, createDoctor, actualizarDoctor, borrarDoctor } = require('../controllers/doctor.controller');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJwt');

router.get('/', validarJWT, getDoctors);
router.post('/', [
        validarJWT,
        check('name', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital debe de ser un id valido').isMongoId(),
        validarCampos
    ],
    createDoctor);

router.put('/:id', [
    validarJWT,
    check('name', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital debe de ser un id valido').isMongoId(),
    validarCampos
], actualizarDoctor);


router.delete('/:id', [
    validarJWT
], borrarDoctor)

module.exports = router;