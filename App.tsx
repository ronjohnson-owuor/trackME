// App.js or your main component

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Fontawesome from '@expo/vector-icons/FontAwesome';
import Home from './screens/Home';
import Start from './screens/Start';
import Maps from './screens/Maps';

// Import screens

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="map" component={Maps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


