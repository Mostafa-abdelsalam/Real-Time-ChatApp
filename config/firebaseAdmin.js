const admin = require('firebase-admin');
const path = require('path');


const serviceAccount = require(path.resolve(__dirname, 'serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const sendNotification = (token, message) => {
  const payload = {
    notification: {
      title: message.title,
      body: message.body
    }
  };

  admin.messaging().sendToDevice(token, payload)
    .then(response => {
      console.log('Successfully sent message:', response);
    })
    .catch(error => {
      console.log('Error sending message:', error);
    });
};

module.exports = { sendNotification };