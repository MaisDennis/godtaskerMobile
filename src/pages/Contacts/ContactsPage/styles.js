import styled from 'styled-components/native';
import { TouchableOpacity, TextInput, Text, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import Button from '~/components/Button';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather'

export const ContactsButton = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  height: 50px;
  width: 50px;
  background-color: #f5f;
`;

export const Container = styled.SafeAreaView`
  height: 100%;
`;

export const Header = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
height: 66px;
background-color: #222;
`;

export const HeaderTabView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 5%;
  width: 100%;
  /* background-color: #999; */
`;

export const SearchBarTextInput = styled.TextInput`
  height: 36px;
  width: 80%;
  margin: auto;
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;

`;
export const Title3 = styled.Text`

`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 0 },
})`
  height: 100%;
`;

export const AddIcon = styled(Icon)`
/* margin: 12px; */
color: #fff;
`;
export const SpaceView = styled.View`
height: 50px;
width: 12%;
/* background-color: #f5f; */
`;

export const HeaderTouchable = styled(TouchableOpacity)`
display: flex;
align-items: center;
width: 12%;
/* background-color: #f5f; */

`;

export const UpperTabView = styled.View`
height: auto;
/* width: 25%; */
margin: auto;
`;

export const UpperTabText = styled.Text`
color: #4433ee;
`;
