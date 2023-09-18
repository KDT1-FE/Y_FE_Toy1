import { db, storage } from 'apis/firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const addFirestore = (imageURL: string, selectedCategory: string) => {
  try {
    addDoc(collection(db, 'gallery'), {
      src: imageURL,
      category: selectedCategory,
      timestamp: serverTimestamp(),
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    alert(error);
  }
};

export const addStorage = (
  file: FileList,
  setImageURL: React.Dispatch<React.SetStateAction<string>>,
) => {
  const storageRef = ref(storage, `images/${file[0].name}`);
  const uploadTask = uploadBytes(storageRef, file[0]);

  uploadTask.then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      setImageURL(downloadURL);
    });
  });
};

export interface GalleryData {
  category: string;
  src: string;
  timestamp: string;
  id: string;
}

export const getStorage = async () => {
  try {
    const getImg = collection(db, 'gallery');
    const result = await getDocs(query(getImg, orderBy('timestamp', 'desc')));

    const resultArray: GalleryData[] = [];
    result.forEach((doc) => {
      const galleryData = doc.data();
      resultArray.push({
        category: galleryData.category,
        src: galleryData.src,
        timestamp: galleryData.timestamp,
        id: doc.id,
      });
    });
    return resultArray;
  } catch (error) {
    alert('오류가 발생했습니다.');
  }
};

export const deleteGalleryData = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'gallery', id));
    window.location.reload();
  } catch (error) {
    alert('데이터를 삭제하는 과정에서 오류가 발생했습니다.');
  }
};
