import React, { useState, useRef } from 'react'
import { View, Text, KeyboardAvoidingView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
// import Icon from 'react-native-vector-icons/Feather'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// -----------------------------------------------------------------------------
import {
  AlignView,
  BodyView,
  Container, ConversationView,
  FooterView, FooterContainer,
  Header, HrLine,
  ImageView, Image,
  LineView,
  MessageView, MessageText, MessageContainer,
  MessageWrapper, MessageListView, MessageListItemView,
  MessageListItemText,  MessageTime, MessageIcon, MessageBottomView,
  // ParsedKeyboardAvoidingView,
  ReplyOnTopView, ReplyNameText, ReplyOnTopText,
  SendInput, SendButton, SendButtonAlignView,
  SendIcon,
  SenderView, SenderText, SenderAboutText,
  TemporaryMessageContainer, TemporaryMessageView, TemporaryMessageText,
  TemporaryMessageIcon, TemporaryMessageIconView,
} from './styles'
import api from '~/services/api';
import { updateMessagesRequest } from '~/store/modules/message/actions';

export default function MessagesConversationPage({ route }) {
  // const user_id = useSelector(state => state.user.profile.id);
  const [messages, setMessages] = useState(route.params.messages);
  const [replyValue, setReplyValue] = useState();
  const [replySender, setReplySender] = useState();
  const [value, setValue] = useState();
  const [messageDropMenu, setMessageDropMenu] = useState();
  const [toggleDropMenu, setToggleDropMenu] = useState(false);
  const [chatMessage, setChatMessage] = useState();

  const sendInputRef = useRef();
  const id = route.params.id;
  const task = route.params
  // const userName = route.params.user
  const dispatch = useDispatch();

  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  async function handleSend() {
    let pushMessage
    let formattedTimeStamp = formattedMessageDate(new Date())
    const message_id = Math.floor(Math.random() * 1000000)
    // const id = route.params.id

    if(task.messages == null) {
      pushMessage = []
    } else {
      pushMessage = task.messages
    }

    if (replyValue) {
      pushMessage.push({
        "id": `worker${message_id}`,
        "message": value,
        "sender": "worker",
        "user_read": false,
        "worker_read": false,
        "timestamp": formattedTimeStamp,
        "reply_message": replyValue,
        "reply_sender": replySender,
        "forward_message": false,
        "visible": true,
      })
    } else {
      pushMessage.push({
        "id": `worker${message_id}`,
        "message": value,
        "sender": "worker",
        "user_read": false,
        "worker_read": false,
        "timestamp": formattedTimeStamp,
        "reply_message": '',
        "reply_sender": '',
        "forward_message": false,
        "visible": true,
      })
    }
    // console.tron.log(pushMessage)
    await api.put(`tasks/messages/${id}`,
      pushMessage
    );
    setChatMessage();
    setValue();
    // sendInputRef.current.clear();
    dispatch(updateMessagesRequest(new Date()))
  }

  function handleMessageDropMenu(position) {
    setMessageDropMenu(position)
    setToggleDropMenu(!toggleDropMenu)
    console.tron.log(position)
    // console.tron.log(messageDropMenu)
    // console.tron.log(toggleDropMenu)
  }

  function handleMessageReply(message, sender) {
    setReplyValue(message)
    setReplySender(sender)
    setToggleDropMenu(false)
  }

  function handleMessageForward(message) {
    setForwardValue(message)
    setToggleDropMenu(false)
  }

  async function handleMessageDelete(position) {
    const editedTaskMessages = task.messages;
    editedTaskMessages[position].removed_message = editedTaskMessages[position].message;
    editedTaskMessages[position].message = 'mensagem removida'
    await api.put(`tasks/${task.id}`, {
      messages:  editedTaskMessages
    });
    setTask(task)
    setToggleDropMenu(false)
  }

  const renderItem = ({ item, index }) => (
    <AlignView key={item.id} sender={item.sender}>
      <LineView>
        { item.sender === 'user'
          ? (
            <>
              <MessageView>
                <MessageText>{item.message}</MessageText>
                <TouchableOpacity onPress={handleMessageDropMenu}>
                  <MessageIcon name='chevron-down'/>
                </TouchableOpacity>
              </MessageView>
              <MessageTime>{item.timestamp}</MessageTime>
            </>
          )
          : (
            <MessageContainer>
            <MessageWrapper>
              <MessageTime>{item.timestamp}</MessageTime>

              <MessageView>
              { item.reply_message && !item.removed_message
                ? (
                  <ReplyOnTopView>
                    { item.reply_sender === 'worker'
                      ? (
                        <ReplyNameText>{task.worker_name}</ReplyNameText>
                      )
                      : (
                        <ReplyNameText>{task.user_name}</ReplyNameText>
                      )
                    }
                    <ReplyOnTopText>{item.reply_message}</ReplyOnTopText>
                  </ReplyOnTopView>
                )
                : null
              }
                <MessageBottomView>
                  <MessageText>{item.message}</MessageText>
                  <TouchableOpacity
                    onPress={() => handleMessageDropMenu(index)}
                  >
                    <MessageIcon name='chevron-down'/>
                  </TouchableOpacity>
                </MessageBottomView>
              </MessageView>
            </MessageWrapper>
              { (messageDropMenu === index) && (toggleDropMenu === true) && (
                <MessageListView>
                  <TouchableOpacity
                    onPress={() => handleMessageReply(item.message, item.sender)}
                  >
                    <MessageListItemView>
                      <MessageListItemText>Responder</MessageListItemText>
                    </MessageListItemView>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleMessageForward(item.message)}
                  >
                    <MessageListItemView>
                      <MessageListItemText>Encaminhar</MessageListItemText>
                    </MessageListItemView>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleMessageDelete(index)}
                  >
                    <MessageListItemView>
                      <MessageListItemText>Deletar</MessageListItemText>
                    </MessageListItemView>
                  </TouchableOpacity>
                </MessageListView>
              )}
            </MessageContainer>
          )
        }
      </LineView>
      <HrLine/>
    </AlignView>
  );

  // ---------------------------------------------------------------------------
  return (
    <SafeAreaView>
      <Container>
        <Header >
          <BodyView>
            <ImageView>
              <Image/>
            </ImageView>
            <SenderView>
              <SenderText>{route.params.user_name}</SenderText>
              <SenderAboutText>Busy</SenderAboutText>
            </SenderView>
          </BodyView>
        </Header>
        <FooterContainer>
            { replyValue && (
              <TemporaryMessageContainer>
                <TemporaryMessageView>
                  <TemporaryMessageText>{replyValue}</TemporaryMessageText>
                </TemporaryMessageView>

                <TemporaryMessageIconView>
                  <TouchableOpacity onPress={() => setReplyValue()}>
                    <TemporaryMessageIcon name='x-circle'/>
                  </TouchableOpacity>
                </TemporaryMessageIconView>
              </TemporaryMessageContainer>
            )}
            <FooterView>
              <SendInput
                  keyboardType="default"
                  autoCorrect={false}
                  autoCapitalize="none"
                  multiline
                  enablesReturnKeyAutomatically
                  returnKeyType="send"
                  value={value}
                  onChangeText={setValue}
                  // ref={sendInputRef}
              />
              {/* keep "if else" below */}
              { value
                ? (
                  <TouchableOpacity onPress={handleSend}>
                    <SendButton>
                      <SendButtonAlignView>
                        <SendIcon name="send"/>
                      </SendButtonAlignView>
                    </SendButton>
                  </TouchableOpacity>
                )
                : (
                  <>
                  </>
                )
              }
            </FooterView>
          </FooterContainer>

        <ConversationView>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
            // initialScrollIndex={messages.length-1}
          />
        </ConversationView>
        {/* <ParsedKeyboardAvoidingView
          // keyboardVerticalOffset={10}
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          // behavior="height"
          behavior="position"
          // behavior='padding'
        > */}
        {/* </ParsedKeyboardAvoidingView> */}
      </Container>
    </SafeAreaView>
  )
}
