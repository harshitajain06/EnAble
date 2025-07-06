import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { signOut, deleteUser } from 'firebase/auth';
import React from 'react';
import { Alert } from 'react-native';
import { auth } from '../../config/firebase';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import CarePage from './Care';
import HomePage from './Home';
import HousingPage from './Housing';
import RegisterScreen from './Register';
import TransportPage from './Transport';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import AboutPage from './About';
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
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Housing" component={HousingPage} />
      <Tab.Screen name="Transport" component={TransportPage} />
      <Tab.Screen name="Care" component={CarePage} />
      <Tab.Screen name="About" component={AboutPage} />
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

  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const user = auth.currentUser;
            if (user) {
              deleteUser(user)
                .then(() => {
                  Alert.alert('Account Deleted', 'Your account has been deleted.');
                  navigation.replace('Login');
                })
                .catch((err) => {
                  console.error('Delete Error:', err);
                  if (err.code === 'auth/requires-recent-login') {
                    Alert.alert(
                      'Re-authentication required',
                      'Please log in again to delete your account.'
                    );
                    handleLogout(); // Sign them out for fresh login
                  } else {
                    Alert.alert('Error', 'Failed to delete account.');
                  }
                });
            }
          },
        },
      ]
    );
  };

  return (
    <Drawer.Navigator initialRouteName="MainTabs">
      <Drawer.Screen name="MainTabs" component={BottomTabs} options={{ title: 'Home' }} />

      <Drawer.Screen
        name="Logout"
        component={BottomTabs}
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

      <Drawer.Screen
        name="DeleteAccount"
        component={BottomTabs}
        options={{
          title: 'Delete Account',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trash-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            handleDeleteAccount();
          },
        }}
      />
      <Drawer.Screen
  name="PrivacyPolicy"
  component={PrivacyPolicyPage}
  options={{
    title: 'Privacy Policy',
    drawerIcon: ({ color, size }) => (
      <Ionicons name="document-text-outline" size={size} color={color} />
    ),
  }}
/>

    </Drawer.Navigator>
  );
};

export default function StackLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}
