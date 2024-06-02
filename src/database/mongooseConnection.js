

//Database connection --
let bluebird = require('bluebird');
let mongoose = require('mongoose')
mongoose.Promise = bluebird;
let dbUrl = "mongodb+srv://alejandrobiarrieta:X11oG2oeToFSUvkc@maincluster.tguohdu.mongodb.net/Construnet?retryWrites=true&w=majority&appName=MainCluster"
console.log("BD", dbUrl);

class MongooseConnection {
    connect() {
        // Conectar a la base de datos
        mongoose.connect(dbUrl)
        .then(() => {
        console.log('Conexión a la base de datos exitosa');
        })
        .catch(error => {
        console.error('Error de conexión a la base de datos:', error);
        });
    }

    disconnect() {
        //desconexion a la base de datos 
        mongoose.disconnect();
    }
}


module.exports = MongooseConnection;