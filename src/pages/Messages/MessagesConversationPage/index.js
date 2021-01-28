import React, { useState, useRef } from 'react'
import { View, Text, KeyboardAvoidingView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
// import Icon from 'react-native-vector-icons/Feather'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// -----------------------------------------------------------------------------
import { Container, ConversationView, LineView, HrLine, AlignView,
  MessageView, MessageText,
  MessageTime, FooterView, SendInput, SendButton, SendButtonAlignView,
  SendIcon
} from './styles'
import api from '~/services/api';

export default function MessagesConversationPage({ navigation, route }) {
  const [messages, setMessages] = useState(route.params.messages);
  const [replyValue, setReplyValue] = useState();
  const [value, setValue] = useState();

  const sendInputRef = useRef();
  const id = route.params.id;
  const task = route.params
  // console.tron.log(route.params.id)

  const formattedMessageDate = fdate =>
  fdate == null
    ? ''
    : format(fdate, "dd'/'MMM'/'yyyy HH:mm", { locale: ptBR });

  async function handleSend() {
    console.tron.log('Hello')

    let pushMessage
    if(task.messages == null) {
      pushMessage = []
    } else {
      pushMessage = task.messages
    }

    let formattedTimeStamp = formattedMessageDate(new Date())
    // const id = route.params.id
    if (replyValue) {
      pushMessage.push({
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
    console.tron.log(pushMessage)
    await api.put(`tasks/messages/${id}`,
      pushMessage
    );
    // setChatMessage();
    setValue();
    sendInputRef.current.clear();
  }

  const renderItem = ({ item, index }) => (
    <AlignView key={index} sender={item.sender}>
      <LineView>
        { item.sender === 'user'
          ? (
            <>
              <MessageView>
                <MessageText>{item.message}</MessageText>
              </MessageView>
              <MessageTime>{item.timestamp}</MessageTime>
            </>
          )
          : (
            <>
              <MessageTime>{item.timestamp}</MessageTime>
              <MessageView>
                <MessageText>{item.message}</MessageText>
              </MessageView>
            </>
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
        <ConversationView>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            // initialScrollIndex={messages.length-1}
          />
        </ConversationView>
        <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={500}
          behavior="height"
        >
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
                ref={sendInputRef}
            />
            { value &&  (
              <TouchableOpacity onPress={handleSend}>
                <SendButton>
                  <SendButtonAlignView>
                    <SendIcon name="send"/>
                  </SendButtonAlignView>
                </SendButton>
              </TouchableOpacity>
            )}


        </FooterView>
        </KeyboardAvoidingView>
      </Container>
    </SafeAreaView>
  )
}
