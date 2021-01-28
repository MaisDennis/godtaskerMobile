import styled from 'styled-components/native';
import Button from '~/components/Button';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const StyledScrollView = styled.ScrollView`

`;

export const Container = styled.SafeAreaView`
  top: 5px;
  margin: 0 auto;
  height: auto;
  width: 90%;
  border-radius: 4px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  padding: 4px;
   /* background: #444; */
`;

export const TitleView = styled.View`
  display: flex;
  flex-direction: row;
  margin: 14px auto;
  /* background: #ff5f; */
`;

export const CameraView = styled.View`
  position: relative;
  height: auto;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  /* background: #F5F5; */
`;

export const TaskName = styled.Text`
  font-weight: bold;
  font-size: 16px;
  /* background: #ff5f; */
  margin: auto 4px;
`;

export const CameraButton = styled(Button)`
  top: 80px;
  margin: 15px auto 200px;
  background: #58595B;
  width: 90%;
`;
