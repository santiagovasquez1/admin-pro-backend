const { response, request } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');
const { getUsuarios } = require('./user.controller');

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

const googleSignIn = async(req = request, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        let user;
        //Validacion de email
        const userDb = User.findOne({ email });

        if (!userDb) {
            user = new User({
                name,
                email,
                password: '@@@@',
                image: picture,
                google: true
            });
        } else {
            usuario = UserDb;
            usuario.google = true;
        }

        //Guardado en bd
        await usuario.save();
        const token = await generarJWT(usuario.id);

        res.status(200).send({
            ok: true,
            msg: 'Google Sign-In',
            token
        });

    } catch (error) {
        res.status(401).send({
            ok: false,
            msg: 'El token no es correcto'
        })
    }

}

const validatePassword = (password, user) => {
    return validPassword = bcrypt.compareSync(password, user.password);
}

module.exports = {
    login,
    googleSignIn
}