
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '~/components/Button';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 4px 0px;
  padding: 4px 8px;
  border-radius: 24px;
  border: 1px solid #ccc;
  background: #fff;
  /* background: #F5F5; */
`;
export const ImageView = styled.View`
  height: 48px;
  width: 48px;
  margin: 0;
  border-radius: 48px;
  border: 1px solid #ccc;
  /* background-color: #334455; */
`;
export const Image = styled.Image`

`;
export const BodyView = styled.View`
display: flex;
flex-direction: row;
justify-content: space-around;
height: 100%;
width: auto;
/* background-color: #4433ee; */
`;
export const MainView = styled.View`
display: flex;
flex-direction: column;
height: 100%;
width: 70%;
/* background-color: #ee3; */
`;
export const TitleView = styled.View``;
export const TitleText = styled.Text`
  font-weight: 700;
  padding: 4px;
`;
export const LastMessageView = styled.View`
min-height: 48px;
`;
export const LastMessageTimeView = styled.View`
`;
export const LastMessageText = styled.Text`
  font-weight: 400;
  padding: 4px;
`;
export const RightView = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 20%;
padding: 0 4px;
/* background-color: #f00; */
`;
export const LastMessageTimeText = styled.Text`
  font-size: 12px;
`;
export const UnreadMessageCountView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 24px;
  width: 24px;
  margin: 0;
  border-radius: 24px;
  border: 1px solid #ccc;
  /* background-color: #fff; */
`;
export const MessageIcon = styled(Icon)`
color: #222;
font-size: 24px;
color: #ccc;
`;
export const UnreadMessageCountText = styled.Text`
  font-size: 12px;
  margin: auto;
  /* background-color: #f00; */
`;

// export const AlignView = styled.View`
// display: flex;
// flex-direction: column;
// align-items: center;
// `;


