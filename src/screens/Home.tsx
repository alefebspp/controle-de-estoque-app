import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import EstablishmentsScreen from './Establishments';
import ProductsScreen from './Products';
import ProductScreen from './Product';
import {useUserContext} from '../contexts/userContext';

export type RootTabParamList = {
  Establishments: undefined;
  Products: undefined;
  Movements: undefined;
  Product: {id?: string} | undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function HomeScreen() {
  const {establishment} = useUserContext();
  return (
    <Tab.Navigator
      initialRouteName="Establishments"
      backBehavior="order"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#2e3242',
        tabBarShowLabel: false,
        tabBarStyle: {height: 56},
      }}>
      <Tab.Screen
        options={{
          tabBarButton: () => null,
        }}
        name="Product"
        component={ProductScreen}
      />
      {establishment && (
        <Tab.Screen
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="shoppingcart" size={30} color={color} />
            ),
          }}
          name="Products"
          component={ProductsScreen}
        />
      )}
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={30} color={color} />,
        }}
        name="Establishments"
        component={EstablishmentsScreen}
      />
      {/*       <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="linechart" size={30} color={color} />
          ),
        }}
        name="Movements"
        component={() => <View></View>}
      /> */}
    </Tab.Navigator>
  );
}
