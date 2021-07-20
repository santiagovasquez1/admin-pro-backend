/*
    Ruta: /api/users
*/

const { Router } = require('express');
const { getUsuarios, createUser, actualizarUsurario, borrarUsuario } = require('../controllers/user.controller');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJwt');

router.get('/', validarJWT, getUsuarios);
router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email no tiene el formato correcto').isEmail(),
        validarCampos
    ],
    createUser);

router.put('/:id', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no tiene el formato correcto').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarUsurario);


router.delete('/:id', [
    validarJWT
], borrarUsuario)

module.exports = router;