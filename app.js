const express = require('express');
const app = express();


app.use(express.json())

// importo los routers
import { presupuestoRouter } from './src/routes/presupuestoRouter'

// apli
app.use("/presupuestos",presupuestoRouter)

//importo cookie parser
let cookieParser = require('cookie-parser');
app.use(cookieParser());

//aplico cors
import cors from 'cors'
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

// levanto el puerto

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

export default app