import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDwHtoZUkTBwohMmoLiPkae3Zu4ciiROQ",
  authDomain: "mdcuploadingfile.firebaseapp.com",
  projectId: "mdcuploadingfile",
  storageBucket: "mdcuploadingfile.appspot.com",
  messagingSenderId: "742874950956",
  appId: "1:742874950956:web:b26bea8e687f4d6ef3d089",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
