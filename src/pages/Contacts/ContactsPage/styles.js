import styled from 'styled-components/native';
import { TouchableOpacity, TextInput, Text, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import Button from '~/components/Button';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather'

export const Container = styled.View.attrs({
})`
  /* top: 5px; */
  margin: 0;
  /* width: 90%; */
  /* height: 800px; */
  background: #fff;
  /* flex: 1; */

  /* padding: 0; */
  /* background: #ff5f; */
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

`;

export const SearchBarTextInput = styled.TextInput`
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
