import { StyleSheet, KeyboardAvoidingView, } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Input, Button } from '@rneui/themed'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, database } from '../firebase'
import { setDoc, doc } from 'firebase/firestore'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authenticatedUser) => {
        let userDocumentName = auth.currentUser.email.toString()
        /*addDoc(collection(database, 'users', userDocumentName), {
          email: auth.currentUser.email,
          uuid: auth.currentUser.uid,
          name: name,
          familyMembers: [],
          chats: [],
          requestedFamilyMembers: []
        })*/
        setDoc(doc(database, "users", userDocumentName), {
          email: auth.currentUser.email,
          uuid: auth.currentUser.uid,
          name: name,
          familyMembers: [],
          chats: [],
          requestedFamilyMembers: []
        })
        updateProfile(authenticatedUser.user, {
          displayName: name
        })
        navigation.replace('Home')
      }).catch(error => {
        alert(error.message)
      })
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar />
      <Input
        placeholder='Full Name'
        autoFocus type="Text"
        value={name}
        onChangeText={text => setName(text)} />
      <Input
        placeholder='Email'
        type="Email"
        value={email}
        onChangeText={text => setEmail(text)} />
      <Input
        placeholder='Password'
        secureTextEntry type="Password"
        value={password}
        onChangeText={text => setPassword(text)} />
      <Button title="Register" onPress={register} />
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

export default RegisterScreen