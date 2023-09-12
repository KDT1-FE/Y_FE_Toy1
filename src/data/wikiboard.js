import { db,app } from './firebase';
import {collection,getDocs} from 'firebase/firestore'




async function readBoardData(boardState){
    let QACollection;
    const data = [];
    if (boardState == 'QA'){
        QACollection = collection(db,'QABoard');
    }
    else if (boardState == 'Free'){
        QACollection = collection(db,'FreeBoard');
    }
    else if (boardState == 'Best'){
        QACollection = collection(db,'BestBoard');
    }
    else {
        return
    }
    try {
        const querySnapshot = await getDocs(QACollection);
        querySnapshot.forEach((doc)=>{
            data.push(doc.data())
        })
    }
    catch (error){
        console.error('error')
    }
    return data
}

export {readBoardData}