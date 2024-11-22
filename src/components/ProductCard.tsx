import {memo} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Product} from '../services/products';
import Button from './Button';

type Props = {
  product: Product;
  handleNavigate: (id: string) => void;
  onDeletePress(id: string): void;
};

const ProductCard = memo(function Content({
  product,
  handleNavigate,
  onDeletePress,
}: Props) {
  return (
    <View className="flex flex-col py-2 px-4 border-b border-slate-300">
      <View className="self-start border-b-4 border-primary-light">
        <Text className="uppercase text-xl text-graphite-500 font-medium">
          {product.description}
        </Text>
      </View>
      <View className="flex flex-row justify-between pt-8 pb-12">
        <View className="flex flex-col">
          <Text className="uppercase text-graphite-400 text-xs font-semibold">
            valor de venda
          </Text>
          <Text className="text-graphite-500">
            {product.sell_value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Text>
        </View>
        <View className="flex flex-col">
          <Text className="uppercase text-graphite-400 text-xs font-semibold">
            qtd.estoque
          </Text>
          <Text className="text-graphite-500">{product.stock_quantity}</Text>
        </View>
      </View>
      <View className="flex flex-row justify-end gap-8">
        <Button
          onPress={() => onDeletePress(product.id)}
          variant="ghost"
          size="ghost">
          <Icon name="delete" size={40} color="#FF0000" />
        </Button>
        <Button
          onPress={() => handleNavigate(product.id)}
          variant="ghost"
          size="ghost">
          <Icon name="form" size={40} color="#516d96" />
        </Button>
      </View>
    </View>
  );
});

export default ProductCard;
