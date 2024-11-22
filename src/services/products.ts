import {
  doc,
  setDoc,
  Timestamp,
  query,
  where,
  getDocs,
  limit,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import uuid from 'react-native-uuid';

import {productsRef} from '../config/firebase/collections';
import db from '../config/firebase/db';

export interface Product {
  id: string;
  user_id: string;
  description: string;
  sell_value: number;
  stock_quantity: number;
  created_at: Date;
}

export interface CreateProductRequest {
  description: string;
  sell_value: number;
  stock_quantity: number;
  created_at: Date;
  userId: string;
  stablishment_id: string;
}

export interface GetProductsParams {
  userId: string;
  establishmentId: string;
}

export interface UpdateProductParams {
  productId: string;
  data: {
    description?: string;
    sell_value?: number;
    stock_quantity?: number;
  };
}

export const findProduct = async ({productId}: {productId: string}) => {
  let q = query(productsRef, where('id', '==', productId), limit(1));

  const docSnap = await getDocs(q);

  if (docSnap.empty) {
    return {
      success: false,
      message: 'Produto não existe',
    };
  }

  const product = docSnap.docs[0].data() as Product;

  return {
    success: true,
    message: 'Produto encontrado',
    product,
  };
};

export const updateProduct = async ({productId, data}: UpdateProductParams) => {
  let q = query(productsRef, where('id', '==', productId), limit(1));

  const docSnap = await getDocs(q);

  if (docSnap.empty) {
    return {
      success: false,
      message: 'Produto não existe',
    };
  }

  const docId = docSnap.docs[0].id;
  const productDocRef = doc(db, 'products', docId);

  await updateDoc(productDocRef, {
    ...data,
  });

  return {
    success: true,
    message: 'Produto atualizado',
  };
};

export const deleteProduct = async (productId: string) => {
  let q = query(productsRef, where('id', '==', productId), limit(1));

  const docSnap = await getDocs(q);

  if (docSnap.empty) {
    return {
      success: false,
      message: 'Produto não existe',
    };
  }

  const docId = docSnap.docs[0].id;
  const productDocRef = doc(db, 'products', docId);

  await deleteDoc(productDocRef);

  return {
    success: true,
    message: 'Produto deletado',
  };
};

export const getProducts = async ({
  userId,
  establishmentId,
}: GetProductsParams) => {
  let q = query(
    productsRef,
    where('user_id', '==', userId),
    where('stablishment_id', '==', establishmentId),
  );

  const docSnap = await getDocs(q);

  const products: Product[] = [];

  docSnap.forEach(doc => {
    const product = doc.data() as Product;
    products.push(product);
  });

  return {
    success: true,
    message: '',
    products,
  };
};

export const createProduct = async ({
  userId,
  ...params
}: CreateProductRequest) => {
  const {created_at, ...data} = params;

  if (!data.stablishment_id) {
    return {
      success: false,
      message: 'Selecione um estabelecimento',
    };
  }

  const formatedProduct = {
    ...data,
    created_at: Timestamp.fromDate(created_at),
    id: uuid.v4(),
    user_id: userId,
  };

  await setDoc(doc(productsRef), formatedProduct);

  return {
    success: true,
    message: 'Produto criado com sucesso!',
  };
};
