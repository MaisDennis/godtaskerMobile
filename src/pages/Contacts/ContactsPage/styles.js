import styled from 'styled-components/native';
import { TextInput, Text, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import Button from '~/components/Button';
import { RectButton } from 'react-native-gesture-handler';

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
