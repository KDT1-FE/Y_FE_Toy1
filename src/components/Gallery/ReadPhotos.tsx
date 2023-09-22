import {collection, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebaseConfig";
import {ImageInfo} from "../../types/Gallery";

async function ReadPhotos(albumKey: string): Promise<ImageInfo[]> {
  try {
    const imageNameList = await getDocs(collection(db, `${albumKey}`));
    const downloadURLs: {name: string; imageUrl: string}[] = [];
    await Promise.all(
      imageNameList.docs.map(async docs => {
        const data = docs.data();
        const item = {
          name: data.name,
          imageUrl: data.imageUrl,
        };
        downloadURLs.push(item);
      }),
    );
    return downloadURLs;
  } catch (error) {
    return [];
  }
}
export default ReadPhotos;
