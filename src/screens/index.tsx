import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import SectionLayout from '../layouts/SectionLayout';
import EstablishmentCard from '../components/EstablishmentCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function DefaultScreen({route, navigation}: Props) {
  return (
    <SectionLayout title="Início" subtitle="Estabelecimentos">
      <EstablishmentCard
        establishmentName="Carol Fashion"
        isSelected
        onPress={() => console.log('Test!')}
      />
      <EstablishmentCard
        establishmentName="Fio Fest"
        onPress={() => console.log('Test!')}
      />
    </SectionLayout>
  );
}
