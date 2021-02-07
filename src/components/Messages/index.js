import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native'
// import { getDay, parseISO } from 'date-fns'
import { Container, LeftDoubleView, LeftView, ImageView, AlignView, Image, BodyView, MainView, TitleView,
  TitleText, SenderText, LastMessageView, LastMessageText, RightView,
  LastMessageTimeView, LastMessageTimeText,
  UnreadMessageCountView, MessageIcon, UnreadMessageCountText, HrLine
} from './styles'
import api from '~/services/api';

export default function Messages({ data, navigation, resetTasks, setResetTasks }) {
  const user_id = useSelector(state => state.user.profile.id);
  const worker_id = useSelector(state => state.worker.profile.id);
  const [resetConversation, setResetConversation] = useState();

  const senderUserName = data.user.user_name;
  const senderWorkerName = data.worker.worker_name

  const messageArrayLength = data.messages.length;
  const lastMessage = data.messages[messageArrayLength-1] ? data.messages[messageArrayLength-1].message : "";
  const lastMessageTime = data.messages[messageArrayLength-1] ? (data.messages[messageArrayLength-1].timestamp).slice(-20, ) : "";

  let editedMessages = data.messages;

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
      messages: data.messages,
      resetTasks: resetTasks,
      setResetTasks: setResetTasks,
    });
    setResetConversation();
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
          { (worker_id === data.worker_id)
            ? (
              <LeftDoubleView>
                <AlignView>
                  <ImageView>
                    <Image/>
                  </ImageView>
                </AlignView>
              </LeftDoubleView>
            )
            : (
              <LeftView>
                <AlignView>
                  <ImageView>
                    <Image/>
                  </ImageView>
                </AlignView>
              </LeftView>
            )
          }

          <BodyView>
            <MainView>
              <TitleView>
                <TitleText colorProp={worker_id == data.worker_id}>{data.id}</TitleText>
                { (worker_id === data.worker_id)
                  ? (
                    <SenderText>{senderUserName}</SenderText>
                  )
                  : (
                    <SenderText>{senderWorkerName}</SenderText>
                  )
                }
              </TitleView>
              <LastMessageView>
                <LastMessageText>{lastMessage}</LastMessageText>
              </LastMessageView>
            </MainView>
            <RightView>
              <AlignView>
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
              </AlignView>
            </RightView>
            {/* <HrLine/> */}
          </BodyView>
        </Container>
      </TouchableOpacity>
    </>
  )
}
