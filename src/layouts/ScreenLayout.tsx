import {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';

type Props = PropsWithChildren;

export default function ScreenLayout({children}: Props) {
  return <SafeAreaView className="flex-1 px-4">{children}</SafeAreaView>;
}
