const express = require('express');
const dotenv  = require('dotenv').config();
const cors   = require('cors');
const path = require('path');
// const ws = require('./utils/whatsapp.utils');

const app = express();
app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use(require('./routers/app.routing'));


app.use(express.static(__dirname + '/public'));
let public = path.join(__dirname, "./public/index.html");

app.get('*', function(req, res) {
    res.sendFile(public);
});



app.listen(process.env.PORT, ()=> {
    console.log(`Escuchando puerto ${ process.env.PORT  }`)
});