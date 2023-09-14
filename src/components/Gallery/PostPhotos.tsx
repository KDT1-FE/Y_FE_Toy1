import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../../utils/firebaseConfig";

function PostPhotos(e: any, albumKey: string) {
  try {
    const file = e.currentTarget.files?.[0];
    const fileName = file.name;
    const ImgsRef = ref(storage, `${albumKey}/${fileName}`);
    const uploadTask = uploadBytesResumable(ImgsRef, file);

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref);
    });
  } catch (err) {
    throw new Error();
  }
}

export default PostPhotos;
