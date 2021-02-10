import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  height: 100%;
`;
export const Header = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
height: 66px; /* maintain in px. */
/* height: 9%; */
background-color: #222;
`;
export const SpaceView = styled.View`
height: 50px;
width: 12%;
/* background-color: #f5f; */
`;

export const Title3 = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #888;
  margin: auto;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 5 },
})`
  height: 100%;
`;

export const HeaderTabView = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
height: 5%;
`;
export const UpperTabView = styled.View`
height: auto;
/* width: 25%; */
margin: auto;
`;
export const UpperTabText = styled.Text`
color: #4433ee;
`;
