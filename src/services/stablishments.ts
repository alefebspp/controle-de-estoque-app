import {getDocs, query, where} from 'firebase/firestore';

import {stablishmentsRef} from '../config/firebase/collections';

import {Establishment} from '../types';

export const getEstablishments = async (user_id: string) => {
  let q = query(stablishmentsRef, where('user_id', '==', user_id));

  const docSnap = await getDocs(q);

  const establishments: Establishment[] = [];

  for (const doc of docSnap.docs) {
    const stablishment = doc.data() as Establishment;

    establishments.push(stablishment);
  }

  return establishments;
};

export const getEstablishment = async (establishment_id: string) => {
  let q = query(stablishmentsRef, where('id', '==', establishment_id));

  const docSnap = await getDocs(q);

  if (docSnap.empty) {
    return null;
  }

  const establishment = docSnap.docs[0].data() as Establishment;

  return establishment;
};
