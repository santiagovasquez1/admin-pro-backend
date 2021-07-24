const { Schema, model } = require('mongoose')

const hospitalSchema = Schema({
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
    }
}, {
    collection: 'Hospitales'
});

hospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object
});

module.exports = model('Hospital', hospitalSchema);