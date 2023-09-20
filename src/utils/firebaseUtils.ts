import { ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../common/config';
import { commuteType } from '../data/atoms';
import { arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore';

export const uploadCommuteInfo = async (
  uid: string | null | undefined,
  commuteData: commuteType,
) => {
  if (!uid) return;

  const dateStr = new Date(commuteData.date).toISOString().split('T')[0];
  const commuteDateRef = doc(db, 'commute', uid, 'commuteDays', dateStr);
  // const commuteDateDoc = await getDoc(commuteDateRef);

  const updateData = {
    startTime: commuteData.startTime,
    endTime: commuteData.endTime,
    workingTime: commuteData.workingTime,
  };

  await setDoc(commuteDateRef, { session: arrayUnion(updateData) }, { merge: true });

  // Fetch and log the document after uploading
  const updatedCommuteDateDoc = await getDoc(commuteDateRef);
  console.log('Data after upload:', updatedCommuteDateDoc.data());
};

export const uploadImage = (blob: Blob) => {
  const storageRef = ref(storage, 'test/' + Date.now());

  if (blob) {
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
    });
  } else {
    console.log('blob is null');
  }
};
