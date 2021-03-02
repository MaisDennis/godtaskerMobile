/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import CheckBox from '@react-native-community/checkbox'; //https://github.com/react-native-checkbox/react-native-checkbox
// -----------------------------------------------------------------------------
import pt from 'date-fns/locale/pt';
import {
  AlignBottomView, AlignView, AsideView, AlignCheckBoxView,
  ButtonView,
  BottomHeaderView, BellIcon,
  Container, ConfirmButton, CheckBoxView,
  DescriptionView, DescriptionBorderView, DescriptionSpan,
  DatesAndButtonView, DueTimeView, DueTime,
  HeaderView, HrTitleLine, HrLine,
  InnerStatusView,
  Label,
  MainHeaderView, MiddleHeaderView,
  NameText,
  OuterStatusView,
  StartTimeView, StartTime,
  TagView, TopHeaderView,  TitleView, TitleIcon, TaskIcon, TitleText,
  UserView, UnreadMessageCountText
} from './styles';
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';

// -----------------------------------------------------------------------------
const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy", { locale: pt });

export default function TaskUser({ data, navigation, taskConditionIndex }) {
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
    if(hasUnread(data.sub_task_list) !== 0) {
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

  function handleMessage() {
    navigation.navigate('MessagesConversationPage', {
      id: data.id,
      user_name: data.user.user_name,
      messages: data.messages
    });
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

  function handleReviveTask() {
    api.put(`tasks/${data.id}`);
    setToggleTask(!toggleTask)
    dispatch(updateTasks(new Date()));
  }

  function handleCancelTask() {
    api.delete(`tasks/${data.id}`);
    setToggleTask(!toggleTask)
    dispatch(updateTasks(new Date()));
  }

  function handleScoreTask() {

  }

  // function handleConfirm() {
  //   navigation.navigate('Confirm', { task_id: data.id, taskName: data.name });
  // }

  const hasUnread = (array) => {
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
    <Container taskConditionIndex={taskConditionIndex}>
      <TouchableOpacity onPress={handleToggleTask}>
        <TopHeaderView taskConditionIndex={taskConditionIndex}>
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
                    colors={['#ffdd33', '#ff892e']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ width: `${statusResult}%`}}
                  ></InnerStatusView>
                </OuterStatusView>
                <StartTime>{statusResult}%</StartTime>
              </BottomHeaderView>
            </AlignBottomView>
          </MainHeaderView>
          <AsideView>
            <AlignView>
              { (hasUnread(data.sub_task_list) === 0)
                ? (
                  null
                )
                : (
                  <BellIcon name="bell">
                    <UnreadMessageCountText>{hasUnread(data.sub_task_list)}</UnreadMessageCountText>
                  </BellIcon>
                )
              }
              { (hasUnread(data.messages) === 0)
                ? (
                  null
                )
                : (
                  <BellIcon name="message-circle">
                    <UnreadMessageCountText>{hasUnread(data.messages)}</UnreadMessageCountText>
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
              <TouchableOpacity onPress={handleMessage}>
                <ConfirmButton>
                  <TaskIcon name="message-circle"/>
                </ConfirmButton>
              </TouchableOpacity>
            </ButtonView>
            { taskConditionIndex === 1
              ? (
                <ButtonView>
                  <TouchableOpacity onPress={handleEditTask}>
                    <ConfirmButton>
                      <TaskIcon name="edit"/>
                    </ConfirmButton>
                  </TouchableOpacity>
                </ButtonView>
              )
              : (
                null
              )
            }
            { taskConditionIndex === 2
              ? (
                <ButtonView>
                  <TouchableOpacity onPress={handleScoreTask}>
                    <ConfirmButton>
                      <TaskIcon name="meh"/>
                    </ConfirmButton>
                  </TouchableOpacity>
                </ButtonView>
              )
              : (
                null
              )
            }
            { taskConditionIndex === 3
              ? (
                <ButtonView>
                  <TouchableOpacity onPress={handleReviveTask}>
                    <ConfirmButton>
                      <TaskIcon name="activity"/>
                    </ConfirmButton>
                  </TouchableOpacity>
                </ButtonView>
              )
              : (
                null
              )
            }
            <ButtonView>
              <TouchableOpacity onPress={handleCancelTask}>
                <ConfirmButton>
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
