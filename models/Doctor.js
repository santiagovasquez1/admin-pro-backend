const { Schema, model } = require('mongoose')

const DoctorSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectID,
        ref: 'Hospital',
        required: true
    }
}, {
    collection: 'Medicos'
});

DoctorSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id
    return object
});

module.exports = model('Medico', DoctorSchema);