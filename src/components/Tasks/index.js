/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import CheckBox from '@react-native-community/checkbox';
// -----------------------------------------------------------------------------
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/Feather';
import Button from '~/components/Button';
import {
  Container, TitleView, TaskIcon, TitleText, NameText, DescriptionView, DescriptionBorderView, DescriptionSpan,
  DatesAndButtonView, TagView, Label, StartTimeView, StartTime, DueTimeView, DueTime,  ButtonView, HrLine, MessageButton,
  ConfirmButton, UserView,
  HeaderView, TopHeaderView, MiddleHeaderView, BottomHeaderView, AlignBottomView, AlignView,
  OuterStatusView, InnerStatusView, AsideView, MainHeaderView, BellIcon, CheckBoxView, AlignCheckBoxView, HrTitleLine
} from './styles';
import api from '~/services/api';
// -----------------------------------------------------------------------------
const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy", { locale: pt });

export default function Task({ data, navigation, position }) {
  const [toggleTask, setToggleTask] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const today = new Date();
  const dueDate = parseISO(data.due_date);
  console.log(pastDueDate)
  useEffect (() => {
    pastDueDate()

  }, [])

  // function pastDueDate() {
  //   let flag = false;
  //   if (today > dueDate) {
  //     flag = true;
  //   }
  //   return flag;
  // }

  const pastDueDate = () => {
    let flag = false;
    today > dueDate ? flag = true : flag = false
    return flag
  }

  function handleToggleTask() {
    setToggleTask(!toggleTask)
  }

  async function handletoggleCheckBox(value, position) {
    setToggleCheckBox(!toggleCheckBox) // this distoggles the checkbox
    const editedSubTaskList = data.sub_task_list
    editedSubTaskList[position].complete = value
    await api.put(`tasks/${data.id}`, {
      sub_task_list: editedSubTaskList
    })
    return
  }

  function handleMessage() {
    navigation.navigate('MessagesConversationPage', {
      id: data.id,
      user_name: data.user.user_name,
      messages: data.messages
    });
  }

  function handleConfirm() {
    navigation.navigate('Confirm', { task_id: data.id, taskName: data.name });
  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <TouchableOpacity onPress={handleToggleTask}>
        <TopHeaderView>
          <AlignView>
            <TitleView>
              {/* <TitleText>{position}</TitleText> */}
              <TaskIcon name="clipboard" pastDueDate={pastDueDate()}/>
              <TitleText pastDueDate={pastDueDate()}>{data.name} </TitleText>
            </TitleView>
            <HrTitleLine/>
          </AlignView>
        </TopHeaderView>
        <HeaderView>
          <MainHeaderView>
            <MiddleHeaderView>
              <AlignView>
                <DatesAndButtonView>
                  <UserView>
                    <Label>Delegado por:</Label>
                    <NameText pastDueDate={pastDueDate()}>{data.user.user_name}</NameText>
                  </UserView>
                </DatesAndButtonView>
                <DatesAndButtonView>
                  <TagView>
                    <Label>Início:</Label>
                    <StartTimeView>
                      <StartTime pastDueDate={pastDueDate()}>{formattedDate(data.start_date)}</StartTime>
                    </StartTimeView>
                  </TagView>
                  <TagView>
                    <Label>Prazo:</Label>
                    <DueTimeView>
                      <DueTime pastDueDate={pastDueDate()}>{formattedDate(data.due_date)}</DueTime>
                    </DueTimeView>
                  </TagView>
                </DatesAndButtonView>
              </AlignView>
            </MiddleHeaderView>
            <AlignBottomView>
              <BottomHeaderView>
                <OuterStatusView>
                  <InnerStatusView></InnerStatusView>
                </OuterStatusView>
                <StartTime>84%</StartTime>
              </BottomHeaderView>
            </AlignBottomView>
          </MainHeaderView>
          <AsideView>
            <AlignView>
              <BellIcon name="bell"/>
            </AlignView>
          </AsideView>
        </HeaderView>
      </TouchableOpacity>
      { toggleTask && (
        <>
          <DescriptionView>
            <HrLine/>
            <Label>Descrição</Label>
            <DescriptionBorderView pastDueDate={pastDueDate()}>
              <DescriptionSpan>{data.description}</DescriptionSpan>
            </DescriptionBorderView>
          </DescriptionView>
          <DescriptionView>
            <Label>Sub-tarefas</Label>
            <DescriptionBorderView pastDueDate={pastDueDate()}>
              { data.sub_task_list.map((s, index) => (
                <AlignCheckBoxView key={s.id}>
                  <CheckBoxView>
                      <CheckBox
                        disabled={false}
                        value={s.complete}
                        onValueChange={
                          (newValue) => handletoggleCheckBox(newValue, index)
                        }
                      />
                      <DescriptionSpan>{s.weige_percentage}%</DescriptionSpan>
                      <DescriptionSpan type="check-box">{s.description}</DescriptionSpan>
                  </CheckBoxView>
                </AlignCheckBoxView>
              ))}
            </DescriptionBorderView>
          </DescriptionView>

          <DatesAndButtonView>

            <ButtonView>
              <TouchableOpacity onPress={handleMessage}>
                <MessageButton>
                  <Icon name="message-square" size={20} color="#fff" />
                </MessageButton>
              </TouchableOpacity>
            </ButtonView>
            <ButtonView>
              <TouchableOpacity onPress={handleConfirm}>
                <ConfirmButton pastDueDate={pastDueDate()}>
                  <Icon name="check-circle" size={20} color="#fff" />
                </ConfirmButton>
              </TouchableOpacity>
            </ButtonView>
          </DatesAndButtonView>
        </>
      )}
    </Container>
  );
}
