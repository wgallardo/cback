const express       = require('express');
const routerUsuario = require('./usuario.routing');
const routerRnp = require('./rnp.routing');
const mapa  = require('./mapa.routing');
const cargos  = require('./cargos.routing');
const cuotas  = require('./cuotas.routing');
const afiliados  = require('./afiliados.routing');
const beneficiarios  = require('./beneficiarios.routing');
const producto  = require('./producto.routing');
const sale  = require('./salePOS.routing');
const turnos  = require('./turnos.routing');


const app = express();
app.use("/api", routerUsuario);
app.use("/api", routerRnp);
app.use("/api", cargos);
app.use("/api", mapa);
app.use("/api", cuotas);
app.use("/api", afiliados);
app.use("/api", beneficiarios);
app.use("/api", producto);
app.use("/api", sale);
app.use("/api", turnos);



module.exports = app;