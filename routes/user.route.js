/*
    Ruta: /api/users
*/

const { Router } = require('express')
const { getUsuarios, createUser } = require('../controllers/user.controller')
const { check } = require('express-validator')
const router = Router();

router.get('/', getUsuarios);
router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email no tiene el formato correcto').isEmail()
    ],
    createUser);

module.exports = router;