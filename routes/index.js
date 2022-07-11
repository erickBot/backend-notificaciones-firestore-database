const { Router } = require('express');
const router = Router();
const notificationController = require('../controllers/notifications');

//post
router.post('/api/sendMessage/device', notificationController.sendNotificationToDevice); //a un solo dispositivo
router.post('/api/sendMessage/multicast', notificationController.sendNotificationMultiCast); //a varios dispositivos 

module.exports = router;