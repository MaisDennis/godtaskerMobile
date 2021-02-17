import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// -----------------------------------------------------------------------------
import {
  Container, LeftDoubleView, LeftView, ImageView,
  AlignView, Image, BodyView, MainView, TitleView,
  TitleText, SenderText, LastMessageView, LastMessageText, RightView,
  LastMessageTimeView, LastMessageTimeText,
  // UnreadMessageCountView,
  MessageIcon, UnreadMessageCountText,
  // HrLine,
} from './styles'
import { updateForwardMessage, updateMessagesRequest } from '~/store/modules/message/actions';
import api from '~/services/api';

export default function Messages({ data, navigation }) {
  const worker_id = useSelector(state => state.worker.profile.id);
  const forwardValue = useSelector(state => state.message.forward_message.message);
  const dispatch = useDispatch();

  const [resetConversation, setResetConversation] = useState();
  const [message, setMessage] = useState();
  const [lastMessage, setLastMessage] = useState();
  const [lastMessageTime, setLastMessageTime] = useState();

  const senderUserName = data.user.user_name;
  const senderWorkerName = data.worker.worker_name;
  const workerData = data.worker
  const userData = data.user
  // const messageArrayLength = data.messages.length;
  // const lastMessage = data.messages[messageArrayLength-1] ? data.messages[messageArrayLength-1].message : "";
  // const lastMessageTime = data.messages[messageArrayLength-1] ? (data.messages[messageArrayLength-1].timestamp).slice(-20, ) : "";
  let editedMessages = data.messages;

  useEffect(() => {
    getMessages()
    // console.tron.log(userData)
  }, [updateMessagesRequest])

  const messageId = data.message_id;

  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });



  async function getMessages() {
    const messageResponse = await api.get(`messages/${messageId}`)
    setMessage(messageResponse.data)

    const messagesLength = messageResponse.data.messages.length
    // console.tron.log(messagesLength)

    const last_message = messageResponse.data.messages[0]
      ? messageResponse.data.messages[messagesLength-1].message
      : null
    setLastMessage(last_message)

    const last_message_time = messageResponse.data.messages[0]
    ? messageResponse.data.messages[messagesLength-1].timestamp
    : null
    setLastMessageTime(last_message_time)
  }

  function handleMessageConversation() {
    const message_id = Math.floor(Math.random() * 1000000)

    if (forwardValue) {
      editedMessages.push({
        "id": message_id,
        "message": forwardValue,
        "sender": `${worker_id === data.worker_id ? 'worker' : 'user'}`,
        "user_read": `${worker_id === data.worker_id ? false : true }`,
        "worker_read": `${worker_id === data.worker_id ? true : false }`,
        "timestamp": formattedMessageDate(new Date()),
        "forward_message": true,
      })
      dispatch(updateForwardMessage(null));
    }

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
      user_name: message.user_name,
      message_id: data.message_id,
      messages: message.messages,
      worker_name: message.worker_name,
      worker_phonenumber: data.workerphonenumber,
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
    }
    catch(error) { return }
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
                  { userData === undefined || userData.avatar === null
                    ? (
                      <Image/>
                      // <SenderText>Hi</SenderText>
                    )
                    : (
                      <Image source={{ uri: userData.avatar.url }}/>
                    )
                  }
                </AlignView>
              </LeftDoubleView>
            )
            : (
              <LeftView>
                <AlignView>
                  { workerData === undefined || workerData.avatar === null
                    ? (
                      <Image/>
                      // <SenderText>Hello</SenderText>
                    )
                    : (
                      <Image source={{ uri: workerData.avatar.url }}/>
                    )
                  }
                </AlignView>
              </LeftView>
            )
          }
          <BodyView>
            <MainView>
              <TitleView>
                <TitleText colorProp={worker_id === data.worker_id}>{data.id}</TitleText>
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
                { lastMessage && (
                  <LastMessageText>{lastMessage}</LastMessageText>
                )}
              </LastMessageView>
            </MainView>
            <RightView>
              <AlignView>
                <LastMessageTimeView>
                  { lastMessageTime && (
                    <LastMessageTimeText>{lastMessageTime}</LastMessageTimeText>
                  )}

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
