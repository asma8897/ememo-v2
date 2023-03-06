import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCCjQ1ZI_yN3aPuawhx2jbhB3vZC4ULpyg",
    authDomain: "ememo-ca3a0.firebaseapp.com",
    projectId: "ememo-ca3a0",
    storageBucket: "ememo-ca3a0.appspot.com",
    messagingSenderId: "97752791163",
    appId: "1:97752791163:web:95eaad1cfe050d763c8ade",
    measurementId: "G-DGEJ0CQNX3"
};
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;