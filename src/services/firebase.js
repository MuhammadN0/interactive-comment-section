import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDmdEILfE3U5DNB015s30Fji7vj6894WkQ',
  authDomain: 'comments-section-582c1.firebaseapp.com',
  projectId: 'comments-section-582c1',
  storageBucket: 'comments-section-582c1.appspot.com',
  messagingSenderId: '632087094943',
  appId: '1:632087094943:web:b20dce8218e73e014ba4aa',
};
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
