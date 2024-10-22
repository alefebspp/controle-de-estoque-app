import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import ScreenLayout from '../layouts/ScreenLayout';
import Input from '../components/Input';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({route, navigation}: Props) {
  return (
    <ScreenLayout>
      <View className="flex-1 flex flex-col items-center justify-center gap-4">
        <Input placeholder="exemplo@hotmail.com" label="Email" />
        <Input placeholder="****" label="Senha" />
        <Button onPress={() => navigation.navigate('Home')} variant="secondary">
          <Text>Entrar</Text>
        </Button>
      </View>
    </ScreenLayout>
  );
}
