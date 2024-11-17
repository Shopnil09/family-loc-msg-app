import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './Screens/RegisterScreen'
import LoginScreen from './Screens/LoginScreen'
import HomeScreen from './Screens/HomeScreen';
import AddChatScreen from './Screens/AddChatScreen';
import EnterChatScreen from './Screens/EnterChatScreen';
import AddFamilyScreen from './Screens/AddFamilyScreen';
import FamilyMembersScreen from './Screens/FamilyMembersScreen';
import MapScreen from './Screens/MapScreen';

export default function App() {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="EnterChat" component={EnterChatScreen} />
        <Stack.Screen name="AddFamily" component={AddFamilyScreen} />
        <Stack.Screen name="FamilyMembers" component={FamilyMembersScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
