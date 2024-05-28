

//Database connection --
import bluebird from 'bluebird';
import mongoose from 'mongoose';
mongoose.Promise = bluebird;
let dbUrl = "mongodb+srv://alejandrobiarrieta:X11oG2oeToFSUvkc@maincluster.tguohdu.mongodb.net/?retryWrites=true&w=majority&appName=MainCluster"
console.log("BD", dbUrl);

export default class MongooseConnection {
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


