const  {  initializeFirestore, publish, subscribe } = require('./dist/pubsub');

const firebaseConfig = {
    apiKey: "AIzaSyBwMs6zV1LeBfTpIs2h_otvO0FWdn1y__s",
    authDomain: "bookstore-c314e.firebaseapp.com",
    databaseURL: "https://bookstore-c314e.firebaseio.com",
    projectId: "bookstore-c314e",
    storageBucket: "bookstore-c314e.appspot.com",
    messagingSenderId: "1069368373475",
    appId: "1:1069368373475:web:2b92097c4e8d8f3b"
  };

initializeFirestore(firebaseConfig)

publish('meu-canal', 'Hello Maza', ['sub-1']);
subscribe('meu-canal', ['sub-1'], (message) => {
    console.log(message)
})