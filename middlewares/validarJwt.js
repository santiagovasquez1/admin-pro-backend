const { response, request } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(400).send({
            ok: false,
            msg: "No hay token en la peticion"
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).send({
            ok: false,
            msg: "Token incorrecto"
        });
    }

}

module.exports = {
    validarJWT
}