import {collection} from 'firebase/firestore';

import db from './db';

export const movementsRef = collection(db, 'movement');
export const productsRef = collection(db, 'products');
export const stablishmentsRef = collection(db, 'stablishments');
