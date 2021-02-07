import styled from 'styled-components/native';
import { View, Text } from 'react-native';

export const Header = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
height: 100%;
width: 100%;
/* background-color: #f03a1f; */
/* background-color: #73c479; */
/* background-color: #fff; */
/* background-color: #f33; */
background-color: #222;
`;

export const SpaceView = styled.View`
height: 50px;
width: 12%;
background-color: #4433ee;
`;

export const BodyView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
width: 70%;
/* background-color: #73c479; */

`;
export const ImageView = styled.View`
  height: 48px;
  width: 48px;
  border-radius: 48px;
  background-color: #fff;
`;
export const SenderView = styled.View`

`;

export const Image = styled.Image``;
export const SenderText = styled.Text`
  margin-left: 12px;
  color: #fff;
`;
