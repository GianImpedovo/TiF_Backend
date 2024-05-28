import express, { json } from 'express'
import { userRouter } from './src/routes/user.js'


const app = express()
app.use(express.json())

// apli
app.use("/",userRouter)


//importo cookie parser
import cors from 'cors'
//aplico cors
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


// creando instancia de coneccion a la base de datos
import MongooseConnection from './src/database/mongooseConnection.js'
let db = new MongooseConnection();
db.connect()

export default app