import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  increment,
  onSnapshot,
  QuerySnapshot,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from './firebase.config';

interface Notice {
  id: string;
  html?: string;
  contents?: string;
  markdown?: string;
  title?: string;
  category?: string;
  location?: string;
  photo?: string;
  restaurant?: string;
  people?: number;
  time?: number;
  joined?: number;
}

export const getData = async (collectionName: string): Promise<Notice[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const docs = querySnapshot.docs.map(doc => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  return docs;
};

export const getDataByField = async (
  collectionName: string,
  fieldName: string,
  fieldValue: string,
) => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, '==', fieldValue),
  );
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });
  return docs;
};

export const addImage = async (image: File) => {
  return new Promise<string | undefined>((resolve, reject) => {
    const filename = Date.now();
    const imageRef = ref(storage, `gallery/${filename}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on(
      'state_changed',
      null,
      error => {
        reject(error);
      },
      async () => {
        try {
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(imageURL);
        } catch (error) {
          reject(error);
        }
      },
    );
  });
};

export const setData = async (
  collectionName: string,
  props: Omit<Notice, 'id'>,
): Promise<void> => {
  const date = new Date();
  const dataId = `${collectionName}-${date.getTime()}`;

  await setDoc(doc(db, collectionName, dataId), props);
};

export const setGalleryData = async (
  collectionName: string,
  props: Omit<Notice, 'id'>,
): Promise<void> => {
  const date = new Date();
  const dataId = `food${date.getTime()}`;

  await setDoc(
    doc(
      db,
      `data-collection/best-restaurant-collection/${collectionName}-food`,
      dataId,
    ),
    props,
  );
};

export const updateData = async (
  collectionName: string,
  dataId: string,
  props: Omit<Notice, 'id'>,
): Promise<void> => {
  await setDoc(doc(db, collectionName, dataId), props);
};

export const deleteData = async (
  collectionName: string,
  dataId: string,
): Promise<void> => {
  await deleteDoc(doc(db, collectionName, dataId));
};

export const updateDataByField = async (
  collectionName: string,
  dataId: string,
  fieldName: string,
  fieldValue: string | number | boolean,
): Promise<void> => {
  const dataRef = doc(db, collectionName, dataId);
  await updateDoc(dataRef, {
    [fieldName]: fieldValue,
  });
};

export const updateDataByNumber = async (
  collectionName: string,
  dataId: string,
  fieldName: string,
): Promise<void> => {
  const dataRef = doc(db, collectionName, dataId);
  await updateDoc(dataRef, {
    [fieldName]: increment(1),
  });
};

export const getDataBySnapshot = (
  collectionName: string,
  callback: (data: Notice[]) => void,
): Unsubscribe => {
  const staleTime = Math.floor(new Date().getTime() / 1000) - 20;
  const q = query(
    collection(db, collectionName),
    where('time', '>', staleTime),
    orderBy('time', 'asc'),
  );
  const unscribe = onSnapshot(q, querySnapshot => {
    const docs = querySnapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });
    callback(docs);
  });
  return unscribe;
};

export const getDataByTimestamp = async (
  collectionName: string,
  fieldName: string,
): Promise<Notice[]> => {
  const staleTime = Math.floor(new Date().getTime() / 1000) - 20;
  const q = query(
    collection(db, collectionName),
    where(fieldName, '>', staleTime),
    orderBy(fieldName, 'asc'),
  );
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });
  return docs;
};

export const createUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
};

export const onAuthStateChanged = (
  callback: (user: User | null) => void,
): Unsubscribe => {
  const unscribe = auth.onAuthStateChanged(user => {
    callback(user);
  });
  return unscribe;
};

export const signOut = async () => {
  await auth.signOut();
};

export const setWithModalData = async (
  collectionName: string,
  props: Notice,
): Promise<void> => {
  const dataId = props.id;

  await setDoc(doc(db, collectionName, dataId), props);
};
