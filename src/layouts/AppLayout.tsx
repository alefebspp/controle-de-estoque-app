import {PropsWithChildren} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

import ScreenLayout from './ScreenLayout';

import {useUserContext} from '../contexts/userContext';

type Props = PropsWithChildren & {
  title: string;
};

export default function AppLayout({title, children}: Props) {
  const {logout, establishment} = useUserContext();

  return (
    <SafeAreaView className="flex-1">
      <View className="w-full h-full flex flex-col gap-4 pb-4 pt-2">
        <View
          className={`flex flex-row justify-between w-full border-b border-gray-300 pb-2 px-6 ${
            !establishment && 'pb-4 pt-2'
          }`}>
          <View className="flex gap-2">
            <View className="self-start border-b-4 border-secondary-light">
              <Text className="uppercase text-xl text-graphite-500 font-medium">
                {title}
              </Text>
            </View>
            {establishment && (
              <Text className="text-xs uppercase text-gray-400">
                {establishment.name}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={async () => await logout()}
            className="flex flex-row items-center gap-2">
            <Icon name="logout" size={25} color="#000" />
            <Text className="text-xs uppercase text-gray-400">sair</Text>
          </TouchableOpacity>
        </View>
        <ScreenLayout>
          <View className="w-full h-full flex flex-col gap-4">{children}</View>
        </ScreenLayout>
      </View>
    </SafeAreaView>
  );
}
