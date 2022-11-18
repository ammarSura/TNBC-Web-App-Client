import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import request from 'axios';
import firebaseConfig from './firebase-config.json';

export const signInWithGoogle = async() => {
    const app = initializeApp(firebaseConfig)
    const provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const idToken = await auth!.currentUser!.getIdToken()
  
    return idToken
}