import {deleteObject, ref} from "firebase/storage";
import {storage} from "../../utils/firebaseConfig";

async function DeletePhotos(
  albumKey: string,
  allArray: string[],
  selectedArray: string[],
) {
  const albumFolderRef = ref(storage, albumKey);
  const filesToDelete = allArray.filter(file => selectedArray.includes(file));
  filesToDelete.forEach(async file => {
    try {
      const url = new URL(file);
      const fileName = decodeURIComponent(url.pathname).split("/").pop();
      const fileRef = ref(albumFolderRef, fileName);
      await deleteObject(fileRef);
    } catch (error) {
      throw new Error();
    } finally {
      window.location.reload();
    }
  });
}

export default DeletePhotos;
