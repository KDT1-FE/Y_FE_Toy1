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

export const addGalleryData = async (
  imageURL: string,
  selectedCategory: string,
) => {
  try {
    await addDoc(collection(db, 'gallery'), {
      src: imageURL,
      category: selectedCategory,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    alert('알 수 없는 오류가 발생했습니다.');
  }
};

export const addStorage = async (image: File) => {
  const storageRef = ref(storage, image.name);
  try {
    const snapshot = await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    alert('알 수 없는 오류가 발생했습니다.');
  }
};

export interface GalleryData {
  category: string;
  src: string;
  timestamp: string;
  id: string;
}

export const getGalleryData = async () => {
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
  } catch (error) {
    alert('데이터를 삭제하는 과정에서 오류가 발생했습니다.');
  }
};
