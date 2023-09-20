// import React from 'react';
import app from './config';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);
const storage = getStorage(app);
const galleryCollection = collection(db, 'gallery');
const galleryStorageRef = ref(storage, 'images');
const auth = getAuth(app);

export { db, storage, galleryCollection, galleryStorageRef, auth };
