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
    try {
        const id = req.params.id;
        const uid = req.uid;
        const medico = await Doctor.findById(id);

        if (!medico) {
            res.status(404).send({
                ok: false,
                msg: 'Medico no encontrado por id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const MedicoActualizado = await Doctor.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.status(200).send({
            ok: true,
            msg: 'Medico actualizado',
            Medico: MedicoActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el admin del sitio'
        });
    }
}

const borrarDoctor = async(req, res) => {
    try {
        const id = req.params.id;
        const medico = await Doctor.findById(id);

        if (!medico) {
            res.status(404).send({
                ok: false,
                msg: 'Medico no encontrado por id'
            });
        }

        await Doctor.findByIdAndDelete(id);

        res.status(200).send({
            ok: true,
            msg: 'Doctor eliminado'
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            msg: 'Hable con el admin del sitio'
        });
    }
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