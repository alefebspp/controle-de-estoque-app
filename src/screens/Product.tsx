import {useCallback} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {z} from 'zod';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useFocusEffect} from '@react-navigation/native';

import AppLayout from '../layouts/AppLayout';
import {RootTabParamList} from './Home';
import Input from '../components/Input';
import Button, {textVariantStyles} from '../components/Button';
import {createProduct, findProduct, updateProduct} from '../services/products';
import {useUserContext} from '../contexts/userContext';
import {CURRENCYMask, replaceCurrencyMask} from '../utils/masks';
import Toast from 'react-native-toast-message';

type Props = BottomTabScreenProps<RootTabParamList, 'Product'>;

const formSchema = z.object({
  description: z
    .string({message: 'Campo obrigatório'})
    .min(1, {message: 'Campo obrigatório'}),
  sell_value: z
    .string({message: 'Campo obrigatório'})
    .min(1, {message: 'Campo obrigatório'}),
  stock_quantity: z
    .string({message: 'A quantidade dever ser igual ou maior que 1'})
    .min(1, {message: 'A quantidade dever ser igual ou maior que 1'})
    .refine(value => parseInt(value) > 1, {
      message: 'A quantidade dever ser igual ou maior que 1',
    }),
});

export default function ProductScreen({route, navigation}: Props) {
  const params = route.params;

  const productId = params?.id;

  const {user, establishment} = useUserContext();
  const queryClient = useQueryClient();

  const {data, isLoading} = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => findProduct({productId: productId || ''}),
    enabled: !!productId,
  });

  const {mutateAsync: createProductMutate} = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['products', establishment?.id],
      });
    },
  });

  const {mutateAsync: updateProductMutate} = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['product', productId]});
      return queryClient.invalidateQueries({
        queryKey: ['products', establishment?.id],
      });
    },
  });
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const sell_value = replaceCurrencyMask(values.sell_value);
    const stock_quantity = parseInt(values.stock_quantity);

    if (productId) {
      await updateProductMutate({
        productId,
        data: {...values, sell_value, stock_quantity},
      });
      Toast.show({
        type: 'success',
        text1: 'Sucesso!',
        text2: 'Produto atualizado com sucesso.',
      });
    } else {
      await createProductMutate({
        ...values,
        stock_quantity,
        sell_value,
        stablishment_id: establishment?.id || '',
        userId: user?.id || '',
        created_at: new Date(),
      });
      Toast.show({
        type: 'success',
        text1: 'Sucesso!',
        text2: 'Produto criado com sucesso.',
      });
    }

    navigation.navigate('Products');
  }

  useFocusEffect(
    useCallback(() => {
      if (data?.product) {
        reset({
          ...data.product,
          sell_value: data.product.sell_value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          stock_quantity: String(data.product.stock_quantity),
        });
      }

      return () => {
        reset({
          description: '',
          sell_value: '',
          stock_quantity: '',
        });
      };
    }, [data, reset]),
  );

  if (isLoading) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <ActivityIndicator color="#22c55e" size="large" />
      </View>
    );
  }

  return (
    <AppLayout
      title={data?.product ? data.product.description : 'Novo produto'}>
      <Controller
        control={control}
        name="description"
        render={({field}) => (
          <Input
            name={field.name}
            onChangeText={field.onChange}
            errors={errors}
            label="Descrição"
            value={field.value}
          />
        )}
      />
      <Controller
        control={control}
        name="sell_value"
        render={({field}) => (
          <Input
            keyboardType="numeric"
            name={field.name}
            onChangeText={text => field.onChange(CURRENCYMask(text))}
            errors={errors}
            label="Valor de venda"
            value={field.value}
          />
        )}
      />
      <Controller
        control={control}
        name="stock_quantity"
        render={({field}) => (
          <Input
            keyboardType="numeric"
            name={field.name}
            onChangeText={text => field.onChange(text)}
            errors={errors}
            label="Qtd. estoque"
            value={field.value}
          />
        )}
      />

      <Button
        isLoading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        variant="secondary">
        <Text className={textVariantStyles.default}>
          {productId ? 'Editar produto' : 'Novo produto'}
        </Text>
      </Button>
    </AppLayout>
  );
}
