const express = require('express');
const app = express();
const router = express.Router();


app.use(express.json())

// importo los routers
const presupuestoRouter = require('./src/routes/presupuestoRouter.js')

// apli
app.use("/presupuestos",presupuestoRouter)
app.use("/",router.get('/', (req, res,next) => {
    res.send('Bienvenido a la página de inicio');
  }))

//importo cookie parser
let cookieParser = require('cookie-parser');
app.use(cookieParser());

//aplico cors
let cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


// creando instancia de coneccion a la base de datos
const MongooseConnection = require('./src/database/mongooseConnection.js');
let db = new MongooseConnection();
db.connect()

// levanto el puerto

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
