import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Button from '~/components/Button';

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
export const AlignCheckBoxView = styled.View`
  display: flex;
  flex-direction:column;
  align-items: flex-start;
  width: 100%;
  /* background-color: #ee4; */
`;
export const AsideView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
width: 10%;
  /* background-color: #336622; */
`;

export const AcceptButton = styled(Button)`
  height: 36px;
  width: 108px;
  background-color: #18A0FB;
`;

export const BellIcon = styled(Icon)`
font-size: 24px;
margin: 4px 0;
color: #ccc;
`;
export const ButtonIcon = styled(Icon)`
font-size: 21px;
padding: 4px;
color: #18A0FB;
`;
export const BottomHeaderView = styled.View`
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: space-around;
  width: auto;
  /* background-color: #f44; */
`;
export const ButtonView = styled.View`
  width: 33%;
  text-align: center;
  margin: 8px auto;
  /* background: #f4f; */
`;
export const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #fff;
`;
export const ButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin: 4px 0;
  /* background-color: #fe2; */
`;

export const CheckBoxView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 80%;
  margin: 4px 0;
`;
export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 8px 0;
  padding: 0;
  background-color: ${props => props.taskConditionIndex === 1 ? '#fff' : '#E0E4E2'};
  /* background-color: #F5F5; */
`;
export const ConfirmButton = styled.View`
  display: flex;
  align-items: center;
/* background: ${props => props.pastDueDate == true ? '#f64C75' : '#009966'}; */
`;

export const DescriptionView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 95%;
  margin-top: 4px;
  margin-bottom: 8px;
  /* background-color: #ee44; */
`;
export const DescriptionBorderView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 36px;
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #F5F5F5;
  /* background-color: #f00; */
`;
export const DescriptionSpan = styled.Text`
  font-weight: normal;
  font-size: 12px;
  text-align: justify;
  line-height: 20px;
  margin: 4px;
  color: #222;
`;
export const DatesAndButtonView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  /* background-color: #fe2; */
`;
export const DetailsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: auto;
  /* background-color: #fe2; */
`;
export const DueTimeView = styled.View`
  border-radius: 12px;
  padding: 0 8px;
  background: ${props => props.pastDueDate == true ? '#f64C75' : '#009966'};
`;
export const DueTime = styled.Text`
  font-weight: bold;
  font-size: 12px;
`;

export const FinishedButton = styled(Button)`
background: #999;
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
export const HrLine = styled.View`
width: 100%;
border: 0.5px #dddcda;
margin: 4px auto;
`;
export const HrTitleLine = styled.View`
width: 100%;
border: .5px #ccc;
box-shadow: 2px 2px 2px #ccc;
margin: 0 auto;
`;

export const ImageWrapper = styled.View`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 95%;
  margin-top: 4px;
  margin-bottom: 8px;
  /* background-color: #ee44; */
`;

export const ImageView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 36px;
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #F5F5F5;
`;

export const Image = styled.Image`
  height: 300px;
  width: 300px;
  margin: 8px;
  /* border-radius: 48px; */
  background-color: #f5f5f5;
`;
export const InnerStatusView = styled(LinearGradient)`
  height: 8px;
  border-radius: 16px;
  /* background-color: #f3c775; */
`;

export const Label = styled.Text`
  font-weight: normal;
  font-size: 12px;
  margin: 4px;
  margin-right: 4px;
  color: #888;
`;

export const LabelInitiated = styled.Text`
  font-weight: normal;
  font-size: 12px;
  margin-right: 4px;
  max-width: 60px;
  color: #009966;
`;

export const LabelEnded = styled.Text`
  font-weight: normal;
  font-size: 12px;
  margin-right: 4px;
  max-width: 60px;
  color: ${props => props.pastDueDate === true ? '#f64C75' : '#009966'};
`;

export const MainHeaderView = styled.View`
  width: 90%;
  /* background-color: #ee3; */
`;
export const MiddleHeaderView = styled.View`
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  width: 100%;
  /* background-color: #f00; */
  /* padding: 4px 0; */
`;

export const NameText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #222;
  /* margin: auto 4px; */
  /* background-color: #4433ee; */
`;
export const ModalView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  margin-bottom: 12px;
  align-items: flex-start;
  padding: 12px;
  border-radius: 12px;
  background-color: #f5f5f5;
  /* background-color: #ff0; */
`;
export const ModalText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  margin: 12px auto;
  color: #222;
  /* background-color: #f00; */
`;

export const OuterStatusView = styled.View`
  display: flex;
  flex-direction:row;
  align-items: center;
  width: 70%;
  border-radius: 16px;
  margin: 8px 0;
  /* margin-bottom: 8px; */
  background-color: #F5F5F5;
`;

export const RejectTaskInput = styled.TextInput`
  display: flex;
  height: auto;
  width: 95%;
  padding: 12px;
  margin: 12px auto;
  border-radius: 12px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const RejectButton = styled(Button)`
  height: 36px;
  width: 108px;
  background-color: #999;
`;

export const StartTimeView = styled.View`
padding: 0 8px;
border-radius: 12px;
background: ${props => props.initiated === null ? '#F5F5F5' : '#009966'};
`;
export const StartTime = styled.Text`
  font-weight: bold;
  font-size: 12px;
  /* background-color: #4433ee; */
`;

export const TagView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px auto;
  /* background-color: #4433ee; */
`;
export const Time = styled.Text`
  font-weight: bold;
  font-size: 14px;
  /* padding: 2px; */
  /* margin: 2px auto; */
  color: ${props => props.pastDueDate === true ? '#f64C75' : '#009966'};
`;
export const TopHeaderView = styled.View`
  display: flex;
  flex-direction:row;
  width: 100%;
  /* border-top-left-radius: 24px; */
  /* border-top-right-radius: 24px; */
  /* background-color: #da321c; */
  /* background-color: #73a6c4; */
  background-color: #334466;
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
font-size: 21px;
margin-right: 8px;
color: #fff;
/* color: ${props => props.pastDueDate == true ? '#f64C75' : '#009966'}; */
`;
export const TitleText = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  /* margin: auto 4px; */
`;
export const TitleIcon = styled(Icon)`
font-size: 20px;
margin-right: 8px;
color: #fff;
/* color: ${props => props.pastDueDate == true ? '#f64C75' : '#009966'}; */
`;
export const TaskAttributesView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60px;
  border-radius: 4px;
  background: ${ props => props.taskAttributes === 0
    ? '#F3E675'
    : props => props.taskAttributes === 1
      ? '#f3c775'
      : props => props.taskAttributes === 2
        ? '#ED7777'
        : '#fff'
  };
`;

export const UserImage = styled.Image`
  height: 36px;
  width: 36px;
  border-radius: 36px;
  border: 1px solid #fff;

  background-color: #f5f5f5;
`;
export const UserImageBackground = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  border: 1px solid #ccc;
  margin: 0 8px 0 4px;
  /* background-color: #666; */
`;
export const UserView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px auto;
  /* background-color: #f00; */
`;
export const UnreadMessageCountText = styled.Text`
  font-size: 12px;
  margin: auto;
  /* background-color: #f00; */
`;

