import { Platform, KeyboardAvoidingView } from 'react-native';
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
  padding: 0 30px;
`;

export const StyledScrollView = styled.ScrollView`
/* background: #F5F; */
`;

export const ImageLogo = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 24px;
  margin: 120px auto 6px;
`;

export const ImageGodtaskerFont = styled.Image`
  width: 240px;
  height: 80px;
  margin: auto auto 4px;

`;

export const Title = styled.Text`
font-size: 20px;
font-weight: bold;
margin: 14px auto;
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

export const FormUser = styled.View`
width: 100%;
height: auto;
margin: 0 auto;
/* background: #c4ce3b; */
`;

export const FormWorker = styled.View`
  width: 100%;
  height: auto;
  margin: 0;
  /* background: #c4ce3b; */
`;

export const FormInputUserEmail = styled(Input)`
  background: rgba(0,0,0,0.3);
  margin: 4px auto;
  width: 90%;
  padding-left: 10px;
`;

export const FormInputWorkerId = styled(Input)`
  background: rgba(0,0,0,0.3);
  margin: 4px auto;
  width: 90%;
  padding-left: 10px;
`;

export const PhoneMask = styled(InputMask)`
  color: #fff;
  background: rgba(0,0,0,0.3);
  margin: 4px auto;
  width: 90%;
  padding-left: 10px;
  height: 46px;
`;

export const FormInputUserPassword = styled(Input)`
  background: rgba(0,0,0,0.3);
  margin: 4px auto;
  width: 90%;
  padding-left: 10px;
`;

export const FormInputWorkerPassword = styled(Input)`
  background: rgba(0,0,0,0.3);
  margin: 4px auto;
  width: 90%;
  padding-left: 10px;
`;

export const SubmitButton = styled(Button)`
  margin: 14px auto;
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
