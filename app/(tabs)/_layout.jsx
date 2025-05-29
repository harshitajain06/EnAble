import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../config/firebase';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import CarePage from './Care';
import HomePage from './Home';
import HousingPage from './Housing';
import RegisterScreen from './Register';
import TransportPage from './Transport';
import Login from './index';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabs = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Transport') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Care') {
            iconName = focused ? 'medkit' : 'medkit-outline';
          } else if (route.name === 'Housing') {
            iconName = focused ? 'business' : 'business-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Transport" component={TransportPage} />
      <Tab.Screen name="Care" component={CarePage} />
      <Tab.Screen name="Housing" component={HousingPage} />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((err) => {
        console.error('Logout Error:', err);
        Alert.alert('Error', 'Failed to logout. Please try again.');
      });
  };

  return (
    <Drawer.Navigator initialRouteName="MainTabs">
      <Drawer.Screen name="MainTabs" component={BottomTabs} options={{ title: 'Home' }} />
      <Drawer.Screen
        name="Logout"
        component={BottomTabs} // Not navigating to any screen
        options={{
          title: 'Logout',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default function StackLayout() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Authentication Screens */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Main App with Drawer Navigator */}
      <Stack.Screen name="Drawer" component={DrawerNavigator} />

      {/* Game Level Screens */}
    </Stack.Navigator>
  );
}
