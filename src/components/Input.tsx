import {Controller} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {Text, TextInput, TextInputProps, View} from 'react-native';

type Props = TextInputProps & {
  name: string;
  className?: string;
  label?: string;
  errors?: Record<string, any>;
};

export default function Input({
  name,
  className,
  label,
  errors,
  ...props
}: Props) {
  return (
    <View className="w-full flex flex-col gap-1">
      {label && <Text className="text-graphite-400">{label}</Text>}
      <TextInput
        id={name}
        className={`w-full h-14 border border-graphite-400 rounded placeholder:text-gray-400 text-graphite-500 px-2 py-[0.5rem] ${className}`}
        {...props}
      />
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          message={errors[name]?.message}
          render={({message}) => (
            <Text className="text-red-500 mr-auto text-xs font-semibold mt-[5px]">
              {message}
            </Text>
          )}
        />
      )}
    </View>
  );
}
