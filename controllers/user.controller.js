const User = require('../models/user.model');
const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const getUsuarios = async(req, res) => {

    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users
    });
}

const createUser = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const existeEmail = await User.findOne({ email })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya ha sido registrado"
            });
        }

        const user = new User(req.body);

        //Encriptacin de contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

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
        });
    }

}

const actualizarUsurario = async(req = request, res = response) => {

    //TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    try {

        const userDb = await User.findById(uid);

        if (!userDb) {
            return res.status(404).send({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        const { password, google, email, ...campos } = req.body;

        if (userDb.email !== email) {
            const existeEmail = await User.findOne({ email });
            if (existeEmail) {
                return res.status(400).send({
                    ok: false,
                    msg: "Ya existe un usuario con ese email"
                });
            }
        }

        campos.email = email
        const userUpdate = await User.findByIdAndUpdate(uid, campos, { new: true });

        res.status(200).send({
            ok: true,
            usurio: userUpdate
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        });
    }
}

module.exports = {
    getUsuarios,
    createUser,
    actualizarUsurario
}