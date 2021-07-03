const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log("Db Connection Success");
    } catch (error) {
        console.log(error);
        throw new Error("Error al iniciar la base de datos, ver logs");
    }
}

module.exports = {
    bdConnection: dbConnection
}