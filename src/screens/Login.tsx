import {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../App';
import ScreenLayout from '../layouts/ScreenLayout';
import Input from '../components/Input';
import Button, {textVariantStyles} from '../components/Button';
import {useUserContext} from '../contexts/userContext';

const loginSchema = z.object({
  email: z
    .string({message: 'Campo obrigatório'})
    .email({message: 'E-mail inválido'})
    .min(1, {message: 'Campo obrigatório'}),
  password: z.string({message: 'Campo obrigatório'}).min(1),
});

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({route, navigation}: Props) {
  const {login, isLoggedIn} = useUserContext();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const response = await login(values);

    if (response.success) {
      navigation.navigate('Home');
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Home');
    }
  }, [isLoggedIn]);

  return (
    <ScreenLayout>
      <View className="flex-1 flex flex-col items-center justify-center gap-4">
        <Controller
          control={control}
          name="email"
          render={({field}) => (
            <Input
              name="email"
              onChangeText={field.onChange}
              errors={errors}
              placeholder="exemplo@hotmail.com"
              label="Email"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({field}) => (
            <Input
              name="password"
              onChangeText={field.onChange}
              errors={errors}
              placeholder="****"
              secureTextEntry
              label="Senha"
            />
          )}
        />
        <Button
          isLoading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          variant="secondary">
          <Text className={textVariantStyles.default}>Entrar</Text>
        </Button>
      </View>
    </ScreenLayout>
  );
}
