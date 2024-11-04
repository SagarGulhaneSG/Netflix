import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBSTMhnkk9hN8tVQmaOp2zU8x4ciKmV9fM",
  authDomain: "netflix-clone-dca26.firebaseapp.com",
  projectId: "netflix-clone-dca26",
  storageBucket: "netflix-clone-dca26.appspot.com",
  messagingSenderId: "472617411157",
  appId: "1:472617411157:web:28d10fd60af151058a2adc"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password) =>{
    try {
       const res = await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection(db, 'user'),{
        uid :user.uid,
        name, 
        authProvider:"local",
        email,
       });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" ") );
    }
}

const login = async (email,password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password)
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
}

const logout =()=>{
  signOut(auth);
}

export {auth,db,login,signup,logout};