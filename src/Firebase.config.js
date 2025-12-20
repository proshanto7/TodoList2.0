// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpey8HszjY3Od7bnR5-WyqczwVMV4vT8g",
  authDomain: "todolist-8f905.firebaseapp.com",
  databaseURL: "https://todolist-8f905-default-rtdb.firebaseio.com",
  projectId: "todolist-8f905",
  storageBucket: "todolist-8f905.firebasestorage.app",
  messagingSenderId: "611616415954",
  appId: "1:611616415954:web:921a981d6b2953229b0d0b"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

  export default firebaseConfig;