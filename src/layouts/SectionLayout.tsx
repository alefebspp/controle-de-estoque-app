import {PropsWithChildren} from 'react';
import {Text, View} from 'react-native';
import ScreenLayout from './ScreenLayout';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = PropsWithChildren & {
  title: string;
  subtitle: string;
};

export default function SectionLayout({title, subtitle, children}: Props) {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-full h-full flex flex-col gap-4 py-4">
        <View className="w-full border-b border-gray-300 pb-6 px-6 pt-2">
          <View className="self-start border-b-4 border-secondary-light">
            <Text className="uppercase text-xl text-graphite-500 font-medium">
              {title}
            </Text>
          </View>
        </View>
        <ScreenLayout>
          <View className="w-full h-full flex flex-col gap-4">
            <Text className="text-gray-500 font-semibold text-lg">
              {subtitle}
            </Text>
            {children}
          </View>
        </ScreenLayout>
      </View>
    </SafeAreaView>
  );
}
