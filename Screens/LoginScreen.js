import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Input, Button } from '@rneui/themed'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged(authenticatedUser => {
      if (authenticatedUser) {
        navigation.replace('Home') // this way we do not push onto the stack
      }
    }, [])
  })
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        navigation.replace('Home') // this way we do not push onto the push
      }).catch(error => {
        alert(error.message)
      })
  }
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar />
      <Input
        placeholder='Email'
        autoFocus type="Email"
        value={email}
        onChangeText={text => setEmail(text)} />
      <Input
        placeholder='Password'
        secureTextEntry type="Password"
        value={password}
        onChangeText={text => setPassword(text)} />
      <Button title="Login" onPress={login} />
      <View style={{ height: 10 }} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {

  }
});

export default LoginScreen