import { getFirestore, collection, addDoc, query, getDocs, where, orderBy, limit, serverTimestamp } from 'firebase/firestore/lite';
import { app } from 'apis/firebase';

const db = getFirestore(app);
const wikiRef = collection(db, 'wiki')
export const create = function(category: string, contents: string) {
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

export const read = async function(category: string) {
  const document = query(wikiRef, where('subject', '==', category), orderBy('writeTime'), limit(1))
  const latestDocument = await getDocs(document)
  // latestDocument.forEach((doc) => {
  //   console.log(doc.data())
  // })
  return latestDocument
}