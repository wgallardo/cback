const { db } = require("../models/conexion.model");





///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////            SELECT DEPARTAMENTO ALL          /////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
exports.findAllDepartamento = async(req, res) => { 
    const Departamento = await db.departamento.findAll();
    res.send(Departamento);
}



///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////              SELECT MUNICIPIO ALL           /////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
exports.findAllMunicipio = async(req, res) => { 
    let id_departamento = req.params.id; 
    const municipio = await db.municipio.findAll({
        where:  {
            id_departamento 
        }
    });
    res.send(municipio);
}