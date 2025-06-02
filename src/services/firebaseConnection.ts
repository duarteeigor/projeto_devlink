import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAFVQQpUfp6jvqQugsKuWcNkvEC0Av2uiU",
    authDomain: "linktree-ed06a.firebaseapp.com",
    projectId: "linktree-ed06a",
    storageBucket: "linktree-ed06a.firebasestorage.app",
    messagingSenderId: "510637720406",
    appId: "1:510637720406:web:49285ad239d4bf80ba8cf7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}