import {Text, View} from 'react-native';
import Button from './Button';

type Props = {
  establishmentName: string;
  isSelected?: boolean;
  onPress: () => void;
};

export default function EstablishmentCard({
  establishmentName,
  isSelected,
  onPress,
}: Props) {
  return (
    <View className="w-full rounded-xl flex flex-col gap-8 bg-graphite-600 p-6">
      <Text
        className={`text-graphite-400 ${isSelected && 'text-secondary-neon'}`}>
        {establishmentName}
      </Text>

      <Button
        className={`bg-graphite-400 ${isSelected && 'bg-secondary-neon'}`}>
        <Text>{isSelected ? 'Selecionado' : 'Selecionar'}</Text>
      </Button>
    </View>
  );
}
