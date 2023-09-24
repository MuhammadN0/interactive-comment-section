import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
const commentsRefCollection = collection(db, 'comments');
const currentUserRefCollection = doc(db, 'currentUser', 'oWf9IHhL6empYaNdTqyP');
const q = query(commentsRefCollection, orderBy('createdAt', 'asc'))
export async function getComments() {
  try {
    const commentSnapshot = await getDocs(q);
    const comments = await Promise.all(
      commentSnapshot.docs.map(async (doc) => {
        const comment = { ...doc.data(), id: doc.id };
        const repliesRefCollection = collection(
          db,
          `comments/${comment.id}/replies`
        );
        const repliesSnapshot = await getDocs(repliesRefCollection);
        const replies = await repliesSnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        const finalComment = { ...comment, replies: [...replies] };
        return finalComment;
      })
    );
    return comments;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function fetchCurrentUser(){
  try{
    const currentUserSnapshot = await getDoc(currentUserRefCollection)
    return {...currentUserSnapshot.data()}
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
/*
export async function fetchCurrentUser() {
  try {
    const res = await fetch('http://localhost:9000/currentUser');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
}*/

//Create a new Comment
export async function postComment(comment){
  try{
    addDoc(commentsRefCollection, comment)
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message)
  }
}
/*
export async function postComment(comment) {
  try {
    const res = await fetch('http://localhost:9000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    const data = await res.json;
    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
}*/

export async function deleteComment(commentId){
  try{
    const commentDoc = doc(db,'comments', commentId)
    deleteDoc(commentDoc)
  }catch (error) {
    console.error(error.message);
    throw new Error(error.message)
  }
}
/*
export async function deleteComment(commentId) {
  try {
    await fetch(`http://localhost:9000/comments/${commentId}`, {
      method: 'DELETE',
    });
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
}*/
export async function deleteReply({commentId, replyId}) {
  try{
    const replyDoc = doc(db,`comments/${commentId}/replies`, replyId)
    deleteDoc(replyDoc)
  }catch (error) {
    console.error(error.message);
    throw new Error(error.message)
  }
}


export async function createReplyOnComment({commentId, reply}){
  try{
    const replyRefCollection = collection(db, `comments/${commentId}/replies`)
    addDoc(replyRefCollection, reply)
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message)
  }
}

export async function updateComment({commentId, updatingData}) {
  try{
    const commentDoc = doc(db,'comments', commentId)
    updateDoc(commentDoc, updatingData)
  }catch (error) {
    console.error(error.message);
    throw new Error(error.message)
  }
}

export async function updateReply({commentId,replyId, updatingData}) {
  try{
    const replyDoc = doc(db,`comments/${commentId}/replies`, replyId)
    updateDoc(replyDoc, updatingData)
  }catch (error) {
    console.error(error.message);
    throw new Error(error.message)
  }
}