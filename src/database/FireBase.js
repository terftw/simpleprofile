import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB3jrAYN0I7iNi7bATFSnlR790d7tyKD-U",
    authDomain: "glints-demo.firebaseapp.com",
    projectId: "glints-demo",
    storageBucket: "glints-demo.appspot.com",
    messagingSenderId: "673282154980",
    appId: "1:673282154980:web:b05be4ab3664e2870367f1",
    databaseURL:"glints-demo-default-rtdb.asia-southeast1.firebasedatabase.app"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(firebaseApp);
storage.maxUploadRetryTime = 3000;

export {
    db,
    storage
}
