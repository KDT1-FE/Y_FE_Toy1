import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {collection, addDoc} from "firebase/firestore";
import {storage, db} from "../../utils/firebaseConfig";

async function PostPhotos(file: File, name: string, albumKey: string) {
  try {
    const fileName = file.name;
    const imgsRef = ref(storage, `${albumKey}/${fileName}`);
    const uploadTask = uploadBytesResumable(imgsRef, file);
    await uploadTask;
    const downloadURL = await getDownloadURL(imgsRef);
    const imagesCollection = collection(db, `${albumKey}`);
    await addDoc(imagesCollection, {
      name,
      imageUrl: downloadURL,
    });
  } catch (err) {
    throw new Error();
  } finally {
    window.location.reload();
  }
}

export default PostPhotos;
