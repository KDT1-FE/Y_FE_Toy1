import { getFirestore, collection, addDoc, doc, query, getDocs, where, orderBy, limit, serverTimestamp, deleteDoc } from 'firebase/firestore/lite';
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
  // 쿼리를 통해 데이터베이스 내에서 선택된 카테고리의 게시글 중 작성 시간이 가장 빠른 글을 하나 가져옴
  const document = query(wikiRef, where('subject', '==', category), orderBy('writeTime', 'desc'), limit(1))
  const latestDocument = await getDocs(document)

  if (latestDocument.docs.length !== 0) {
    return latestDocument.docs[0].data();
  } else {
    return;
  }
}

export const wikiDelete = async function (category: string) {
  try {
    await deleteDoc(doc(db, `wiki/${category}`))
    console.log('wiki delete success')
    window.location.reload()
  } catch(e) {
    alert('삭제에 실패했습니다.')
    console.error(e)
  }
}