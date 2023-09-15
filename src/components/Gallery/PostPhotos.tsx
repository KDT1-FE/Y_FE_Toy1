import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../../utils/firebaseConfig";

async function PostPhotos(file: File, albumKey: string) {
  try {
    const fileName = file.name;
    const ImgsRef = ref(storage, `${albumKey}/${fileName}`);
    const uploadTask = uploadBytesResumable(ImgsRef, file);
    await uploadTask;
    const downloadURL = await getDownloadURL(ImgsRef);
    return downloadURL;
  } catch (err) {
    throw new Error();
  }
}

export default PostPhotos;
