import app from './config';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

export default db;
