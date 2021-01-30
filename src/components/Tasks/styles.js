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
export const TopHeaderView = styled.View`
  display: flex;
  flex-direction:row;
  width: 100%;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: #da321c;
  /* background-color: #aa2a19; */
`;
export const HeaderView = styled.View`
  display: flex;
  flex-direction:row;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 0 8px;
  border-radius: 24px;
  /* background-color: #f00; */
`;
export const MainHeaderView = styled.View`
  width: 90%;
  /* padding: 0 8px; */
  /* background-color: #ee3; */

`;
export const AsideView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
width: 10%;
  /* background-color: #336622; */
`;
export const BellIcon = styled(Icon)`
color: #222;
font-size: 24px;
color: #ccc;
`;

export const MiddleHeaderView = styled.View`
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  width: 100%;
  /* background-color: #f00; */
  /* padding: 4px 0; */
`;
export const BottomHeaderView = styled.View`
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: space-around;
  width: auto;
  padding: 0;
  /* background-color: #f44; */
`;
export const AlignBottomView = styled.View`
  display: flex;
  flex-direction:column;
  margin: 0 auto;
  width: 100%;
  /* background-color: #ee4; */
`;
export const AlignView = styled.View`
  display: flex;
  flex-direction:column;
  align-items: center;
  width: 100%;
  /* background-color: #ee4; */
`;
export const TitleView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px;
  color: #fff;
  /* background-color: #663333; */
`;
export const TaskIcon = styled(Icon)`
color: #222;
font-size: 20px;
margin-right: 8px;
color: #fff;
/* color: ${props => props.pastDueDate == true ? '#f64C75' : '#009966'}; */
`;
export const TitleText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  /* margin: auto 4px; */
`;
export const OuterStatusView = styled.View`
  display: flex;
  flex-direction:row;
  align-items: center;
  width: 70%;
  border-radius: 16px;
  margin: 4px 0;
  /* margin-bottom: 8px; */
  background-color: #F5F5F5;
`;
export const InnerStatusView = styled.View`
  height: 16px;
  width: 20%;
  border-radius: 16px;
  background-color: #daf1e0;
`;
export const HrTitleLine = styled.View`
width: 100%;
/* border: 1px #dddcda; */
border: .5px #ccc;
box-shadow: 2px 2px 2px #ccc;
margin: 0 auto;
`;
export const NameText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #222;
  /* margin: auto 4px; */
  /* background-color: #4433ee; */
`;
export const DescriptionView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 95%;
  margin-bottom: 8px;
  /* background-color: #ee44; */
`;
export const DescriptionBorderView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #F5F5F5;
  /* background-color: #f00; */
`;
export const DescriptionSpan = styled.Text`
  font-weight: normal;
  font-size: 14px;
  text-align: justify;
  line-height: 20px;
  margin: 4px;
  color: #222;
`;
export const DatesAndButtonView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
export const TagView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px auto;
`;
export const Label = styled.Text`
  font-weight: normal;
  font-size: 14px;
  margin-right: 4px;
  color: #888;
`;
export const Time = styled.Text`
  font-weight: bold;
  font-size: 14px;
  /* padding: 2px; */
  /* margin: 2px auto; */
  color: ${props => props.pastDueDate === true ? '#f64C75' : '#009966'};
`;
export const StartTimeView = styled.View`
padding: 0 4px;
border-radius: 12px;
background: #F5F5F5;
`;
export const StartTime = styled.Text`
  font-weight: bold;
  font-size: 14px;
  /* background-color: #4433ee; */
`;
export const DueTimeView = styled.View`
  border-radius: 12px;
  padding: 0 4px;
  background: ${props => props.pastDueDate == true ? '#f64C75' : '#009966'};
`;
export const DueTime = styled.Text`
  font-weight: bold;
  font-size: 14px;
`;
export const ButtonView = styled.View`
  width: 33%;
  text-align: center;
  margin: 8px auto;
  /* background: #f4f; */
`;
export const HrLine = styled.View`
width: 100%;
border: 0.5px #dddcda;
margin: 0 auto;
`;
export const MessageButton = styled(Button)`
/* background: #58595B; */
background-color: #43ee;
`;
export const ConfirmButton = styled(Button)`
background: ${props => props.pastDueDate == true ? '#f64C75' : '#009966'};
`;
export const FinishedButton = styled(Button)`
background: #999;
`;
export const UserView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px auto;
`;
export const CheckBoxView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 80%;
  margin: 4px 0;
`;
export const AlignCheckBoxView = styled.View`
  display: flex;
  flex-direction:column;
  align-items: flex-start;
  width: 100%;
  /* background-color: #ee4; */
`;
