import { storage, db } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, getDocs, collection } from 'firebase/firestore';

// 이미지 storage와 db에 업로드
// export async function UploadImage(file) {
//   const storageRef = ref(storage, 'Gallery/' + file.name);

//   uploadBytes(storageRef, file).then((snapshot) => {
//     getDownloadURL(snapshot.ref).then(async (url) => {
//       await addDoc(collection(db, 'Gallery'), {
//         imgUrl: url,
//         timestamp: new Date(),
//       });
//     });

//   });
// }

export async function UploadImage(category, file) {
  let SwitchCollection = '';
  let storageRef = '';

  switch (category) {
    case 'studyTips':
      SwitchCollection = collection(db, 'StudyTipsGallery');
      storageRef = ref(storage, 'StudyTipsGallery/' + file.name);
      break;
    case 'events':
      SwitchCollection = collection(db, 'EventsGallery');
      storageRef = ref(storage, 'EventsGallery/' + file.name);
      break;
    case 'humors':
      SwitchCollection = collection(db, 'HumorsGallery');
      storageRef = ref(storage, 'HumorsGallery/' + file.name);
      break;
  }

  try {
    const querySnapshot = await getDocs(SwitchCollection);

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        querySnapshot,
          {
            imgUrl: url,
            timestamp: new Date(),
          };
      });
    });
  } catch (error) {
    console.error('error');
  }
  return;
}

// 이미지 다운로드

const querySnapshot = await getDocs(collection(db, 'Gallery'));
const getDocsAsObjects = (querySnapshot) => {
  const rowImages = [];

  querySnapshot.forEach((doc) => {
    rowImages.push({
      id: doc.id,
      image: doc.data().imgUrl,
      timestamp: doc.data().timestamp,
    });
  });
  return rowImages;
};
export const GetImages = getDocsAsObjects(querySnapshot);

console.log(GetImages);
