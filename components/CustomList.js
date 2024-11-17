import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from '@rneui/themed'
import { collection, onSnapshot, query, orderBy, } from 'firebase/firestore'
import { database, auth } from '../firebase'

function CustomList({ id, chatName, enterChat }) {
  const [recentMessage, setRecentMessage] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => { // added database query to show the last message as the subtitle
    const messageCollection = collection(database, 'chats', id, 'messages')
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
      let sent_message_user = " "
      //setRecentMessage(messagesData[0].text)
      if(messagesData && messagesData.length > 0 && messagesData[0]?.user) { 
        if (auth.currentUser.email == messagesData[0].user._id) {
          sent_message_user = "You: "
        } else {
          //setUser(messagesData[0].user._id)
          sent_message_user = messagesData[0].user._id + ": "
        }
        sent_message_user = sent_message_user + messagesData[0].text
        setRecentMessage(sent_message_user)
      } else { 
        // setting it to empty string
        setRecentMessage(sent_message_user)
      }
    })
  }, [])


  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        containerStyle={{ backgroundColor: "black" }}
        title={chatName.charAt(0)}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "600" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={2}>
          {recentMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomList