import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDQW-erUjRKlvBa-E3IaeCJZnFFCvQgcW4",
  authDomain: "coffee-shop-guide.firebaseapp.com",
  databaseURL: "https://coffee-shop-guide.firebaseio.com",
  projectId: "coffee-shop-guide",
  storageBucket: "coffee-shop-guide.appspot.com",
  messagingSenderId: "52947187974",
  appId: "1:52947187974:web:1384578277d166a1ff8687",
  measurementId: "G-3TLN16L2MX"
};

firebase.initializeApp(config);

export default firebase;
