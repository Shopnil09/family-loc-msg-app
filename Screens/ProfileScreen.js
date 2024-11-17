import { View, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const ProfileScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: auth.currentUser.displayName // this is to bottom tab name does not change 
    })
  })

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login')
      }).catch(error => {
        alert(error.message)
      })
  }

  return (
    <View>
      <Button
        title="Add Family Members"
        onPress={() => {
          navigation.navigate("AddFamily")
        }}
      />
      <Button
        title="Sign Out"
        onPress={signUserOut}
      />
    </View>
  )
}

export default ProfileScreen