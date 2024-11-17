import { StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import FamilyMembersLocationScreen from './FamilyMembersLocationScreen';
import ChatScreen from './ChatScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProfileScreen from './ProfileScreen';

const HomeScreen = ({ navigation }) => {
  const Tab = createBottomTabNavigator()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })

  return (
    <SafeAreaProvider>
      <Tab.Navigator>
        <Tab.Screen
          name="Family Locations"
          component={FamilyMembersLocationScreen}
          options={{
            tabBarIcon: () => (
              <Ionicons
                name="map-outline"
                size="25"
              />
            )
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: () => (
              <Ionicons
                name="chatbox-outline"
                size="25"
              />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => (
              <Ionicons
                name="person-outline"
                size="25"
              />
            )
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HomeScreen