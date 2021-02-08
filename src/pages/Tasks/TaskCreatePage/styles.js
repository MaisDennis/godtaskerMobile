import styled from 'styled-components/native';
import { ScrollView, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker' // https://github.com/henninghall/react-native-date-picker
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';

export const AlignView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const AddSubTaskIcon = styled(Icon)`
  font-size: 18px;
  font-weight: bold;
  color: #4433ee;
  /* margin: 4px; */
`;
export const AlignCheckBoxView = styled.View`
  display: flex;
  flex-direction:column;
  align-items: flex-start;
  width: 100%;
  /* background-color: #ee4; */
`;

export const CheckBoxWrapper = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 300px;
  padding: 12px;
  border-radius: 12px;
  /* border: 1px solid #ccc; */
  background-color: #fff;
`;
export const CheckBoxView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 80%;
  margin: 4px 0;
`;
export const Container = styled.SafeAreaView`
  display: flex;
  height: 100%;
  /* background-color: #4433ee; */
`;

export const DateOptionsView = styled.View`
  display: flex;
  width: 100%;
  border-radius: 12px;
  /* border: 1px solid #ccc; */
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
export const DescriptionSpan = styled.Text`
  font-weight: normal;
  font-size: 14px;
  text-align: justify;
  line-height: 20px;
  margin: 4px;
  color: #222;
`;

export const FormScrollView = styled.ScrollView`
  display: flex;
  width: 100%;
  padding: 12px 0;
  background-color: #f5f5f5;
`;

export const Input = styled.TextInput`
  display: flex;
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  background-color: #fff;
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

export const ModalView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  width: 100%;
  margin-bottom: 12px;
  /* padding: 12px; */
  align-items: flex-start;
  /* background-color: #ff0; */
`;

export const ModalButtonWrapper = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 33%;
margin-top: 12px;
`;

export const Options = styled(Picker)`
  width: 100%;
  border-radius: 12px;
  background-color: #fff;
`;

export const SubTaskView = styled.View`
    display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
  width: 100%;
  margin: 12px 0;
  border-radius: 12px;
  /* background-color: #f5f; */
`;
export const SubTaskItemView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
`;
export const SubTaskButtonView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: auto;
  width: 25%;
  /* background-color: #44ccee; */
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
export const SubTaskText = styled.Text`
  font-size: 14px;
  font-weight: normal;
  color: #111;
  /* height: 100%; */
  width: 75%;
  /* margin: 4px; */
  /* background-color: #f5f; */
`;
export const SubTaskWeigeText = styled.Text`
  font-size: 14px;
  font-weight: normal;
  color: #111;
  /* height: 100%; */
  width: 40%;
  /* margin: 4px; */
  /* background-color: #f5f; */
`;
export const SubTaskIcon = styled(Icon)`
  height: auto;
  width: auto;
  font-size: 18px;
  font-weight: normal;
  /* text-align: center; */
  margin: auto;
  color: #4433ee;
  /* background-color: #111; */
`;
export const SubTaskButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 50%;
  /* background-color: #666; */
`;
export const SubmitView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  width: 40px;
  margin: 0 4px 24px 4px;
  border-radius: 40px;
  background-color: #4433ee;
`;
export const SubmitIcon = styled(Icon)``;
export const SubmitWrapper = styled.View`
height: 100px;
width: 100%;
background-color: #4433ee;
`;

export const TitleText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: #222;
`;
export const TextWeigeView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
`;

export const WeigeView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: auto;
  width: 90%;
  margin: 12px;
  /* padding: 12px; */
  /* background-color: #f00; */
`;
export const WeigeTagView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  height: auto;
  width: 75%;
  /* background-color: #111; */
`;
export const WeigeText = styled.Text`
  font-size: 14px;
  font-weight: normal;
  color: #666;
  margin-right: 12px;
  /* width: 5%; */
`;
export const WeigeButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: auto;
  margin-left: 60px;
  /* background-color: #f5f; */
`;
