import {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, Text, View, Modal} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import ProductsList from '../components/ProductsList';
import AppLayout from '../layouts/AppLayout';
import Input from '../components/Input';
import Button, {textVariantStyles} from '../components/Button';
import {RootTabParamList} from './Home';
import {deleteProduct, getProducts} from '../services/products';
import {useUserContext} from '../contexts/userContext';

type Props = BottomTabScreenProps<RootTabParamList, 'Products'>;

export default function ProductsScreen({route, navigation}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [productId, setProductId] = useState<string>();
  const [searchText, setSearchText] = useState('');

  const {user, establishment} = useUserContext();

  const queryClient = useQueryClient();

  const onDeletePress = useCallback((id: string) => {
    setProductId(id);
    setModalVisible(true);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    navigation.navigate('Product', {id});
  }, []);

  function closeModal() {
    setModalVisible(false);
    setProductId(undefined);
  }

  const {mutateAsync, isPending} = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      closeModal();
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Produto excluído com sucesso',
      });
      return queryClient.invalidateQueries({
        queryKey: ['products', establishment?.id],
      });
    },
  });

  const {data, isLoading} = useQuery({
    queryKey: ['products', establishment?.id],
    queryFn: async () =>
      getProducts({
        userId: user?.id || '',
        establishmentId: establishment?.id || '',
      }),
    enabled: !!user && !!establishment,
  });

  const filteredProducts = useMemo(
    () =>
      (data?.products || []).filter(product =>
        product.description?.toLowerCase().includes(searchText.toLowerCase()),
      ),
    [data, searchText],
  );

  return (
    <AppLayout title="produtos">
      <Modal
        className="w-full h-2/5 bg-white"
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className="flex-1 bg-black/60 flex items-center justify-end">
          <View className="bg-white w-full h-2/5 p-4 pt-8">
            <Text className="text-graphite-500 text-center text-xl font-semibold">
              Tem certeza que deseja excluir o produto?
            </Text>
            <View className="flex-1 flex flex-row gap-4 items-end justify-center">
              <Button
                onPress={closeModal}
                className="w-2/5 py-3 self-center bg-gray-400 !border-gray-400"
                variant="outline"
                size="rounded">
                <Text className="font-semibold text-white">Cancelar</Text>
              </Button>
              <Button
                isLoading={isPending}
                onPress={async () => await mutateAsync(productId || '')}
                className="w-2/5 py-3 self-center bg-red-600"
                size="rounded">
                <Text className="font-semibold text-white">Excluir</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <View className="flex flex-col gap-2">
        <Text className="font-semibold text-graphite-400">Buscar</Text>
        <Input
          name="search"
          placeholder="Procurar"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <Button
        onPress={() => navigation.navigate('Product')}
        variant="rounded-secondary"
        size="rounded">
        <Text className={textVariantStyles.default}>Novo produto</Text>
      </Button>
      {isLoading ? (
        <View className="flex-1 flex items-center justify-center">
          <ActivityIndicator color="#22c55e" size="large" />
        </View>
      ) : (
        <ProductsList
          onDeletePress={onDeletePress}
          products={filteredProducts || []}
          handleNavigate={handleNavigate}
        />
      )}
    </AppLayout>
  );
}
