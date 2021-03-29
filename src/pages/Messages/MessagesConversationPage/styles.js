// import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '~/components/Button';
import { ScrollView, FlatList, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';

export const AlignView = styled.View`
display: flex;
flex-direction: column;
align-items: ${ props => props.userIsWorker
  ? (
    (props.sender === 'user') ? 'flex-start' : 'flex-end'
  )
  : (
    (props.sender === 'user') ? 'flex-end' : 'flex-start'
  )
};
width: 100%;
/* background-color: #665544; */
`;

export const BodyView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
height: 72px;
padding: 12px;
/* background-color: #73c479; */
`;

export const Container = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  /* background: #F5F5; */
`;
export const ConversationView = styled.View`
display: flex;
flex-direction: column;
height: 80%;
width: 100%;
overflow: scroll;
margin-bottom: 40%;
/* background-color: #4433ee; */
`;

export const FooterView = styled.View`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
/* height: auto; */
width: 100%;
padding: 8px;
margin: 0;
background-color: #222;

`;
export const FooterContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: auto; */
  width: 100%;
  margin: 0;
  background-color: #f00;
`;
export const ForwardOnTopView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* height: auto; */
  width: 100%;
  border-radius: 4px;
  margin: 0 4px;
  padding: 0 4px;
  /* background-color: #f00; */
`;
export const ForwardText = styled.Text`
  font-style: italic;
  margin-left: 4px;
  color: #666;
`;

export const Header = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
/* height: 66px; */
height: auto;
width: 100%;
background-color: #f5f5f5;
/* background-color: #334466; */
background-color: ${props => props.userIsWorker === true
  ? '#334466'
  : '#007f66'
}
`;

export const HrLine = styled.View`
width: 90%;
border: 1px #f0f0f0;
margin: 0 auto;
`;

export const ImageView = styled.View`
  height: 48px;
  width: 48px;
  border-radius: 48px;
  border: 1px solid #ccc;
  background-color: #fff;
`;
export const Image = styled.Image`
height: 48px;
width: 48px;
border-radius: 48px;
background-color: #f5f5f5;

`;

export const LastMessageView = styled.View``;

export const LineView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
margin: 8px 12px;
/* background-color: #4433ee; */
`;

export const MessageView = styled.View`
display: flex;
flex-direction: column;
align-items: center;
max-width: 66%;
padding: 4px;
border-radius: 8px;
/* background-color: #4ee; */
/* background-color: #73a6c4; */
background-color: ${ props => props.sender === 'user'
  ? '#daf1e0'
  : '#b4c7db'
};
`;
export const MessageBottomView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px;
  /* background-color: #f5f; */
`;
export const MessageText = styled.Text`
  font-style: ${
    props => props.removedMessage ? 'italic' : 'normal'
  };
  color: ${
    props => props.removedMessage ? '#666' : '#222'
  };
  max-width: 93%;
  padding: 0 4px;
  /* background-color: #666; */
`;
export const MessageTime = styled.Text`
font-size: 12px;
margin: 4px;
`;

export const MessageIcon = styled(Icon)`
font-size: 16px;
margin-left: 8px;
/* margin-right: 8px; */
color: #999;
`;

export const MessageContainer = styled.View`
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  align-items: ${ props => props.sender
  ? (
    (props.sender === 'user') ? 'flex-start' : 'flex-end'
  )
  : (
    (props.sender === 'user') ? 'flex-end' : 'flex-start'
  )
};
  margin: 0;
  /* background-color: #44cc33; */
`;
export const MessageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  /* background-color: #4ee; */
`;

export const MessageListView = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  /* background-color: #44cc; */
`;

export const MessageListButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  height: 36px;
  padding: 0 4px;
  margin: 4px 0;
  margin: 4px;
  /* background-color: #f44; */

`;


export const MessageListItemView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  padding: 0 8px;
  background-color: #f5f5f5;
  background-color: #fff;
`;
export const MessageListItemText = styled.Text`
color: #4433ee;
text-align: left;
margin: 0 auto;
`;

export const ParsedKeyboardAvoidingView = styled.KeyboardAvoidingView`
display: flex;
flex-direction: column;
align-items: center;
height: auto;
width: 100%;
background-color: #4433ee;
`;

export const ReplyOnTopView = styled.View`
display: flex;
flex-direction: column;
width: 100%;
border-radius: 4px;
margin: 4px;
padding: 4px;
background-color: #fff;
`;
export const ReplyNameText = styled.Text`
  color: #f3c775;
`;
export const ReplyOnTopText = styled.Text``;

export const SenderView = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 12px;
  /* background-color: #4433ee; */
`;

export const SenderText = styled.Text`
  font-weight: 700;
  padding: 4px 0;
  color: #fff;
`;
export const SenderAboutText = styled.Text`
  color: #ddd;
`;

export const SendInput = styled.TextInput`
display: flex;
height: 36px;
width: 85%;
margin: 0;
padding: 0 12px;
border-radius: 16px;
border: 1px solid #ccc;
background-color: #fff;
`;

export const SendButton = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 36px;
  width: 36px;
  border-radius: 36px;
  margin: 0;
  background-color: #18A0FB;
`;
export const SendButtonAlignView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  /* background-color: #4e3; */
`;
export const SendIcon = styled(Icon)`
font-size: 20px;
color: #fff;
`;


export const TemporaryMessageContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  width: 100%;
  padding: 8px;
  background-color: #ccc;
`;
export const TemporaryMessageView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 36px;
  width: 90%;
  background-color: #f5f5f5;
  /* background-color: #f00; */
`;
export const TemporaryMessageText = styled.Text`
color: #999;
text-align: left;
margin: 0 auto;
`;

export const TemporaryMessageIcon = styled(Icon)`
font-size: 21px;
color: #4433ee;
/* background-color: #fff; */
`;
export const TemporaryMessageIconView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10%;
  /* background-color: #999; */
`;


