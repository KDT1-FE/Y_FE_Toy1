import { db, storage } from 'apis/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const addFirestore = (imageURL: string, selectedCategory: string) => {
  try {
    addDoc(collection(db, 'gallery'), {
      src: imageURL,
      category: selectedCategory,
      timestamp: serverTimestamp(),
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
