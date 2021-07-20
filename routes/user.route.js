/*
    Ruta: /api/users
*/

const { Router } = require('express');
const { getUsuarios, createUser, actualizarUsurario } = require('../controllers/user.controller');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validarCampos')

router.get('/', getUsuarios);
router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email no tiene el formato correcto').isEmail(),
        validarCampos
    ],
    createUser);

router.put('/:id', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene el formato correcto').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsurario);

module.exports = router;