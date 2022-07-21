const express = require('express');
const morgan = require('morgan');
const path = require('path');
//const controller = require('./controllers/database');

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //recibir todo tipo de formularios y entenderlo
app.use(express.json());//para entender los archivos json


//routes
app.use(require('./routes/index'));


//contenido estatico - archivo html, el paquete path reemplaza los \ de las direcciones de directorio
app.use(express.static(path.join(__dirname, 'public')));


app.get('*',(req, res)=>{
    res.send('404 | page not found');
});

app.listen(port, ()=>{
    console.log(`server app listening at http//localhost:${port}`);
});