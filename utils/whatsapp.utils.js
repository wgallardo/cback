const SESSION_FILE_PATH = './mediaSend/session.json';
const fs = require('fs');
const { Client, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
var client;
var sessionData;

const withSession = () => {

}
 
const withOutSession = () => {
    console.log('No tenemos session guardada');
    console.log([
        '🙌 El core de whatsapp se esta actualizando',
        '________________________',
    ].join('\n'));

    client = new Client();



    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    })

    client.on('authenticated', async (session)  => {
    	sessionData = session;
    	console.log(session);
        if(sessionData){

            fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
                if (err) {
                    console.log(`Ocurrio un error con el archivo: `, err);
                }
            });
        }
    });

    client.initialize();
}

(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession();