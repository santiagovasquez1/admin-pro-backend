/*
    ruta: api/uploads/:busqueda
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJwt');
const expressFileUpload = require('express-fileupload');
const { fileUpload } = require('../controllers/uploads.controller')

const router = Router();


router.use(expressFileUpload());
router.put('/:tipo/:id', validarJWT, fileUpload);

module.exports = router;