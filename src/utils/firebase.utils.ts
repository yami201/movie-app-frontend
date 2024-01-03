import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInAnonymously,
    User
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC5A5A4dC1QvZYja7xc-57V0CvFUgh7zzs",
    authDomain: "movies-app-23584.firebaseapp.com",
    projectId: "movies-app-23584",
    storageBucket: "movies-app-23584.appspot.com",
    messagingSenderId: "960304418927",
    appId: "1:960304418927:web:61489c08e88b01e28cfd9a"
};

initializeApp(firebaseConfig);

const auth = getAuth();

export const registerUser = async (email : string, password : string) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email : string, password : string) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const getCurrentUser = async () => {
    return new Promise<User | null>((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};

export const signInAnonymouslyUser = async () => {
    return await signInAnonymously(auth);
}

export const logoutUser = () => {
    return auth.signOut();
}
