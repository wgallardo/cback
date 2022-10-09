const FPDF = require('fpdf-njs/fpdf');
const path = require('path');




///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////                   GENERAR PDF               /////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


exports.findPdf = (req, res) => { 
    const pdf = new FPDF();

    

    


    pdf.CreatePDF();
    pdf.AddPage();  

    pdf.SetTitle('ESTADO DE CUENTA');
    pdf.SetAuthor('SISTEMA DE COPRUMH')
    pdf.SetSubject('REPORTE DE ESTADO DE CUENTA');
    pdf.SetCreator('Manuel Guzman Generator');
    pdf.PageNo()

    
 


    pdf.SetFont('Arial','B',8); 
    pdf.Cell(40,5,Buffer.from('año', 'utf-8').toString(),1,1);




 
    
    pdf.Output('F','manuel.pdf');


    let newpdf = path.resolve(__dirname, `../manuel.pdf`);
    res.sendFile(newpdf);

    //

}




 