import {useCallback} from 'react';
import {FlatList} from 'react-native';
import {Product} from '../services/products';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
  handleNavigate: (id: string) => void;
  onDeletePress(id: string): void;
};

export default function ProductsList({
  products,
  handleNavigate,
  onDeletePress,
}: Props) {
  const renderItem = useCallback(
    ({item}: {item: Product}) => (
      <ProductCard
        key={item.id}
        onDeletePress={onDeletePress}
        handleNavigate={handleNavigate}
        product={item}
      />
    ),
    [],
  );

  return (
    <FlatList
      initialNumToRender={4}
      maxToRenderPerBatch={2}
      data={products}
      renderItem={renderItem}
    />
  );
}
