 

//////////////////////////////////////////////////////////
///////               PAGINACION               ///////////
//////////////////////////////////////////////////////////
const getPagination = (page, size) => {
    if(page!=0){ page = page-1; }
    const limit =  +size;
    const offset = page * limit;
    return { limit, offset };
};

//////////////////////////////////////////////////////////
///////            DATA DE PAGINACION           ///////////
//////////////////////////////////////////////////////////
const getPagingData = (totalItems, page, limit) => {
    if(page!=0){ page = page-1; }
    const currentPage = page ? +(page+1) : 1;
    let totalPages = Math.ceil(totalItems / limit);
    return { totalItems, totalPages, currentPage };
};



//////////////////////////////////////////////////////////
///////       GENERAR CODIGO AFILIACION        ///////////
//////////////////////////////////////////////////////////
// EJ: AFL-2022-000001
const getCodigoAfiliacion = (exp) => {
let data =  JSON.parse(JSON.stringify(exp));
let correlativo = (data.t==null)? 1:data.t;
let parse = ('0000'+correlativo).slice(-4)
   return 'AFL-'+data.Anio+'-'+parse
}




module.exports = {
    getPagination,
    getPagingData,
    getCodigoAfiliacion
};