const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    const hospitals = await Hospital.find()
        .populate('usuario', 'name img');

    try {
        return res.status(200).send({
            ok: "True",
            hospitals
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        });
    }
}

const actualizarHospital = async(req, res = response) => {
    return res.status(200).send({
        ok: "True",
        msg: "Hospitales run"
    });
}

const borrarHospital = async(req, res) => {
    return res.status(200).send({
        ok: "True",
        msg: "Hospitales run"
    });
}

const createHospital = async(req, res = response) => {

    const uid = req.uid;
    console.log(uid);

    try {

        const hospital = new Hospital({
            usuario: uid,
            ...req.body
        });

        await hospital.save();

        return res.status(200).send({
            ok: true,
            hospital
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        });
    }


    return res.status(200).send({
        ok: "True",
        msg: "Hospitales run"
    });
}

module.exports = {
    getHospitales,
    actualizarHospital,
    borrarHospital,
    createHospital
}