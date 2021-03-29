import styled from 'styled-components/native';
import { TextInput, Text, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import Button from '~/components/Button';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  height: 100%;
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

export const HeaderTabView = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
height: 5%;
`;
export const UpperTabView = styled.View`
height: auto;
/* width: 25%; */
margin: auto;
`;
export const UpperTabText = styled.Text`
color: #4433ee;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
  contentContainerStyle: { padding: 0, margin: 0 },
})`
  height: 100%;
`;




