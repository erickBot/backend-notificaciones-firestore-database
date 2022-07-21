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
                      body: notification.mensaje,
                    },
                   
                    data: {
                        name: notification.name,
                        address: notification.address,
                        latitud: notification.lat,
                        longitud: notification.lng,
                        idUser: notification.id
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
                tokens: tokens,
                click_action:"OPEN_ACTIVITY_1",
                android: {
                    notification: {
                      imageUrl: 'https://res.cloudinary.com/erickbot/image/upload/v1658338419/hgfe5xknfki7pv5flqpf.png'
                    }
                  },
                apns: {
                    payload: {
                      aps: {
                        'mutable-content': 1
                      }
                    },
                    fcm_options: {
                      image: 'https://res.cloudinary.com/erickbot/image/upload/v1658338419/hgfe5xknfki7pv5flqpf.png'
                    }
                },
                webpush: {
                    headers: {
                      image: 'https://res.cloudinary.com/erickbot/image/upload/v1658338419/hgfe5xknfki7pv5flqpf.png'
                    }
                  },
                data: {
                    name: notification.name,
                    address: notification.address,
                    latitud: notification.lat,
                    longitud: notification.lng,
                    idUser: notification.id
                }
              };
            await admin.messaging().sendMulticast(payload);

            return res.status(200).json({
                ok: true,
                message: 'Envio de notification multicast con exito',
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