import {ActivityIndicator, Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useQuery} from '@tanstack/react-query';

import AppLayout from '../layouts/AppLayout';
import EstablishmentCard from '../components/EstablishmentCard';
import {RootTabParamList} from './Home';
import {getEstablishments} from '../services/stablishments';
import {useUserContext} from '../contexts/userContext';

type Props = BottomTabScreenProps<RootTabParamList, 'Establishments'>;

export default function EstablishmentsScreen({route, navigation}: Props) {
  const {user, establishment, selectEstablishment} = useUserContext();

  const {data, isLoading} = useQuery({
    queryFn: async () => getEstablishments(user?.id || ''),
    queryKey: ['establishments'],
  });

  return (
    <AppLayout title="Início">
      {isLoading ? (
        <View className="flex-1 flex items-center justify-center">
          <ActivityIndicator color="#22c55e" size="large" />
        </View>
      ) : (
        <>
          <Text className="text-gray-500 font-semibold text-lg">
            Estabelecimentos
          </Text>
          {data?.map(savedEstablishment => (
            <EstablishmentCard
              key={savedEstablishment.id}
              establishmentName={savedEstablishment.name}
              isSelected={establishment?.id === savedEstablishment.id}
              onPress={() => selectEstablishment(savedEstablishment)}
            />
          ))}
        </>
      )}
    </AppLayout>
  );
}
