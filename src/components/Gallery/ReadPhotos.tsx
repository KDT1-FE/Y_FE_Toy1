import {listAll, getDownloadURL, ref} from "firebase/storage";
import {storage} from "../../utils/firebaseConfig";

async function ReadPhotos(albumKey: string): Promise<string[]> {
  const albumRef = ref(storage, `${albumKey}`);
  const downloadURLs: string[] = [];
  try {
    const imageList = await listAll(albumRef);
    await Promise.all(
      imageList.items.map(async imageItem => {
        const imageUrl = await getDownloadURL(imageItem);
        downloadURLs.push(imageUrl);
      }),
    );
    return downloadURLs;
  } catch (error) {
    throw new Error();
  }
}
export default ReadPhotos;
