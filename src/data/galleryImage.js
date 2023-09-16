import { storage, db } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, doc, setDoc, getDocs, collection } from 'firebase/firestore';

// 이미지 storage와 db에 업로드
async function UploadImage(selected, file) {
  try {
    const SwitchCollection = doc(collection(db, selected));
    const storageRef = ref(storage, `${selected}/ ${file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        await setDoc(SwitchCollection, {
          imgUrl: url,
          timestamp: new Date(),
          category: selected,
          comments: ['테스트'],
        });
      });
    });
  } catch (error) {
    console.error();
  }
  return;
}

// 이미지 다운로드
async function getImageData(categoryId) {
  let querySnapshot = '';

  try {
    querySnapshot = await getDocs(collection(db, categoryId));
    const rowImages = [];

    querySnapshot.forEach((doc) => {
      rowImages.push({
        id: doc.id,
        image: doc.data().imgUrl,
        timestamp: doc.data().timestamp,
        comments: doc.data().comments,
      });
    });
    return rowImages;
  } catch (error) {
    console.error();
  }
  return;
}

export { UploadImage, getImageData };
