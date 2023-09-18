import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { app } from 'apis/firebase';

export const create = function(category: string, contents: string) {
  const db = getFirestore(app);
  const wikiRef = collection(db, 'wiki')
  try {
    console.log('wiki writing success')
    addDoc(wikiRef, {
      subject: category,
      content: contents,
      writeTime: serverTimestamp()
    })
    return 
  } catch(e) {
    console.log('wiki writing error')
    console.error(e)
  }
}
