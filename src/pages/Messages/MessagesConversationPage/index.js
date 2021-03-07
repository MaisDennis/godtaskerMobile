import React, { useState, useRef, useEffect } from 'react'
import { KeyboardAvoidingView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import firestore from '@react-native-firebase/firestore';
// -----------------------------------------------------------------------------
import {
  AlignView,
  BodyView,
  Container, ConversationView,
  FooterView, FooterContainer, ForwardText, ForwardOnTopView,
  Header, HrLine,
  // ImageView,
  Image,
  LineView,
  MessageView, MessageText, MessageContainer,
  MessageWrapper, MessageListView, MessageListItemView,
  MessageListItemText, MessageListButton, MessageTime, MessageIcon,
  MessageBottomView,
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
import insert from '~/assets/insert_photo-24px.svg';
// import messaging from '@react-native-firebase/messaging';


export default function MessagesConversationPage({ navigation, route }) {
  const messageUserId = useSelector(state => state.user.profile.id);
  const messageWorkerId = route.params.worker_id;
  const avatar = route.params.avatar;
  const userIsWorker = messageUserId === messageWorkerId;

  const dispatch = useDispatch();

  // const [messages, setMessages] = useState(route.params.messages);
  // const [defaultMessages, setDefaultMessages] = useState(route.params.messages);
  const [messages, setMessages] = useState([]);
  const [defaultMessages, setDefaultMessages] = useState();

  const [replyValue, setReplyValue] = useState();
  const [replySender, setReplySender] = useState();
  const [value, setValue] = useState();
  const [messageDropMenu, setMessageDropMenu] = useState();
  const [toggleDropMenu, setToggleDropMenu] = useState(false);
  const [workerData, setWorkerData] = useState();
  const [load, setLoad] = useState();
  const lastMessageRef = useRef()

  const messageId = route.params.message_id;
  const task = route.params;
  const worker_phonenumber = route.params.worker_phonenumber



  const messagesRef = firestore()
  .collection(`messagesTask${task.id}`)
  // .doc(`messages for task ${task.id}`)
  // .collection('messages');

  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  useEffect(() => {
    getPhoto(worker_phonenumber)
    // setMessages(route.params.messages)
    getMessages()
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
  }, [task]);

  async function getMessages() {
    const response = await api.get(`messages/${task.message_id}`)
    // setMessages(response.data.messages)
    // setDefaultMessages(response.data.messages)

    const unsubscribe = firestore()
      .collection(`messagesTask${task.id}`)
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(d => ({
          ...d.data(),
        }));
        // console.tron.log(data)
        setMessages(data)
        setDefaultMessages(data)
        // lastMessageRef.current.scrollToEnd({ animated: false })
      })
      return unsubscribe;
  }

  async function getPhoto(phonenumber) {
    const worker = await api.get('workers/individual', {
      params: {phonenumber: phonenumber},
    })
    setWorkerData(worker.data)
  }

  async function handleSend() {
    setLoad(true)
    let newMessage = null
    let formattedTimeStamp = formattedMessageDate(new Date())
    // const message_id = Math.floor(Math.random() * 1000000)
    const message_id = messages.length
    if (replyValue) {
      newMessage = {
        id: message_id,
        message: value,
        sender: `${userIsWorker ? "worker" : "user"}`,
        user_read: `${userIsWorker ? false : true}`,
        worker_read: false,
        timestamp: formattedTimeStamp,
        reply_message: replyValue,
        reply_sender: replySender,
        forward_message: false,
        visible: true,
        createdAt: firestore.FieldValue.serverTimestamp(),
      }
    } else {
      newMessage = {
        id: message_id,
        message: value,
        sender: `${userIsWorker ? "worker" : "user"}`,
        user_read: `${userIsWorker ? false : true}`,
        worker_read: false,
        timestamp: formattedTimeStamp,
        reply_message: '',
        reply_sender: '',
        forward_message: false,
        visible: true,
        createdAt: firestore.FieldValue.serverTimestamp(),
      }
    }
    const response = await api.put(`messages/${messageId}`, {
      messages: newMessage,
    });

    // Firebase Messaging ******************************************************
    await messagesRef
    .doc(`${message_id}`).set(newMessage)
    .then(() => {
      console.tron.log(`task ${task.id}`);
    })
    .catch((error) => {
      console.tron.log("Error writing document: ", error);
    });

    await api.put(`tasks/${task.id}`, {
      messaged_at: new Date(),
    })

    // setMessages(response.data.messages)
    // setMessages(messagesRef)
    setValue();
    setReplyValue();
    dispatch(updateMessagesRequest(new Date()))
    // lastMessageRef.current.scrollToEnd()
    setLoad(false)
  }

  function handleMessageDropMenu(position) {
    setMessageDropMenu(position)
    setToggleDropMenu(!toggleDropMenu)
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
    <AlignView key={item.id} sender={item.sender} userIsWorker={userIsWorker}>
      <LineView>
        <MessageContainer sender={item.sender}>
          { userIsWorker
            ? (
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
            )
            : (
              <MessageWrapper>
              { item.sender === 'user' && (
                <MessageTime>{item.timestamp}</MessageTime>
              )}
              <MessageView sender={item.sender}>
                { item.reply_message && !item.removed_message
                  ? (
                    <ReplyOnTopView>
                      { item.reply_sender === 'user'
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
              { item.sender === 'worker' && (
                <MessageTime>{item.timestamp}</MessageTime>
              )}
            </MessageWrapper>
            )
          }

          { (messageDropMenu === index) && (toggleDropMenu === true) && (
            <MessageListView>
              <MessageListButton
                onPress={() => handleMessageReply(item.message, item.sender)}
              >
                <MessageListItemView>
                  <MessageListItemText>Responder</MessageListItemText>
                </MessageListItemView>
              </MessageListButton>
              <MessageListButton
                onPress={() => handleMessageForward(item.message)}
              >
                <MessageListItemView>
                  <MessageListItemText>Encaminhar</MessageListItemText>
                </MessageListItemView>
              </MessageListButton>
              <MessageListButton
                onPress={() => handleMessageDelete(index)}
              >
                <MessageListItemView>
                  <MessageListItemText>Deletar</MessageListItemText>
                </MessageListItemView>
              </MessageListButton>
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
              { route.params === undefined || route.params.avatar === null
                ? (
                  <>
                    {/* <Image
                      source={require('~/assets/insert_photo-24px.svg')}
                    /> */}
                    <Image/>
                  </>
                )
                : (
                  <Image
                    source={{ uri: route.params.avatar.url }}
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
                  <TouchableOpacity onPress={handleSend} disabled={load}>
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
            ref={lastMessageRef}
            // initialScrollIndex={2}
            // getItemLayout={(data, index) => (
            //   {length: 50, offset: 50 * index, index, animation: false}
            // )}
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
