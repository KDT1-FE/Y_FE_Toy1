import { storage } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';

export async function uploadImageToStorage(file) {
  const storageRef = ref(storage, 'Gallery/' + file.name);

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log(file.name);
  });
}
