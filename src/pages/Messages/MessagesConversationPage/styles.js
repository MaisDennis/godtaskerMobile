// import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '~/components/Button';
import { ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0px;
  /* padding: 4px 8px; */
  border-radius: 24px;
  border: 1px solid #ccc;
  background: #fff;
  /* background: #F5F5; */
`;

export const ConversationView = styled.View`
display: flex;
flex-direction: column;
/* align-items: center; */
height: 90%;
width: 100%;
overflow: hidden;
/* background-color: #4433ee; */
`;
export const LineView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
height: 48px;
width: auto;
margin: 0 12px;
/* background-color: #4433ee; */
`;
export const HrLine = styled.View`
width: 95%;
border: 0.5px #dddcda;
margin: 0 auto;
`;
export const AlignView = styled.View`
display: flex;
flex-direction: column;
align-items: ${
  props => props.sender === 'user' ? 'flex-start' : 'flex-end'
};

width: 100%;
/* background-color: #665544; */
`;
export const MessageView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 12px;
border-radius: 24px;
background-color: #4ee;
`;
export const MessageText = styled.Text``;
export const MessageTime = styled.Text`
font-size: 12px;
margin: 4px;
`;
export const FooterView = styled.View`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
height: 60px;
width: 100%;
padding: 0 8px;
background-color: #222;
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
  background-color: #4ee;
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
color: #222;
font-size: 20px;
/* margin-right: 8px; */
color: #fff;
`;
