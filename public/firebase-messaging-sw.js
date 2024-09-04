importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAEMCsFGrLul2TdTmJybkfniCtkE7lFf8A",
  authDomain: "real-time-chat-app-fd8a8.firebaseapp.com",
  projectId: "real-time-chat-app-fd8a8",
  storageBucket: "real-time-chat-app-fd8a8.appspot.com",
  messagingSenderId: "375232203236",
  appId: "1:375232203236:web:5208da812775c8a63f1ff1",
  measurementId: "G-4VG35VQZWB"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
