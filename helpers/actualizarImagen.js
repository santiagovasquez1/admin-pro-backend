const User = require('../models/user.model');
const Medicos = require('../models/Doctor');
const Hospitals = require('../models/hospital');
const fs = require('fs');

const actualizarImagen = async(tipo, id, filename) => {

    let data = null;

    switch (tipo) {
        case 'users':
            data = await User.findById(id);
            if (!data) {
                console.log('No se encontro un usuario por id');
                return false;
            }
            break;
        case 'medicos':
            data = await Medicos.findById(id);
            if (!data) {
                console.log('No se encontro un medico por id');
                return false;
            }
            break;
        case 'hospitales':
            data = await Hospitals.findById(id);
            if (!data) {
                console.log('No se encontro un hospital por id');
                return false;
            }
            break;
        default:
            return false;
    }

    const oldPath = `./uploads/users/${data.image}`;
    if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
    }

    data.image = filename;
    await data.save();
    return true;

}

module.exports = {
    actualizarImagen
}