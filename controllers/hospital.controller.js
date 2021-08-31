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

const actualizarHospital = async(req = request, res = response) => {

    try {
        const id = req.params.id;
        const uid = req.uid;
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).send({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.status(200).send({
            ok: true,
            msg: 'Hospital actualizado',
            hospital: hospitalActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el admin del sitio'
        });
    }
}

const borrarHospital = async(req, res) => {
    try {
        const id = req.params.id;
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            res.status(404).send({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.status(200).send({
            ok: true,
            msg: 'Hospital eliminado'
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el admin del sitio'
        });
    }
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