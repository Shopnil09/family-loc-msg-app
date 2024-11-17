import { View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input, Button } from '@rneui/base'
import { database, auth } from '../firebase'
import { collection, addDoc, doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore'


const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState('')
  const [members, setMembers] = useState('')

  const createChat = async () => {
    try {
      // performing checks before executing logic
      if(auth.currentUser.email == members.toLowerCase()) { // user cannot add themselves in a chatroom
        alert('You cannot add yourself to a chatroom. Try inputting a family member name!')
        return
      }

      if(input == '' || members == '') {
        alert('Input required for member and chat name fields!')
        return
      }

      const userReference = doc(database, "users", auth.currentUser.email)
      let userData = await getDoc(userReference)
      let userDataFamilyMembers = userData.data().familyMembers
      
      if (userDataFamilyMembers.includes(members.toLowerCase())) {
        // add the members into the chats --> messages document along with chatName
        const chatDocumentInfo = await addDoc(collection(database, 'chats'), { chatName: input })
        let newChats = userData.data().chats
        // this is to add it to the beginning of the array so when chats are displayed in the ChatScreen, it is sorted
        newChats.unshift(chatDocumentInfo.id)
        await updateDoc(userReference, {
          chats: newChats
        })
        // find a way to make individual member a list of members to add multiple members
        const memberReference = doc(database, "users", members.toLowerCase())
        const memberData = await getDoc(memberReference)
        let memberChats = memberData.data().chats
        memberChats.unshift(chatDocumentInfo.id)
        await updateDoc(memberReference, {
          chats: memberChats
        })
        navigation.navigate('Chat')
      } else {
        alert('Family member does not exist in your list!')
        return
      }
    } catch (error) {
      alert(error)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a New Chat",
      headerBackTitle: "Chats"
    }, [navigation])
  })
  return (
    <View>
      <Input
        placeholder='Add Members'
        value={members}
        onChangeText={(text) => setMembers(text)}
      />
      <Input
        placeholder='Enter Chat Name'
        value={input}
        onChangeText={(text) => setInput(text)}
      />

      <Button
        onPress={createChat} title='Create New Chat'
      />
    </View>
  )
}

export default AddChatScreen