import firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDHDS8Apj46weZU-UZrzVF0KJPJv01MaHU",
  authDomain: "test-80e7a.firebaseapp.com",
  databaseURL: "https://test-80e7a-default-rtdb.firebaseio.com",
  projectId: "test-80e7a",
  storageBucket: "test-80e7a.appspot.com",
  messagingSenderId: "477556617894",
  appId: "1:477556617894:web:7f6f255c4faaa3f6557a67"
};

export default firebase.initializeApp(firebaseConfig)