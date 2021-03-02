import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '~/components/Button';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* height: 66px; */
  width: 100%;
  margin: 8px 0;
  padding: 0;
  /* border-radius: 24px; */
  /* border: 1px solid #ccc; */
  background: #fff;
  /* background: #F5F5; */
`;

export const Body = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  height: 66px;
  width: 100%;
  /* border: 1px solid #ccc; */
  /* padding: 8px; */
  /* background: #F5F5; */
`;
export const TabView = styled.View`
  height: 100%;
  width: 5%;
  background-color: #334466;

`;
export const UserInfoView = styled.View`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  height: 100%;
  width: 85%;
  padding: 0 12px;
  /* background-color: #4433ee; */
`;
export const OthersView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 10%;
  background-color: #fff;
`;

export const ContactsIcon = styled(Icon)`
  font-size: 24px;
  margin: 0 auto;
  color: #ccc;

`;

export const BottomTabView = styled.View`
display: flex;
flex-direction: row;
width: 100%;
/* background-color: #ff4; */

`;
export const ButtonsView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  width: 60%;
  margin: 0 auto;
  padding: 0 12px;
  /* background-color: #ccc; */
`;

export const ImageView = styled.View`
  height: 36px;
  width: 36px;
  border-radius: 36px;
  border: 1px solid #ccc;
`;

export const Image = styled.Image`
  height: 36px;
  width: 36px;
  border-radius: 36px;
  background-color: #f5f5f5;
`;

export const ContactText = styled.Text`
  font-weight: 700;
  margin-left: 12px;
`;

export const ButtonsText = styled.Text`
  font-weight: 600;
  color: #999;
`;
