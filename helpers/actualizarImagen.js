const User = require('../models/user.model');
const Medicos = require('../models/Doctor');
const Hospitals = require('../models/hospital');
const fs = require('fs');
const path = require('path');

const actualizarImagen = async(tipo, id, filename) => {

    let data = null;
    let table = '';
    switch (tipo) {
        case 'users':
            data = await User.findById(id);
            if (!data) {
                console.log('No se encontro un usuario por id');
                return false;
            }
            table = 'users'
            break;
        case 'medicos':
            data = await Medicos.findById(id);
            if (!data) {
                console.log('No se encontro un medico por id');
                return false;
            }
            table = 'medicos'
            break;
        case 'hospitales':
            data = await Hospitals.findById(id);
            if (!data) {
                console.log('No se encontro un hospital por id');
                return false;
            }
            table = 'hospitales'
            break;
        default:
            return false;
    }

    //const oldPath = `./uploads/${table}/${data.image}`;
    if (data.image) {
        const oldPath = path.join('uploads', table, data.image);
        borrarImagen(oldPath);
    }

    data.image = filename;
    await data.save();
    return true;
}

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

module.exports = {
    actualizarImagen
}