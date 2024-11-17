import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { database, auth } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'

const FamilyMembersScreen = ({ navigation }) => {
  const [familyMembers, setFamilyMembers] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Family Members",
      headerBackTitle: "Profile"
    })
  })

  useEffect(() => {
    getFamilyMembers()
  })

  const getFamilyMembers = async () => {
    try {
      const userReference = doc(database, "users", auth.currentUser.email)
      const userDocument = await getDoc(userReference)
      const userFamilyMembers = userDocument.data().familyMembers
      setFamilyMembers(userFamilyMembers)
    } catch (error) {
      alert(error)
    }
  }

  // make a helper function to get the display from all the email addresses which getFamilyMembers can call
  return (
    <View style={styles.container}>
      <FlatList
        data={familyMembers}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    paddingTop: 0,
    padding: 10,
    fontSize: 18,
    height: 44,
    marginTop: 5
  },
});
export default FamilyMembersScreen