import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
const commentsRefCollection = collection(db, 'comments');
// Get a list of cities from your database


export async function testCreateComment() {
  const data = {
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: serverTimestamp(),
    score: 5,
    user: {
      image: {
        png: './images/avatars/image-maxblagun.png',
        webp: './images/avatars/image-maxblagun.webp',
      },
      username: 'maxblagun',
    },
  };
  const reply = {
    content:
      "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
    createdAt: serverTimestamp(),
    score: 2,
    replyingTo: 'ramsesmiron',
    user: {
      image: {
        png: './images/avatars/image-juliusomo.png',
        webp: './images/avatars/image-juliusomo.webp',
      },
      username: 'juliusomo',
    },
  }
  const newDoc = await addDoc(commentsRefCollection, data);
  await addDoc(collection(db, `comments/${newDoc.id}/replies`), reply)
  console.log(newDoc.id)
}
