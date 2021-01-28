import styled from 'styled-components/native';
import { ScrollView } from 'react-native'
import DatePicker from 'react-native-date-picker' // https://github.com/henninghall/react-native-date-picker
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.SafeAreaView`
  display: flex;
  height: 100%;

  /* background-color: #4433ee; */
`;
export const FormScrollView = styled.ScrollView`
  display: flex;
  width: 100%;
  padding: 12px 0;

  background-color: #f5f5f5;
`;

export const ItemWrapperView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  margin-bottom: 12px;
  /* padding: 12px; */
  align-items: flex-start;
  /* background-color: #ff0; */
`;

export const LabelText = styled.Text`
  font-size: 14px;
  font-weight: normal;
  color: #666;
  margin: 4px;
`;

export const TitleText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: #222;
`;
export const Input = styled.TextInput`
  display: flex;
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const SubTaskView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
  border-radius: 12px;
  /* background-color: #f5f; */
`;
export const SubTaskLabelText = styled.Text`
  font-size: 14px;
  font-weight: normal;
  color: #666;
  width: 5%;
  /* margin: 4px; */
`;
export const SubTaskInput = styled.TextInput`
  display: flex;
  height: auto;
  width: 95%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  background-color: #fff;
`;
export const DateOptionsView = styled.View`
  display: flex;
  width: 100%;
  border-radius: 12px;
  /* border: 1px solid #666; */
  background-color: #fff;
`;

export const DateOptions = styled(DatePicker)`
  width: 100%;

  height: 120px;
  border: 1px solid #ccc;
  margin: 0;
  /* font-size: 20px; */
  /* background-color: #f5f; */
`;

export const Options = styled(Picker)`
  width: 100%;
  /* height: 100px; */
  border-radius: 12px;
  background-color: #fff;
`;

export const SubmitView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 36px;
  width: 36px;
  margin: 0 4px 24px 4px;
  border-radius: 36px;
  background-color: #4433ee;
`;

export const AlignView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;
export const SubmitIcon = styled(Icon)``;
