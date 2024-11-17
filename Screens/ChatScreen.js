import { StyleSheet, ScrollView, SafeAreaView, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomList from '../components/CustomList'
import Ionicons from '@expo/vector-icons/Ionicons'
import { database, auth } from '../firebase'
import { collection, onSnapshot, doc } from 'firebase/firestore'

const ChatScreen = ({ navigation }) => {
  const [chats, setChats] = useState([])

  useEffect(() => {
    onSnapshot(doc(database, "users", auth.currentUser.email), (doc) => {
      let userChatData = doc.data()
      onSnapshot(collection(database, "chats"), (snapshot) => {
        let chatData = []
        snapshot.docs.forEach(chat => {
          if (userChatData['chats'].includes(chat.id)) {
            chatData.unshift({ id: chat.id, data: chat.data() })
          }
        })
        setChats(chatData)
      })
    })
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
            <Ionicons
              name="chatbubbles-outline"
              size={25}
            />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const enterChat = (id, chatName) => {
    navigation.navigate('EnterChat', {
      id: id, chatName: chatName // adding parameters to pass into the EnterChat screen
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomList key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
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
export default ChatScreen