/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import CheckBox from '@react-native-community/checkbox'; //https://github.com/react-native-checkbox/react-native-checkbox
import firestore from '@react-native-firebase/firestore';
import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import {
  AsideView, AlignBottomView, AlignView, AlignCheckBoxView,
  ButtonView, BottomHeaderView,
  BellIcon, ButtonWrapper,
  ConfirmButton, CheckBoxView, Container,
  DescriptionView, DescriptionBorderView, DescriptionSpan,
  DatesAndButtonView, DueTimeView, DueTime, DetailsView,
  HeaderView, HrLine, HrTitleLine,
  Image, ImageView, ImageWrapper, InnerStatusView,
  Label, LabelInitiated, LabelEnded,
  MiddleHeaderView, MainHeaderView,
  NameText,
  OuterStatusView,
  StartTimeView, StartTime,
  TopHeaderView, TagView, TitleView, TaskIcon, TitleIcon,
  TitleText, TaskAttributesView,
  UserView, UnreadMessageCountText, UserImage, UserImageBackground,
} from './styles';
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';
// import message from '../../store/modules/message/reducer';
// -----------------------------------------------------------------------------
const taskAttributesArray = [ 'baixa', 'média', 'alta', '-']
const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy", { locale: pt });

const formattedDateTime = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy HH:mm", { locale: pt });

  export default function TaskUser({ data, navigation, taskConditionIndex }) {
  const dispatch = useDispatch();
  const workerData = data.worker

  const updated_tasks = useSelector( state => state.task.tasks)

  const [toggleTask, setToggleTask] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [statusResult, setStatusResult] = useState(0);
  const [messageBell, setMessageBell] = useState();

  const dueDate = parseISO(data.due_date);
  const subTasks = data.sub_task_list

  useEffect (() => {
    // handleStatus()
    handleMessageBell()
    setStatusResult(handleStatus())
    // console.log(data)
  }, [ updated_tasks ])

  async function handleMessageBell() {
    // const response = await api.get(`messages/${data.message_id}`)
    // setMessageBell(response.data.messages)

    const unsubscribe = firestore()
      .collection(`messages/task/${data.id}`)
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        try {
          const data = querySnapshot.docs.map(d => ({
            ...d.data(),
          }));
          // console.log(data)
          // lastMessageRef.current.scrollToEnd({ animated: false })
          setMessageBell(data)
        }
        catch {
          console.log('Error from querySnapshot')
        }

      })
    return unsubscribe;

  }

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
    new Date() > dueDate ? flag = true : flag = false
    return flag
  }

  async function updateBell(editedSubTaskList) {
    try {
      // await api.put(`tasks/${data.id}`, {
      //   sub_task_list: editedSubTaskList
      // })
    }
    catch(error) {
      console.log('error in put tasks/:id')
    }

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
    // await api.put(`tasks/${data.id}`, {
    //   sub_task_list: editedSubTaskList
    // })
    return
  }

  function handleMessage() {
    navigation.navigate('MessagesConversationPage', {
      id: data.id,
      user_id: data.user.id,
      user_name: data.user.user_name,
      worker_id: data.worker.id,
      worker_name: data.worker.worker_name,
      worker_phonenumber: data.workerphonenumber,
      message_id: data.message_id,
      messages: data.messageBell,
      avatar: data.worker.avatar,
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
    // api.put(`tasks/${data.id}`);
    setToggleTask(!toggleTask)
    dispatch(updateTasks(new Date()));
  }

  function handleCancelTask() {
    // api.delete(`tasks/${data.id}`);
    setToggleTask(!toggleTask)
    dispatch(updateTasks(new Date()));
  }

  function handleScoreTask() {

  }

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
                    <Label>De:</Label>
                    { workerData === undefined || workerData.avatar === null
                      ? (
                        <UserImage/>
                        // <SenderText>Hi</SenderText>
                      )
                      : (
                        <UserImageBackground>
                        <UserImage source={{ uri: workerData.avatar.url }}/>
                        </UserImageBackground>
                      )
                    }
                    <NameText>{data.worker.worker_name}</NameText>
                  </UserView>
                </DatesAndButtonView>
                <DatesAndButtonView>
                  <TagView>
                    { data.initiated_at
                      ? (
                        <>
                          <LabelInitiated>Iniciado!</LabelInitiated>
                          <StartTimeView>
                            <StartTime>{formattedDate(data.initiated_at)}</StartTime>
                          </StartTimeView>
                        </>
                      )
                      : (
                        <>
                          <Label>Início:</Label>
                          <StartTimeView initiated={data.initiated_at}>
                            <StartTime>{formattedDate(data.start_date)}</StartTime>
                          </StartTimeView>
                        </>
                      )
                    }
                  </TagView>
                  <TagView>
                    { data.end_date
                      ? (
                        <>
                          <LabelEnded pastDueDate={pastDueDate()}>Finalizou!</LabelEnded>
                          <DueTimeView pastDueDate={pastDueDate()}>
                            <DueTime>{formattedDate(data.end_date)}</DueTime>
                          </DueTimeView>
                        </>
                      )
                      : (
                        <>
                          <Label>Prazo:</Label>
                          <DueTimeView pastDueDate={pastDueDate()}>
                            <DueTime>{formattedDate(data.due_date)}</DueTime>
                          </DueTimeView>
                        </>
                      )
                    }
                  </TagView>
                </DatesAndButtonView>
                <DatesAndButtonView>
                  <TagView>
                    <Label>Prioridade:</Label>
                    <TaskAttributesView taskAttributes={data.task_attributes[0]-1}>
                      <DueTime>{taskAttributesArray[JSON.stringify(data.task_attributes[0]-1)]}</DueTime>
                    </TaskAttributesView>
                  </TagView>
                  <TagView>
                    <Label>Urgência:</Label>
                    <TaskAttributesView taskAttributes={data.task_attributes[1]-1}>
                      <DueTime>{taskAttributesArray[data.task_attributes[1]-1]}</DueTime>
                    </TaskAttributesView>
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
              { (hasUnread(messageBell) === 0)
                ? (
                  null
                )
                : (
                  <BellIcon name="message-circle">
                    <UnreadMessageCountText>{hasUnread(messageBell)}</UnreadMessageCountText>
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
            {/* ------------------------------------------------------------ */}
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
          <DetailsView>
            <TagView>
              <Label>Prazo com horário:</Label>
              <DueTimeView pastDueDate={pastDueDate()}>
                <DueTime>{formattedDateTime(data.due_date)}</DueTime>
              </DueTimeView>
            </TagView>
          </DetailsView>
          <DetailsView>
            <TagView>
              <Label>Complexidade:</Label>
              <TaskAttributesView taskAttributes={data.task_attributes[1]-1}>
                <DueTime>{taskAttributesArray[data.task_attributes[1]-1]}</DueTime>
              </TaskAttributesView>
            </TagView>
          </DetailsView>

          <DetailsView>
            <UserView>
              <Label>Confirmação com foto?</Label>
              <NameText>Sim</NameText>
            </UserView>
          </DetailsView>
          {/* -------------------------------------------------------------- */}
          <HrLine/>

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
            { taskConditionIndex === 1
              ? (
                <ButtonView>
                  <TouchableOpacity onPress={handleCancelTask}>
                    <ConfirmButton>
                      <TaskIcon name="trash-2"/>
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
                  <TouchableOpacity>
                    <ConfirmButton>
                      <TaskIcon
                        name="trash-2"
                        style={{color: '#ccc'}}
                      />
                    </ConfirmButton>
                  </TouchableOpacity>
                </ButtonView>
              )
              : (
                null
              )
            }
          </DatesAndButtonView>
          { data.signature &&
            <ImageWrapper>
              <Label>Foto de confirmação:</Label>
              <ImageView>
                <Image source={{ uri: data.signature.url }}/>
              </ImageView>
            </ImageWrapper>
          }
        </>
      )}
    </Container>
  );
}
