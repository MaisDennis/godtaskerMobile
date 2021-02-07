import styled from 'styled-components/native';
import { TextInput, Text, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import Button from '~/components/Button';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View.attrs({
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* top: 5px; */
  margin: 0;
  /* width: 90%; */
  /* height: 800px; */
  background: #f5f5f5;
  /* flex: 1; */

  /* padding: 0; */
  /* background: #ff5f; */
`;

export const Header = styled.View`
display: flex;
flex-direction: row;
align-items: center;
height: 66px; /* maintain in px. */
width: 100%;
background-color: #222;
/* background-color: #f5f; */
`;
export const AlignView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const SpaceView = styled.View`
height: 50px;
width: 12%;
/* background-color: #f5f; */
`;

export const HeaderTabView = styled.View`

`;

export const SearchBarTextInput = styled.TextInput`
display: flex;
height: 36px;
width: 80%;
padding: 4px 12px;
border-radius: 4px;
background-color: #f5f5f5;
`;
export const Title3 = styled.Text`

`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
  contentContainerStyle: { padding: 0, margin: 0 },
})`
  height: 100%;
`;




