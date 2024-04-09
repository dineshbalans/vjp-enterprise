import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLqxu4gw5Gk50zNzQfrJPwaeAIdye1GuE",
  authDomain: "vjp-enterprices.firebaseapp.com",
  projectId: "vjp-enterprices",
  storageBucket: "vjp-enterprices.appspot.com",
  messagingSenderId: "622537136600",
  appId: "1:622537136600:web:0af61858a2f0308c343aad",
  measurementId: "G-XDWHDN5SW0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider(app);
googleProvider.setCustomParameters({ prompt: "select_account" });
// const analytics = getAnalytics(app);

export { auth, db, googleProvider };

let flag = true;
export const loader = async () => {
  if (flag) {
    const ref = collection(db, "products");
    const rawItems = await getDocs(ref);
    const filteredItems = rawItems.docs.map((doc) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      };
      return data;
    });
    flag = false;
    return filteredItems;
  }
  return null;
};
