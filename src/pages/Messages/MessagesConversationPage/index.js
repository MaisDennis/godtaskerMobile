import React, { useState, useRef, useEffect } from 'react'
import { KeyboardAvoidingView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
// import Icon from 'react-native-vector-icons/Feather'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import insert from '~/assets/insert_photo-24px.svg';
// -----------------------------------------------------------------------------
import {
  AlignView,
  BodyView,
  Container, ConversationView,
  FooterView, FooterContainer, ForwardText, ForwardOnTopView,
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
import { updateMessagesRequest, updateForwardMessage } from '~/store/modules/message/actions';

export default function MessagesConversationPage({ navigation, route }) {
  // const user_id = useSelector(state => state.user.profile.id);
  const [messages, setMessages] = useState(route.params.messages);
  const [replyValue, setReplyValue] = useState();
  const [replySender, setReplySender] = useState();

  const [value, setValue] = useState();
  const [messageDropMenu, setMessageDropMenu] = useState();
  const [toggleDropMenu, setToggleDropMenu] = useState(false);
  const [chatMessage, setChatMessage] = useState();
  const [workerData, setWorkerData] = useState();
  // const sendInputRef = useRef();
  const id = route.params.id;
  const messageId = route.params.message_id;
  const task = route.params
  const worker_phonenumber = route.params.worker_phonenumber
  // const userName = route.params.user
  const dispatch = useDispatch();
  // console.tron.log(messages)
  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  useEffect(() => {
    // console.tron.log(route.params)
    getPhoto(worker_phonenumber)
    setMessages(route.params.messages)
    // console.log(taskMessages)
  }, [task]);

  async function getPhoto(phonenumber) {
    const worker = await api.get('workers/individual', {
      params: {phonenumber: phonenumber},
    })
    setWorkerData(worker.data)
    // console.tron.log(worker.data)
  }

  async function handleSend() {
    let newMessage = null
    let formattedTimeStamp = formattedMessageDate(new Date())
    const message_id = Math.floor(Math.random() * 1000000)
    // const id = route.params.id

    // if(task.messages == null) {
    //   pushMessage = []
    // } else {
    //   pushMessage = task.messages
    // }

    if (replyValue) {
      newMessage = {
        "id": message_id,
        "message": value,
        "sender": "worker",
        "user_read": false,
        "worker_read": false,
        "timestamp": formattedTimeStamp,
        "reply_message": replyValue,
        "reply_sender": replySender,
        "forward_message": false,
        "visible": true,
      }
    } else {
      newMessage = {
        "id": message_id,
        "message": value,
        "sender": "worker",
        "user_read": false,
        "worker_read": false,
        "timestamp": formattedTimeStamp,
        "reply_message": '',
        "reply_sender": '',
        "forward_message": false,
        "visible": true,
      }
    }
    // console.tron.log(pushMessage)
    await api.put(`messages/${messageId}`, {
      messages: newMessage,
    });
    setChatMessage();
    setValue();
    setReplyValue();
    dispatch(updateMessagesRequest(new Date()))
  }

  function handleMessageDropMenu(position) {
    setMessageDropMenu(position)
    setToggleDropMenu(!toggleDropMenu)
    // console.tron.log(position)
    // console.tron.log(messageDropMenu)
    // console.tron.log(toggleDropMenu)
  }

  function handleMessageReply(message, sender) {
    setReplyValue(message)
    setReplySender(sender)
    setToggleDropMenu(false)
  }

  function handleMessageForward(message) {
    setToggleDropMenu(false)
    dispatch(updateForwardMessage(message))
    navigation.goBack()
  }

  async function handleMessageDelete(position) {
    const editedTaskMessages = task.messages;
    editedTaskMessages[position].removed_message = editedTaskMessages[position].message;
    editedTaskMessages[position].message = 'mensagem removida'
    await api.put(`tasks/${task.id}`, {
      messages:  editedTaskMessages
    });
    setToggleDropMenu(false)
  }
  // ---------------------------------------------------------------------------
  const renderItem = ({ item, index }) => (
    <AlignView key={item.id} sender={item.sender}>
      <LineView>
        <MessageContainer>
          <MessageWrapper>
            { item.sender === 'worker' && (
              <MessageTime>{item.timestamp}</MessageTime>
            )}
            <MessageView sender={item.sender}>
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
              { item.forward_message && !item.removed_message
                ? (
                  <ForwardOnTopView>
                    <MessageIcon name='corner-down-right'/>
                    <ForwardText>Mens. encaminhada</ForwardText>
                  </ForwardOnTopView>
                )
                : (
                  null
                )

              }
              <MessageBottomView>
                <MessageText removedMessage={item.removed_message}>{item.message}</MessageText>
                <TouchableOpacity
                  onPress={() => handleMessageDropMenu(index)}
                >
                  <MessageIcon name='chevron-down'/>
                </TouchableOpacity>
              </MessageBottomView>
            </MessageView>
            { item.sender === 'user' && (
              <MessageTime>{item.timestamp}</MessageTime>
            )}
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
            {/* <ImageView> */}
              { workerData === undefined || workerData.avatar === null
                ? (
                  <>
                    {/* <Image
                      source={require('~/assets/insert_photo-24px.svg')}
                    /> */}
                    <SenderText>n/a</SenderText>
                  </>
                )
                : (
                  <Image
                    source={{ uri: workerData.avatar.url }}
                  />
                )
              }
            {/* </ImageView> */}
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
                  placeholder="Escrever a sua mensagem"
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
