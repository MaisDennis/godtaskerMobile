import { Platform, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { TextInputMask as InputMask } from 'react-native-masked-text'
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';
// -----------------------------------------------------------------------------
import Input from '~/components/Input';
import Button from '~/components/Button';
// -----------------------------------------------------------------------------
export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'height',
})`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  /* background-color: #44ee33; */
`;

export const AllIcon = styled(Icon)`
  font-size: 16px;
  margin: 16px 0 4px;
  color: #ccc;
  /* color: #44ccee */
`;
export const ButtonText = styled.Text`
font-size: 16px;
font-weight: bold;
/* background: #999; */
color: #fff;
`;
export const Form = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: #4433ee; */
`;
export const FormInput = styled(Input)`
`;
export const HrLine = styled.View`
  height: 0;
  border: .5px solid #666;
  width: 50%;
  margin: 12px 0;
`;
export const Options = styled(Picker)`
  height: 48px;
  width: 90%;
  padding-left: 16px;
  margin: 8px 0;
  border-radius: 4px;
  color: #ccc;
  background-color: rgba(0,0,0,0.5);
`;
export const PhoneMask = styled(InputMask)`
  height: 48px;
  width: 90%;
  padding-left: 16px;
  margin: 8px 0;
  border-radius: 4px;
  color: #fff;
  background-color: rgba(0,0,0,0.5);
`;
export const SubmitButton = styled(Button)`
  margin: 16px;
  width: 148px;
`;
export const SignUpErrorText = styled.Text`
  color: #f3c775;
  /* font-weight: bold; */
  font-size: 16px;
`;
