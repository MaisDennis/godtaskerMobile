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
  const updatedMessage = useSelector(state => state.message.profile)
  const dispatch = useDispatch();
  const userIsWorker = worker_id === data.worker_id;

  const [resetConversation, setResetConversation] = useState();
  const [message, setMessage] = useState();
  const [messageBell, setMessageBell] = useState();
  const [lastMessage, setLastMessage] = useState();
  const [lastMessageTime, setLastMessageTime] = useState();

  const senderUserName = data.user.user_name;
  const senderWorkerName = data.worker.worker_name;
  const workerData = data.worker
  const userData = data.user
  // const messageArrayLength = data.messages.length;
  // const lastMessage = data.messages[messageArrayLength-1] ? data.messages[messageArrayLength-1].message : "";
  // const lastMessageTime = data.messages[messageArrayLength-1] ? (data.messages[messageArrayLength-1].timestamp).slice(-20, ) : "";


  useEffect(() => {
    getMessages()
  }, [updatedMessage])
  // console.tron.log(message)
  const messageId = data.message_id;

  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });



  async function getMessages() {
    const messageResponse = await api.get(`messages/${messageId}`)
    setMessage(messageResponse.data)
    setMessageBell(messageResponse.data.messages)

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



  async function handleMessageConversation() {

    let editedMessages = messageBell;

    if (forwardValue) {
      const message_id = Math.floor(Math.random() * 1000000)
      editedMessages.push({
        "id": message_id,
        "message": forwardValue,
        "sender": `${userIsWorker ? 'worker' : 'user'}`,
        "user_read": `${userIsWorker ? false : true }`,
        "worker_read": `${userIsWorker ? true : false }`,
        "timestamp": formattedMessageDate(new Date()),
        "forward_message": true,
      })
      dispatch(updateForwardMessage(null));
    }

    if (userIsWorker) {
      editedMessages.map((m) => {
        if(m.worker_read === false) {
          m.worker_read = true;
        }
        return m
      })
    } else {
      editedMessages.map((m) => {
        if(m.user_read === false) {
          m.user_read = true;
        }
        return m
      })
    }
    // console.tron.log(editedMessages)


    await api.put(`messages/update/${data.message_id}`, {
      messages: editedMessages,
    })
    dispatch(updateMessagesRequest(new Date()))

    navigation.navigate('MessagesConversationPage', {
      id: data.id,
      user_name: message.user_name,
      worker_id: message.worker_id,
      worker_name: message.worker_name,
      worker_phonenumber: data.workerphonenumber,
      message_id: data.message_id,
      messages: messageBell,
      avatar: workerData.avatar,

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

  const hasUnreadUser = (array) => {
    try {
      let sum = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i].user_read === false) {
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
          { (userIsWorker)
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
                <TitleText colorProp={worker_id === data.worker_id}>{data.name}</TitleText>
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
                {/* UnreadMessageCountView */}
                {(userIsWorker)
                  ? ((hasUnread(messageBell) === 0)
                    ? (
                      null
                    )
                    : (
                      <MessageIcon name="message-circle">
                        <UnreadMessageCountText>{hasUnread(messageBell)}</UnreadMessageCountText>
                      </MessageIcon>
                    )
                  )
                  : ((hasUnreadUser(messageBell) === 0)
                    ? (
                      null
                    )
                    : (
                      <MessageIcon name="message-circle">
                        <UnreadMessageCountText>{hasUnreadUser(messageBell)}</UnreadMessageCountText>
                      </MessageIcon>
                    )
                  )
                }
              </AlignView>
            </RightView>
            {/* <HrLine/> */}
          </BodyView>
        </Container>
      </TouchableOpacity>
    </>
  )
}
