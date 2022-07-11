const admin = require('firebase-admin');
const firestoreController = require('../controllers/firestore');

function initFirebase(){
    const serviceAccount = require('../keys/serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

initFirebase();

var options = {
    priority: "high",
    timeToLive: 60 * 60 *24
  };

module.exports = {

     async sendNotificationToDevice(req, res){
        //obtener token de usuario
        const notification = req.body;
        //obtenemos token de cliente 
        const token = await firestoreController.getUserById(notification.id);
        if (token){
            try{
                const payload = {
                    notification: {
                      title: notification.titulo,
                      body: notification.mensaje
                    }
                  };
        
                await admin.messaging().sendToDevice(token, payload, options);
    
                return res.status(200).json({
                    ok: true,
                    message: 'Envio de notification con exito',
                });
    
            }catch(error){
                console.log(error);
                return res.status(501).json({
                    ok: false,
                    message: 'Error a enviar notificacion',
                });
    
            }
        }else{
            return res.status(501).json({
                ok: false,
                message: 'Error a enviar notificacion',
            });
        }

      
    },

    async sendNotificationMultiCast(req, res){
        const notification = req.body;
        const tokens = await firestoreController.getAllUsers();
        //console.log(`TOKENS: ${tokens}`);
   
        try{
            //const tokens = notification.tokens;
            const payload = {
                notification: {
                  title: notification.titulo,
                  body: notification.mensaje
                },
                tokens: tokens
              };
            await admin.messaging().sendMulticast(payload);

            return res.status(200).json({
                ok: true,
                message: 'Envio de notification con exito',
            });

        }catch(error){
            console.log(error);
            return res.status(501).json({
                ok: false,
                message: 'Error a enviar notificacion',
            });
        }
       
    }
}