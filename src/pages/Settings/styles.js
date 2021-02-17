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

export const SpaceView = styled.View`
height: 50px;
width: 12%;
/* background-color: #f5f; */
`;

export const UserProfileView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
height: 72px;
padding: 12px;
background-color: #f5f5f5;
`;
export const UserImage = styled.Image`
  height: 48px;
  width: 48px;
  border-radius: 48px;
  background-color: #fff;
`;
export const UserImageView = styled.View`
  height: 48px;
  width: 48px;
  border-radius: 48px;
  border: 1px solid #ccc;
  /* background-color: #334455; */
`;
export const UserInfoView = styled.View`
display: flex;
flex-direction: column;
width: 100%;
padding: 0 12px;
/* background-color: #4433ee; */
`;
export const UserText = styled.Text`
  font-weight: 700;
  padding: 4px 0;
`;
export const UserAboutText = styled.Text``;

export const SettingsMenuView = styled.View`
display: flex;
flex-direction: column;
height: 100%;
/* background-color: #4433ee; */
`;

export const SettingsItemView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
height: 48px;
/* border: 1px solid #ccc; */
background-color: #fff;
`;
export const SettignsLeftView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 50%;
  /* background-color: #3f3; */
`;
export const SettingsRightView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  /* background-color: #f00; */
`;



export const AlignView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 24px;
  /* background-color: #f5f5f5; */
`;

export const HrView = styled.View`
height: 0;
width: 100%;
border: .5px solid #ccc;
`;

export const SubHrView = styled.View`
height: 0;
width: 100%;
margin-left: 20%;
border: .5px solid #ccc;
`;

export const SettingsImageView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  margin: 0;
  /* background-color: #f5f5; */
`;
export const SettingsImage = styled(Icon)`

`;
export const SettingsItemText = styled.Text``;

export const NextIcon = styled(Icon)`
  color: #ccc;
`;
