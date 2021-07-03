const User = require('../models/user.model');
const { response, request } = require('express')
const { validationResult } = require('express-validator')
const getUsuarios = async(req, res) => {

    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users
    });
}

const createUser = async(req = request, res = response) => {

    const { email, password, name } = req.body;

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: "Errores al enviar la información",
            errors: errores.mapped()
        })
    }

    try {
        const existeEmail = await User.findOne({ email })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya ha sido registrado"
            });
        }

        const user = new User(req.body);
        await user.save();

        res.json({
            ok: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        })
    }

}

module.exports = {
    getUsuarios,
    createUser
}