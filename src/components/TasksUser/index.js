/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import CheckBox from '@react-native-community/checkbox'; //https://github.com/react-native-checkbox/react-native-checkbox
// -----------------------------------------------------------------------------
import pt from 'date-fns/locale/pt';
import {
  Container, TitleView, TitleIcon, TaskIcon, TitleText, NameText,
  DescriptionView, DescriptionBorderView, DescriptionSpan,
  DatesAndButtonView, TagView, Label, StartTimeView, StartTime,
  DueTimeView, DueTime,  ButtonView, HrLine,
  ConfirmButton, UserView,
  HeaderView, TopHeaderView, MiddleHeaderView, BottomHeaderView, AlignBottomView, AlignView,
  OuterStatusView, InnerStatusView, AsideView, MainHeaderView, BellIcon, CheckBoxView, AlignCheckBoxView, HrTitleLine,
  UnreadMessageCountText
} from './styles';
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';

// -----------------------------------------------------------------------------
const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy", { locale: pt });

export default function TaskUser({ data, navigation }) {
  const dispatch = useDispatch();
  const updated_tasks = useSelector( state => state.task.tasks)

  const [toggleTask, setToggleTask] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [statusResult, setStatusResult] = useState(0);
  const today = new Date();
  const dueDate = parseISO(data.due_date);
  const subTasks = data.sub_task_list

  useEffect (() => {
    // handleStatus()
    setStatusResult(handleStatus())
  }, [ updated_tasks ])

  function handleStatus() {
    let weige = 0;
    subTasks.map(s => {
      if(s.complete === true) {
        weige = weige + s.weige_percentage
      }
    })
    return Math.round(weige);
  }

  const pastDueDate = () => {
    let flag = false;
    today > dueDate ? flag = true : flag = false
    return flag
  }

  async function updateBell(editedSubTaskList) {
    await api.put(`tasks/${data.id}`, {
      sub_task_list: editedSubTaskList
    })
  }

  function handleToggleTask() {
    setToggleTask(!toggleTask)
    // console.tron.log(data)
    if(hasUnreadSubTasks(data.sub_task_list) !== 0) {
      const editedSubTaskList = data.sub_task_list
      editedSubTaskList.map(e => {
        e.user_read = true
      })
      updateBell(editedSubTaskList)
    }
    return
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
  }

  function handleCancelTask() {
    api.delete(`tasks/${data.id}`);
    dispatch(updateTasks(new Date()))
  }

  function handleScoreTask() {

  }

  // function handleConfirm() {
  //   navigation.navigate('Confirm', { task_id: data.id, taskName: data.name });
  // }

  const hasUnreadSubTasks = (array) => {
    try {
      let sum = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i].user_read === false) {
          sum += 1
        }
      }
      return sum
    } catch(error) {
      return
    }
  }

  const hasUnreadMessages = (array) => {
    try {
      let sum = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i].user_read === false) {
          sum += 1
        }
      }
      return sum
    } catch(error) {
      return
    }
  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <TouchableOpacity onPress={handleToggleTask}>
        <TopHeaderView>
          <AlignView>
            <TitleView>
              <TitleIcon name="clipboard" pastDueDate={pastDueDate()}/>
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
                  <InnerStatusView
                    statusResult={statusResult}
                    style={{ width: `${statusResult}%`}}
                  ></InnerStatusView>
                </OuterStatusView>
                <StartTime>{statusResult}%</StartTime>
              </BottomHeaderView>
            </AlignBottomView>
          </MainHeaderView>
          <AsideView>
            <AlignView>
              { (hasUnreadSubTasks(data.sub_task_list) === 0)
                ? (
                  null
                )
                : (
                  <BellIcon name="bell">
                    <UnreadMessageCountText>{hasUnreadSubTasks(data.sub_task_list)}</UnreadMessageCountText>
                  </BellIcon>
                )
              }
              { (hasUnreadMessages(data.messages) === 0)
                ? (
                  null
                )
                : (
                  <BellIcon name="message-circle">
                    <UnreadMessageCountText>{hasUnreadMessages(data.messages)}</UnreadMessageCountText>
                  </BellIcon>
                )
              }
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
                        disabled={true}
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
                  <TaskIcon name="message-circle"/>
                </ConfirmButton>
              </TouchableOpacity>
            </ButtonView>
            <ButtonView>
              <TouchableOpacity onPress={handleEditTask}>
                <ConfirmButton pastDueDate={pastDueDate()}>
                  <TaskIcon name="edit"/>
                </ConfirmButton>
              </TouchableOpacity>
            </ButtonView>
            <ButtonView>
              <TouchableOpacity onPress={handleScoreTask}>
                <ConfirmButton pastDueDate={pastDueDate()}>
                  <TaskIcon name="meh"/>
                </ConfirmButton>
              </TouchableOpacity>
            </ButtonView>
            <ButtonView>
              <TouchableOpacity onPress={handleCancelTask}>
                <ConfirmButton pastDueDate={pastDueDate()}>
                  <TaskIcon name="trash-2"/>
                </ConfirmButton>
              </TouchableOpacity>
            </ButtonView>
          </DatesAndButtonView>
        </>
      )}
    </Container>
  );
}
