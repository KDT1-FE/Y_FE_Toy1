import { db } from './firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

async function readBoardData(boardState) {
  let collectionref;
  const data = [];
  if (boardState == 'QA') {
    collectionref = collection(db, 'QABoard');
  } else if (boardState == 'Free') {
    collectionref = collection(db, 'FreeBoard');
  } else if (boardState == 'Best') {
    collectionref = collection(db, 'BestBoard');
  } else {
    return;
  }
  try {
    const querySnapshot = await getDocs(collectionref);
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
  } catch (error) {
    console.error(error);
  }
  return data;
}

async function readPostData(boardState, postNumber) {
  const ref = doc(db, boardState, postNumber);
  let postData;
  try {
    postData = await getDoc(ref);
  } catch (error) {
    console.error(error);
  }
  return postData;
}

async function addNewPostDB(boardState, postData) {
  let collectionref;
  let lastPostId = await readLastPostId(boardState);
  let newPostId = ++lastPostId.data().LASTPOSTID;

  newPostId = newPostId.toString();

  if (boardState == 'QA') {
    collectionref = doc(db, 'QABoard', newPostId);
  } else if (boardState == 'Free') {
    collectionref = doc(db, 'FreeBoard', newPostId);
  } else if (boardState == 'Best') {
    collectionref = doc(db, 'BestBoard', newPostId);
  } else {
    return;
  }
  try {
    await setDoc(collectionref, postData);
    await updateLastPostId(boardState, newPostId);
  } catch (error) {
    console.error(error);
  }
}

async function readLastPostId(boardState) {
  let postDataLast;
  let ref;
  if (boardState == 'QA') {
    ref = doc(db, 'PostData', 'QABoard');
  } else if (boardState == 'Free') {
    ref = doc(db, 'PostData', 'FreeBoard');
  } else if (boardState == 'Best') {
    ref = doc(db, 'PostData', 'BestBoard');
  } else {
    return;
  }
  try {
    postDataLast = await getDoc(ref);
  } catch (error) {
    console.error(error);
  }
  return postDataLast;
}

async function updateLastPostId(boardState, newPostId) {
  let postref;
  const updateData = { LASTPOSTID: +newPostId };
  if (boardState == 'QA') {
    postref = doc(db, 'PostData', 'QABoard');
  } else if (boardState == 'Free') {
    postref = doc(db, 'PostData', 'FreeBoard');
  } else if (boardState == 'Best') {
    postref = doc(db, 'PostData', 'BestBoard');
  } else {
    return;
  }
  try {
    await updateDoc(postref, updateData);
  } catch (error) {
    console.log(error);
  }
}

async function updatePostData(boardState, postId, updateData) {
  const postRef = doc(db, boardState, postId);

  try {
    await updateDoc(postRef, updateData);
  } catch (error) {
    console.log(error);
  }
}

async function deletePostData(boardState, postId) {
  const docPath = `${boardState}/${postId}`;
  try {
    const docRef = doc(db, docPath);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
}

export {
  readBoardData,
  readPostData,
  addNewPostDB,
  readLastPostId,
  updatePostData,
  deletePostData,
};
