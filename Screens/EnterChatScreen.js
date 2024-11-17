import { StyleSheet, Keyboard } from 'react-native'
import React, { useLayoutEffect, useState, useCallback } from 'react'
import { database, auth } from '../firebase'
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { GiftedChat } from 'react-native-gifted-chat'

const EnterChatScreen = ({ navigation, route }) => { // the chatName and id is stored inside route.params passed from ChatScreen through navigation
  const [messages, setMessages] = useState([])

  const sendMessage = useCallback((messages = []) => {
    Keyboard.dismiss()
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const { _id, createdAt, text, user } = messages[0]
    addDoc(collection(database, 'chats', route.params.id, "messages"), {
      _id,
      createdAt,
      text,
      user
    })
  }, [])


  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.chatName,
      headerBackTitle: 'Messages'
    })

    const messageCollection = collection(database, 'chats', route.params.id, 'messages')
    const queryResult = query(messageCollection, orderBy('createdAt', 'desc'))
    onSnapshot(queryResult, (snapshot) => {
      const messagesData = snapshot.docs.map(messages => {
        return {
          _id: messages.data()._id,
          createdAt: messages.data().createdAt.toDate(),
          text: messages.data().text,
          user: messages.data().user
        }
      })
      setMessages(messagesData)
    })
  }, [navigation])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => sendMessage(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
export default EnterChatScreen