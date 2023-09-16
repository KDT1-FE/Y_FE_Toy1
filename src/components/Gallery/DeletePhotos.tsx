import {deleteObject, ref} from "firebase/storage";
import {collection, deleteDoc, getDocs} from "firebase/firestore";
import {storage, db} from "../../utils/firebaseConfig";

async function DeletePhotos(
  albumKey: string,
  allArray: string[],
  selectedArray: string[],
) {
  const albumFolderRef = ref(storage, albumKey);
  const filesToDelete = allArray.filter(file => selectedArray.includes(file));

  const imagesCollection = collection(db, albumKey);
  const imgSnapshot = await getDocs(imagesCollection);
  const deletionPromises: any[] = [];

  imgSnapshot.forEach(async docs => {
    try {
      const docData = docs.data();
      const url = docData.imageUrl;
      if (selectedArray.includes(url)) {
        deletionPromises.push(deleteDoc(docs.ref));
      }
    } catch (error) {
      throw new Error();
    }
  });

  filesToDelete.forEach(async file => {
    try {
      const url = new URL(file);
      const fileName = decodeURIComponent(url.pathname).split("/").pop();
      const fileRef = ref(albumFolderRef, fileName);
      deletionPromises.push(deleteObject(fileRef));
    } catch (error) {
      throw new Error();
    }
  });

  try {
    await Promise.all(deletionPromises);
  } catch (error) {
    throw new Error();
  } finally {
    window.location.reload();
  }
}

export default DeletePhotos;
