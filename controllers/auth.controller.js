const { response, request } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        //TODO: Relentizar el proceso de login, para evitar el bombardeo

        const userDb = await User.findOne({ email });

        if (!userDb) {
            return res.status(404).send({
                ok: false
            });
        } else if (validatePassword(password, userDb)) {

            const token = await generarJWT(userDb.id);
            res.status(200).send({
                ok: true,
                token
            });

        } else {
            return res.status(400).send({
                ok: false,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        });
    }
}

const validatePassword = (password, user) => {
    return validPassword = bcrypt.compareSync(password, user.password);
}

module.exports = {
    login
}