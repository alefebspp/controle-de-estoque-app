import {Text, TextInput, TextInputProps, View} from 'react-native';

type Props = TextInputProps & {
  className?: string;
  label?: string;
};

export default function Input({className, label, ...props}: Props) {
  return (
    <View className="w-full flex flex-col gap-1">
      {label && <Text className="text-graphite-400">{label}</Text>}
      <TextInput
        className={`w-full h-14 border border-graphite-400 rounded placeholder:text-gray-400 text-graphite-500 px-2 py-[0.5rem] ${className}`}
        {...props}
      />
    </View>
  );
}
