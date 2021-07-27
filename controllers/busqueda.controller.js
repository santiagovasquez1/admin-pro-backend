const { response, request } = require('express');
const User = require('../models/user.model');
const Medicos = require('../models/Doctor');
const Hospitals = require('../models/hospital');

const getTodo = async(req = request, res = response) => {
    const busqueda = req.params.busqueda;

    try {
        const regex = new RegExp(busqueda, 'i');

        const [usuarios, medicos, hospitales] = await Promise.all([
            User.find({ name: regex }),
            Medicos.find({ name: regex }),
            Hospitals.find({ name: regex })
        ]);

        res.status(200).send({
            ok: true,
            usuarios,
            medicos,
            hospitales
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        });
    }

}

const getDocumentosColeccion = async(req = request, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;

    try {
        const regex = new RegExp(busqueda, 'i');
        let data = [];
        switch (tabla) {
            case 'usuarios':
                data = await User.find({ name: regex });
                break;
            case 'medicos':
                data = await Medicos.find({ name: regex });
                break;
            case 'hospitales':
                data = await Hospitales.find({ name: regex });
                break;
            default:
                return res.status(400).send({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                });
        }
        return res.status(200).send({
            ok: true,
            result: data
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
    getTodo,
    getDocumentosColeccion
}