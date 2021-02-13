import { Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { TextInputMask as InputMask } from 'react-native-masked-text'
// -----------------------------------------------------------------------------
import Input from '~/components/Input';
import Button from '~/components/Button';
// -----------------------------------------------------------------------------
export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'position',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledScrollView = styled.ScrollView`
/* background: #F5F; */
`;

export const ImageLogo = styled.Image`
  width: 148px;
  height: 148px;
  /* border-radius: 24px; */
  margin: 120px auto 4px;
`;

export const ImageGodtaskerFont = styled.Image`
  width: 240px;
  height: 80px;
  margin: auto auto 4px;

`;

export const Title = styled.Text`
font-size: 21px;
font-weight: bold;
margin: 16px auto 8px;
/* background: #999; */
color: #58595B;
`;

export const Div1 = styled.View`
flex-direction: row;
width: 100%;
/* background: #5edc1f; */
`;

export const Div2 = styled.View`
width: 80%;
height: 100%;
margin: auto;
/* background: #fff; */
`;

export const FormWorker = styled.View`
  width: 100%;
  height: auto;
  margin: 0;
  /* background: #c4ce3b; */
`;

export const PhoneMask = styled(InputMask)`
  color: #fff;
  background: rgba(0,0,0,0.3);
  margin: 4px auto;
  width: 90%;
  border-radius: 4px;
  padding-left: 12px;
  height: 46px;
`;
export const FormInputWorkerPassword = styled(Input)`
  background: rgba(0,0,0,0.3);
  margin: 4px auto;
  width: 90%;
  /* background: #c4ce3b; */
`;

export const SubmitButton = styled(Button)`
  width: 50%;
  margin: 16px auto;
  width: 148px;
  /* width: 50%; */
`;

export const ButtonText = styled.Text`
font-size: 16px;
font-weight: bold;
/* background: #999; */
color: #fff;
`;

export const StyledKeyboardAvoiding = styled(KeyboardAvoidingView)`
  /* background: #58595B; */
  width: 100%;
`;

export const SignUpTouchable = styled(TouchableOpacity)`
display: flex;
align-items: center;
margin-top: 12px;

`;

export const SignUpText = styled.Text`
  color: #44ccee;
`;
