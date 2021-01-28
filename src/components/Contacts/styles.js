import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '~/components/Button';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 8px 0;
  padding: 0;
  border-radius: 24px;
  /* border: 1px solid #ccc; */
  background: #fff;
  /* background: #F5F5; */
`;

export const Header = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Body = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
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
`;
