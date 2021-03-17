/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
// -----------------------------------------------------------------------------
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/Feather';
// import Button from '~/components/Button';
import {
  AsideView, AlignBottomView, AlignView, AlignCheckBoxView, AcceptButton,
  ButtonView, ButtonText, BottomHeaderView, BellIcon, ButtonIcon,
  ConfirmButton, CheckBoxView, Container,
  DescriptionView, DescriptionBorderView, DescriptionSpan,
  DatesAndButtonView, DueTimeView, DueTime,
  HeaderView, HrLine, HrTitleLine,
  Image, ImageView, ImageWrapper, InnerStatusView,
  Label, LabelInitiated, LabelEnded,
  ModalView, ModalText, MessageButton, MiddleHeaderView, MainHeaderView,
  NameText,
  OuterStatusView,
  RejectTaskInput, RejectButton,
  StartTimeView, StartTime,
  TopHeaderView, TagView, TitleView, TaskIcon, TitleText,
  UnreadMessageCountText, UserView,
} from './styles';
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';
// import message from '../../store/modules/message/reducer';
// import firebase from '~/services/firebase'
// -----------------------------------------------------------------------------
const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy", { locale: pt });

export default function Task({ data, navigation, taskConditionIndex }) {
  const dispatch = useDispatch();

  const [toggleTask, setToggleTask] = useState();
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false);
  const [rejectTaskInputValue, setRejectTaskInputValue] = useState();
  const [updateStatus, setUpdateStatus] = useState();
  const [messageBell, setMessageBell] = useState();

  const[statusResult, setStatusResult] = useState(0);

  const dueDate = parseISO(data.due_date);
  const subTasks = data.sub_task_list

  useEffect (() => {
    handleMessageBell()
  }, [data])

  useMemo(() => {
    return handleStatus()
  }, [updateStatus]);

  async function handleMessageBell() {
    // const response = await api.get(`messages/${data.message_id}`)
    // setMessageBell(response.data.messages)

    const unsubscribe = firestore()
      .collection(`messages/task/${data.id}`)
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(d => ({
          ...d.data(),
        }));
        // lastMessageRef.current.scrollToEnd({ animated: false })
        setMessageBell(data)
      })
    return unsubscribe;
  }

  async function handleStatus() {
    let weige = 0;
    subTasks.map(s => {
      if(s.complete === true) {
        weige = weige + s.weige_percentage
      }
    })

    const response = await api.put(`tasks/${data.id}`, {
      status_bar: Math.round(weige)
    })
    setStatusResult(response.data.status_bar)
    // return Math.round(weige);
    return;
  }

  const pastDueDate = () => {
    let flag = false;
    new Date() > dueDate ? flag = true : flag = false
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
        e.worker_read = true
      })
      updateBell(editedSubTaskList)
    }
  }

  async function handletoggleCheckBox(value, position) {
    const editedSubTaskList = data.sub_task_list
    editedSubTaskList[position].complete = value
    editedSubTaskList[position].user_read = false

    await api.put(`tasks/${data.id}`, {
      sub_task_list: editedSubTaskList,
    })
    dispatch(updateTasks(new Date()))
    setUpdateStatus(new Date())
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
      messages: data.messages,
      avatar: data.user.avatar,
    });
  }

  function handleConfirm() {
    if(data.confirm_photo) {
      navigation.navigate('Confirm', {
        task_id: data.id, taskName: data.name
      });
    } else {
      setToggleConfirmModal(!toggleConfirmModal)
    }
  }

  async function handleConfirmWithoutPhoto() {
    await api.put(`tasks/confirm/${data.id}`);
    setToggleConfirmModal(!toggleConfirmModal)
    dispatch(updateTasks(new Date()))
  }

  async function handleToggleAccept() {
    // setToggleAccept(!toggleAccept)
    await api.put(`tasks/${data.id}/notification/worker`, {
      status: {
        status: 2,
        comment: `Accepted on ${new Date()}`,
      },
      initiated_at: new Date(),
    })
    dispatch(updateTasks(new Date()))
  }

  async function handleCancelTask() {
    await api.put(`tasks/${data.id}/notification/worker`, {
      status: {
        status: 4,
        canceled_by: "worker",
        comment: `Declined. Comment: ${rejectTaskInputValue}`,
      },
      canceled_at: new Date(),
    });
    setToggleModal(!toggleModal)
    dispatch(updateTasks(new Date()))
  }

  const hasUnread = (array) => {
    try {
      let sum = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i].worker_read === false) {
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
    <Container
      taskConditionIndex={taskConditionIndex}
      // toggleTask={toggleTask}
    >
      <TouchableOpacity onPress={handleToggleTask}>
        <TopHeaderView taskConditionIndex={taskConditionIndex}>
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
                    { data.status && data.status.status !== 1 && (
                      <CheckBox
                        disabled={false}
                        value={s.complete}
                        onValueChange={
                          (newValue) => handletoggleCheckBox(newValue, index)
                        }
                      />
                    )}
                    <DescriptionSpan>{s.weige_percentage}%</DescriptionSpan>
                    <DescriptionSpan type="check-box">{s.description}</DescriptionSpan>
                  </CheckBoxView>
                </AlignCheckBoxView>
              ))}
            </DescriptionBorderView>
          </DescriptionView>
                <DatesAndButtonView>
                  <UserView>
                    <Label>Confirmação com foto?</Label>
                    { data.confirm_photo
                      ? <NameText>Sim</NameText>
                      : <NameText>Não</NameText>
                    }
                  </UserView>
                </DatesAndButtonView>
          { data.status && data.status.status !== 1
            ? (
              <DatesAndButtonView>
                <ButtonView>
                  <TouchableOpacity onPress={handleMessage}>
                    <ConfirmButton>
                      <ButtonIcon name="message-circle"/>
                    </ConfirmButton>
                  </TouchableOpacity>
                </ButtonView>
                {/* { taskConditionIndex === 2
                  ? (
                    <ButtonView>
                      <TouchableOpacity onPress={handleConfirm}>
                        <ConfirmButton>
                          <ButtonIcon name="meh"/>
                        </ConfirmButton>
                      </TouchableOpacity>
                    </ButtonView>
                  )
                  : (
                    null
                  )

                } */}
                { taskConditionIndex === 1
                  ? (
                    <ButtonView>
                      <TouchableOpacity onPress={handleConfirm}>
                        <ConfirmButton>
                          <ButtonIcon name="check-circle"/>
                        </ConfirmButton>
                      </TouchableOpacity>
                    </ButtonView>
                  )
                  : (
                    <ButtonView>
                      <TouchableOpacity>
                        <ConfirmButton>
                          <ButtonIcon name="trash-2" style={{color: '#ccc'}}/>
                        </ConfirmButton>
                      </TouchableOpacity>
                    </ButtonView>
                  )

                }
              </DatesAndButtonView>
            )
            : (
              <DatesAndButtonView>
                { taskConditionIndex === 1
                  ? (
                    <>
                      <ButtonView>
                        <TouchableOpacity onPress={handleToggleAccept}>
                          <AcceptButton>
                            <ButtonText>Aceitar</ButtonText>
                          </AcceptButton>
                        </TouchableOpacity>
                      </ButtonView>
                      <ButtonView>
                        <TouchableOpacity onPress={() => setToggleModal(!toggleModal)}>
                          <RejectButton>
                          <ButtonText>Recusar</ButtonText>
                          </RejectButton>
                        </TouchableOpacity>
                      </ButtonView>
                    </>
                  )
                  : (
                    null
                  )
                }

              </DatesAndButtonView>
            )
          }
          { data.signature &&
            <ImageWrapper>
              <Label>Foto de confirmação:</Label>
              <ImageView>
                <Image source={{ uri: data.signature.url }}/>
              </ImageView>
            </ImageWrapper>
          }
          <Modal isVisible={toggleModal}>
            <ModalView>
              <ModalText>Tem certeza de que quer recusar a tarefa?</ModalText>
                {/* <DescriptionBorderView pastDueDate={pastDueDate()}> */}
                  <RejectTaskInput
                    placeholder="Comentário"
                    value={rejectTaskInputValue}
                    onChangeText={setRejectTaskInputValue}
                    mutiline={true}
                    // numberOfLines={5}
                  />
                {/* </DescriptionBorderView> */}
              <DatesAndButtonView>


                <ButtonView>
                  <TouchableOpacity onPress={handleCancelTask}>
                    <AcceptButton>
                      <ButtonText>Sim</ButtonText>
                    </AcceptButton>
                  </TouchableOpacity>
                </ButtonView>
                <ButtonView>
                  <TouchableOpacity onPress={() => setToggleModal(!toggleModal)}>
                    <RejectButton>
                    <ButtonText>Voltar</ButtonText>
                    </RejectButton>
                  </TouchableOpacity>
                </ButtonView>
              </DatesAndButtonView>
            </ModalView>

          </Modal>
          <Modal isVisible={toggleConfirmModal}>
            <ModalView>
              <ModalText>Tem certeza de que deseja confirmar e finalizar a tarefa?</ModalText>
                {/* <DescriptionBorderView pastDueDate={pastDueDate()}> */}
                {/* </DescriptionBorderView> */}
              <DatesAndButtonView>
                <ButtonView>
                  <TouchableOpacity onPress={handleConfirmWithoutPhoto}>
                    <MessageButton>
                      <ButtonText>Sim</ButtonText>
                    </MessageButton>
                  </TouchableOpacity>
                </ButtonView>
                <ButtonView>
                  <TouchableOpacity onPress={() => setToggleConfirmModal(!toggleConfirmModal)}>
                    <MessageButton>
                    <ButtonText>Voltar</ButtonText>
                    </MessageButton>
                  </TouchableOpacity>
                </ButtonView>
              </DatesAndButtonView>
            </ModalView>

          </Modal>
        </>
      )}
    </Container>
  );
}
