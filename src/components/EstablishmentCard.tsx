import {Text, View} from 'react-native';
import Button from './Button';
import {textVariantStyles} from './Button';

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
    <View className="w-full rounded-xl flex flex-col gap-8 border border-slate-400 p-6">
      <View
        className={`self-start ${
          isSelected && 'border-b-4 border-secondary-light'
        }`}>
        <Text
          className={`text-slate-400 text-lg ${
            isSelected && '!text-graphite-500'
          }`}>
          {establishmentName}
        </Text>
      </View>

      <Button
        onPress={onPress}
        disabled={isSelected}
        className={`rounded-[30px] w-4/5 mx-auto ${
          !isSelected && 'bg-slate-400'
        } ${isSelected && 'bg-secondary-light'}`}>
        <Text className={`${textVariantStyles.default} uppercase text-sm`}>
          {isSelected ? 'Selecionado' : 'Selecionar'}
        </Text>
      </Button>
    </View>
  );
}
