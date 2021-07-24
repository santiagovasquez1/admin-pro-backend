const { response } = require('express');
const Doctor = require('../models/Doctor')

const getDoctors = async(req, res = response) => {

    try {

        const medicos = await Doctor.find()
            .populate('hospital', 'name')
            .populate('usuario', 'name img');

        return res.status(200).send({
            ok: "True",
            medicos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        });
    }
}

const actualizarDoctor = async(req, res = response) => {
    return res.status(200).send({
        ok: "True",
        msg: "Hospitales run"
    });
}

const borrarDoctor = async(req, res) => {
    return res.status(200).send({
        ok: "True",
        msg: "Hospitales run"
    });
}

const createDoctor = async(req, res = response) => {

    try {
        const uid = req.uid;

        const doctor = new Doctor({
            usuario: uid,
            ...req.body
        });

        await doctor.save();
        return res.status(200).send({
            ok: true,
            doctor
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
    getDoctors,
    actualizarDoctor,
    borrarDoctor,
    createDoctor
}