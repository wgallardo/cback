 

const schemaAfiliado = () => {
	return {
        primer_nombre:      { type:"string", optional: false},
        segundo_nombre:     { type:"string", optional: true, nullable: true },
        primer_apellido:    { type:"string", optional: false},
        segundo_apellido:   { type:"string", optional: true, nullable: true },
        identity:   	      { type:"string", optional: false,min: 13, max: 13},
        fecha_nacimiento:   { type:"string", optional: false},
        genero:    	        { type:"string", optional: false},
        lugar_de_nacimiento:{ type:"string", optional: true, nullable: true },
        identidad_extendida:{ type:"string", optional: true, nullable: true },
        direccion:          { type:"string", optional: false},
        estado_civil:       { type:"string", optional: false},
        nacionalidad:    { type:"string", optional: false}
    }
}


const parseToCloudAfiliado = async(req, codigo) => {
  return {
      primer_nombre:        req.primer_nombre,
      segundo_nombre:       req.segundo_nombre,
      primer_apellido:      req.primer_apellido,
      segundo_apellido:     req.segundo_apellido,
      identidad:            req.identity,
      numero_carnet:        req.numero_carnet,
      fecha_nacimiento:     req.fecha_nacimiento,
      id_genero:            req.genero,
      lugar_de_nacimiento:  req.lugar_nacimiento,
      identidad_extendida:  req.identidad_extendida,
      direccion:            req.direccion,
      id_estado_civil:      req.estado_civil,
      id_nacionalidad:      req.nacionalidad,
      id_estado:            req.estado,
      cod_carnet:           codigo
  };
}


const parseToCloudBeneficiario = async(req, codigo) => {
  return {
      cod_carnet:           codigo,
      nombre_beneficiario:  req.nombre_beneficiario,
      fecha_nacimiento:     req.fecha_nacimiento,
      parentesco:           req.parentesco,
      beneficio:            req.beneficio,
      is_tutor:             req.istutor,
      nombre_tutor:         req.tutor,
      lugar_nacimiento:     req.lugar_nacimiento
  }; 
}



const parseToCloudContacto = async(req, codigo) => {
  return {
      cod_carnet:           codigo,
      telefono_fijo:        req.telefono_fijo,
      telefono_personal:    req.telefono_celular,
      email:                req.email
  }
}



const parseToCloudEmpleo = async(req, codigo) => {
  return {
      cod_carnet:           codigo,
      id_sector:            req.sector,
      id_nivel_escolar:     req.nivelescolar,
      instituto_trabajo:    req.institucion,
      id_municipio:         req.municipio,
      id_cargo:             req.cargo,
      fecha_inicio:         req.fechainicio,
      fecha_final:          null
  }; 
}


const parseToCloudCuota = async(req, codigo) => {
  const dt = new Date();

  return {
      cod_carnet:           codigo,
      tipo_pago:            req.estado,
      id_forma_pago:        req.modalidad_pago,
      id_municipio:         req.municipio,
      anio:                 (dt.getFullYear()),
      mes:                  (dt.getMonth()+1),
      fecha_vencimiento:    `${ dt.getFullYear() }-${ dt.getMonth()+1 }-28`,
      valor_cuota:           req.valor_cuota
  }; 
}


const parseToCloudEstudio = async(req, codigo) => {
  return {
      cod_carnet:              codigo,
      intitucion_de_estudio:   req.intitucion,
      titulo_optenido:         req.titulo_obtenido,
      fecha_entrega:           req.fecha_titulo
  }
}







module.exports = { 
  schemaAfiliado,
  parseToCloudAfiliado,
  parseToCloudBeneficiario,
  parseToCloudContacto,
  parseToCloudEmpleo,
  parseToCloudCuota,
  parseToCloudEstudio
}