/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import CheckBox from '@react-native-community/checkbox';
// -----------------------------------------------------------------------------
import pt from 'date-fns/locale/pt';
// import Icon from 'react-native-vector-icons/Feather';
import Button from '~/components/Button';
import {
  Container, TitleView, TaskIcon, TitleText, NameText, DescriptionView, DescriptionBorderView, DescriptionSpan,
  DatesAndButtonView, TagView, Label, StartTimeView, StartTime, DueTimeView, DueTime,  ButtonView, HrLine, MessageButton,
  ConfirmButton, UserView,
  HeaderView, TopHeaderView, MiddleHeaderView, BottomHeaderView, AlignBottomView, AlignView,
  OuterStatusView, InnerStatusView, AsideView, MainHeaderView, BellIcon, CheckBoxView, AlignCheckBoxView, HrTitleLine,
  Icon,

} from './styles';
import api from '~/services/api';
// -----------------------------------------------------------------------------
const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy", { locale: pt });

export default function TaskUser({ data, navigation }) {
  const [toggleTask, setToggleTask] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const today = new Date();
  const dueDate = parseISO(data.due_date);

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
    console.tron.log(data)
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

  function handleEditTask() {
    navigation.navigate('TaskEdit', {
      id: data.id,
      name: data.name,
      description: data.description,
      sub_task_list: data.sub_task_list,
      task_attributes: data.task_attributes,
      start_date: data.start_date,
      due_date: data.due_date,
      worker: data.worker,
     });
    // console.tron.log('edit task')
  }

  function handleCancelTask() {

  }

  function handleScoreTask() {

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
                    <Label>Delegado para:</Label>
                    <NameText>{data.worker.worker_name}</NameText>
                  </UserView>
                </DatesAndButtonView>
                <DatesAndButtonView>
                  <TagView>
                    <Label>Início:</Label>
                    <StartTimeView>
                      <StartTime>{formattedDate(data.start_date)}</StartTime>
                    </StartTimeView>
                  </TagView>
                  <TagView>
                    <Label>Prazo:</Label>
                    <DueTimeView pastDueDate={pastDueDate()}>
                      <DueTime>{formattedDate(data.due_date)}</DueTime>
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
                <AlignCheckBoxView key={index}>
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
              <TouchableOpacity onPress={handleEditTask}>
                <ConfirmButton pastDueDate={pastDueDate()}>
                  <TaskIcon name="edit" size={20} color="#fff" />
                </ConfirmButton>
              </TouchableOpacity>
            </ButtonView>
            <ButtonView>
              <TouchableOpacity onPress={handleCancelTask}>
                <ConfirmButton pastDueDate={pastDueDate()}>
                  <TaskIcon name="meh" size={20} color="#fff" />
                </ConfirmButton>
              </TouchableOpacity>
            </ButtonView>
            <ButtonView>
              <TouchableOpacity onPress={handleScoreTask}>
                <ConfirmButton pastDueDate={pastDueDate()}>
                  <TaskIcon name="check-circle" size={20} color="#fff" />
                </ConfirmButton>
              </TouchableOpacity>
            </ButtonView>
          </DatesAndButtonView>
        </>
      )}
    </Container>
  );
}
