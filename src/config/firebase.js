import { initializeApp, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
function initializeAppIfNecessary() { 
  try {
    return getApp();
  } catch (any) {
    const firebaseConfig = {
      apiKey: 'AIzaSyDyXOdc7IqwAOXOYqxsTHIiZOD_lNHFGZI',
      authDomain: 'ventusfirebase.firebaseapp.com',
      projectId: 'ventusfirebase',
      storageBucket: 'ventusfirebase.appspot.com',
      messagingSenderId: '948934660042',
      appId: '1:948934660042:web:2a95493b38556c8bf10933',
    };
    return initializeApp(firebaseConfig);
  }
}

// const firebaseConfig = {
//   apiKey: 'AIzaSyDyXOdc7IqwAOXOYqxsTHIiZOD_lNHFGZI',
//   authDomain: 'ventusfirebase.firebaseapp.com',
//   projectId: 'ventusfirebase',
//   storageBucket: 'ventusfirebase.appspot.com',
//   messagingSenderId: '948934660042',
//   appId: '1:948934660042:web:2a95493b38556c8bf10933',
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = initializeAppIfNecessary();
export const storage = getStorage(app);






// apiKey: "AIzaSyBDwHtoZUkTBwohMmoLiPkae3Zu4ciiROQ",
// authDomain: "mdcuploadingfile.firebaseapp.com",
// projectId: "mdcuploadingfile",
// storageBucket: "mdcuploadingfile.appspot.com",
// messagingSenderId: "742874950956",
// appId: "1:742874950956:web:b26bea8e687f4d6ef3d089",