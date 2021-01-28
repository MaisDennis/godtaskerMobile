import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
export const Container = styled(RectButton)`
  height: 44px;
  width: 90%;
  background: #58595B;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
