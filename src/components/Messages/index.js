import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { getDay, parseISO } from 'date-fns'
import { Container, ImageView, Image, BodyView, MainView, TitleView,
  TitleText, LastMessageView, LastMessageText, RightView,
  LastMessageTimeView, LastMessageTimeText, AlignView,
  UnreadMessageCountView, MessageIcon, UnreadMessageCountText, HrLine
} from './styles'
import api from '~/services/api';

export default function Messages({ data, navigation }) {
  const messageArrayLength = data.messages.length;
  const senderUserName = data.user.user_name;
  const lastMessage = data.messages[messageArrayLength-1].message
  const lastMessageTime = (data.messages[messageArrayLength-1].timestamp).slice(-4, )
  const [ whatever, setWhatever] = useState();
  // console.tron.log(data)
  let editedMessages = data.messages;
  useEffect(() => {

  }, [whatever])

  function handleMessageConversation() {

    editedMessages.map((m) => {
      if(m.worker_read === false) {
        m.worker_read = true;
      }
      return m
    })

    api.put(`tasks/${data.id}`, {
      messages: editedMessages,
    })

    navigation.navigate('MessagesConversationPage', {
      id: data.id,
      user_name: data.user.user_name,
      messages: data.messages
    });

setWhatever();
  }

  const hasUnread = (array) => {
    try {
      let sum = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i].worker_read === false) {
          sum += 1
        }
      }
      return sum
    } catch(error) {
      return
    }
  }
  // ---------------------------------------------------------------------------
  return (
    <>
      <TouchableOpacity onPress={handleMessageConversation}>
        <Container>
          <ImageView>
            <Image/>
          </ImageView>
          <BodyView>
            <MainView>
              <TitleView>
                <TitleText>{data.name}</TitleText>
                <TitleText>{senderUserName}</TitleText>
              </TitleView>
              <LastMessageView>
                <LastMessageText>{lastMessage}</LastMessageText>
              </LastMessageView>
            </MainView>
            <RightView>
              <LastMessageTimeView>
                <LastMessageTimeText>{lastMessageTime}</LastMessageTimeText>
              </LastMessageTimeView>
              {/* <UnreadMessageCountView> */}
              { (hasUnread(data.messages) === 0)
                ? (
                  null
                )
                : (
                  <MessageIcon name="message-circle">
                    <UnreadMessageCountText>{hasUnread(data.messages)}</UnreadMessageCountText>
                  </MessageIcon>
                )
              }
              {/* </UnreadMessageCountView> */}
            </RightView>
            {/* <HrLine/> */}
          </BodyView>
        </Container>
      </TouchableOpacity>
    </>
  )
}
