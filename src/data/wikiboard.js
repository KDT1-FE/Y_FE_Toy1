

import { db,app } from './firebase';
import {collection,getDocs,doc,getDoc, setDoc, updateDoc} from 'firebase/firestore'





async function readBoardData(boardState){
    let collectionref
    const data = [];
    if (boardState == 'QA'){
        collectionref = collection(db,'QABoard');
    }
    else if (boardState == 'Free'){
        collectionref = collection(db,'FreeBoard');
    }
    else if (boardState == 'Best'){
        collectionref = collection(db,'BestBoard');
    }
    else {
        return
    }
    try {
        const querySnapshot = await getDocs(collectionref);
        querySnapshot.forEach((doc)=>{
            data.push(doc.data())
        })
    }
    catch (error){
        console.error('error')
    }
    return data
}

async function readPostData(boardState,postNumber){
    const ref = doc(db,boardState,postNumber)
    let postData;
    try {
        postData = await getDoc(ref);
    }
    catch (error){
        console.error('error')
    }
    return postData
}

async function addNewPostDB (boardState,postData){
    let collectionref;
    let lastPostId = await readLastPostId('QA');
    let newPostId = ++(lastPostId.data().LASTPOSTID)
    
    newPostId = newPostId.toString()
    
    if (boardState == 'QA'){
        collectionref = doc(db,'QABoard',newPostId);
    }
    else if (boardState == 'Free'){
        collectionref = doc(db,'FreeBoard',newPostId);
    }
    else if (boardState == 'Best'){
        collectionref = doc(db,'BestBoard',newPostId);
    }
    else {
        return
    }
    try {
        // console.log(postData);
        await setDoc(collectionref,postData)
        await updateLastPostId(boardState,newPostId)
    }
    catch (error){
        console.error('error')
    }
}

async function updateLastPostId (boardState,newPostId){
    let postref;
    const updateData = {LASTPOSTID:+newPostId}
    if (boardState == 'QA'){
        postref = doc(db,'PostData','QABoard');
    }
    else if (boardState == 'Free'){
        postref = doc(db,'PostData','FreeBoard');
    }
    else if (boardState == 'Best'){
        postref = doc(db,'PostData','BestBoard');
    }
    else {
        return
    }
    console.log(postref);
    try {
        await updateDoc(postref,updateData)
    }
    catch (error) {
        console.log('error')
    }
}

async function readLastPostId (boardState){
    let postDataLast;
    let ref;
    if (boardState == 'QA'){
        ref = doc(db,'PostData','QABoard');
    }
    else if (boardState == 'Free'){
        ref = doc(db,'PostData','FreeBoard');
    }
    else if (boardState == 'Best'){
        ref = doc(db,'PostData','BestBoard');
    }
    else {
        return
    }
    try {
        postDataLast = await getDoc(ref);
    }
    catch (error){
        console.error('error')
    }
    return postDataLast;
}

export {readBoardData,readPostData,addNewPostDB,readLastPostId}