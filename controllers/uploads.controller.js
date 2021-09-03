const { response, request } = require('express')
const fs = require('fs');
const path = require('path');
const { v4: uuidV4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizarImagen');

const fileUpload = async(req = request, res = response) => {
    try {

        const tipo = req.params.tipo;
        const id = req.params.id;
        const tiposValidos = ['hospitales', 'medicos', 'users'];

        if (!tiposValidos.includes(tipo)) {
            res.status(400).send({
                ok: false,
                msg: "El tipo seleccionado no es medico, users u hospital"
            });
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send({
                ok: false,
                msg: "No existe ningun archivo"
            });
        }

        //TODO: Procesamiento de la imagen
        const file = req.files.imagen;
        const splitName = file.name.split('.');
        const ext = splitName[splitName.length - 1];

        const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

        if (!extensionesValidas.includes(ext)) {
            res.status(400).send({
                ok: false,
                msg: "No es una extension permitida, no es del tipo imagen"
            });
        }

        //Generar el nombre del archivo unico
        const fileName = `${uuidV4()}.${ext}`;

        //Path de la imagen
        const path = `./uploads/${tipo}/${fileName}`;

        //Mover archivo
        file.mv(path, (error) => {
            if (error) {
                res.status(500).send({
                    ok: false,
                    error
                });
            }

            //Actualizar base de datos
            actualizarImagen(tipo, id, fileName);

            res.status(200).send({
                ok: true,
                fileName
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, revisar logs"
        });
    }

}

const retornaImagen = (req, res = response) => {
    const { tipo, img } = req.params;
    const pathImg = path.join(__dirname, '../uploads', tipo, img);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const defaultImg = path.join(__dirname, '../uploads/no-img.jpg');
        res.sendFile(defaultImg)
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}