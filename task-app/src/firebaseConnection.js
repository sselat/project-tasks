import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCNgJasETVLOk-volm71VIxoWmwf6kEf1Q",
  authDomain: "cursoapp-c0e18.firebaseapp.com",
  projectId: "cursoapp-c0e18",
  storageBucket: "cursoapp-c0e18.appspot.com",
  messagingSenderId: "679535666001",
  appId: "1:679535666001:web:632fd58ee6438b338ca970"
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export {db, auth}
