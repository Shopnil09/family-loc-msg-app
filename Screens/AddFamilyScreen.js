import { View } from 'react-native'
import { Input, Button } from '@rneui/base'
import React, { useLayoutEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { database, auth } from '../firebase'

const AddFamilyScreen = ({ navigation }) => {
  const [familyMember, setFamilyMember] = useState('')

  const searchFamily = async () => {
    try {
      const userReference = doc(database, "users", familyMember.toLowerCase())
      let userDocument = await getDoc(userReference)
      let userData = userDocument.data()
      if (!userData) {
        alert(familyMember + " does not exist")
      } else {
        await addFamily(userData, userReference)
      }
    } catch (error) {
      alert(error)
    }
  }

  const addFamily = async (familyMemberToBeAdded, familyMemberReference) => {
    const currentUserReference = doc(database, "users", auth.currentUser.email)
    const currentUserDocument = await getDoc(currentUserReference)
    let currentUserFamily = currentUserDocument.data().familyMembers
    if (currentUserFamily.includes(familyMemberToBeAdded.email)) {
      alert("Family member already exists!")
    } else {
      currentUserFamily.push(familyMemberToBeAdded.email)
      await updateDoc(currentUserReference, {
        familyMembers: currentUserFamily
      })

      familyMemberToBeAdded.familyMembers.push(auth.currentUser.email)
      await updateDoc(familyMemberReference, {
        familyMembers: familyMemberToBeAdded.familyMembers
      })

      alert("Family member successfully added")
    }

  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Family",
      headerBackTitle: 'Profile'
    })
  })
  return (
    <View>
      <Input
        placeholder='Search Family Members'
        value={familyMember}
        onChangeText={(text) => setFamilyMember(text)}
      />
      <Button
        onPress={searchFamily} title="Search"
      />
    </View>
  )
}

export default AddFamilyScreen