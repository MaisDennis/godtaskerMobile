/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
// -----------------------------------------------------------------------------
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/Feather';
// import Button from '~/components/Button';
import {
  AsideView, AlignBottomView, AlignView, AlignCheckBoxView,
  ButtonView, ButtonText, BottomHeaderView, BellIcon, ButtonIcon,
  ConfirmButton, CheckBoxView, Container,
  DescriptionView, DescriptionBorderView, DescriptionSpan,
  DatesAndButtonView, DueTimeView, DueTime,
  HeaderView, HrLine, HrTitleLine,
  InnerStatusView,
  Label,
  ModalView, ModalText, MessageButton, MiddleHeaderView, MainHeaderView,
  NameText,
  OuterStatusView,
  RejectTaskInput,
  StartTimeView, StartTime,
  TopHeaderView, TagView, TitleView, TaskIcon, TitleText,
  UnreadMessageCountText, UserView,
} from './styles';
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';
import message from '../../store/modules/message/reducer';
// -----------------------------------------------------------------------------
const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy", { locale: pt });

export default function Task({ data, navigation, taskConditionIndex }) {
  const dispatch = useDispatch();

  const [toggleTask, setToggleTask] = useState();
  const [toggleModal, setToggleModal] = useState(false);
  const [rejectTaskInputValue, setRejectTaskInputValue] = useState();
  const [updateStatus, setUpdateStatus] = useState();
  const [messageBell, setMessageBell] = useState();

  const[statusBar, setStatusBar] = useState(data.status_bar);

  const today = new Date();
  const dueDate = parseISO(data.due_date);
  const subTasks = data.sub_task_list

  useEffect (() => {
    handleMessageBell()
  }, [data])

  useMemo(() => {
    return handleStatus()
  }, [updateStatus]);

  async function handleMessageBell() {
    const response = await api.get(`messages/${data.message_id}`)
    setMessageBell(response.data.messages)
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
    setStatusBar(response.data.status_bar)
    // return Math.round(weige);

    return;
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
      user_name: data.user.user_name,
      messages: data.messages
    });
  }

  function handleConfirm() {
    navigation.navigate('Confirm', {
      task_id: data.id, taskName: data.name
    });
  }

  async function handleToggleAccept() {
    // setToggleAccept(!toggleAccept)
    await api.put(`tasks/${data.id}`, {
      status: {
        status: 2,
        comment: new Date(),
      },
      initiated_at: new Date(),
    })
    dispatch(updateTasks(new Date()))
  }

  async function handleCancelTask() {
    await api.put(`tasks/${data.id}`, {
      status: {
        status: 4,
        canceled_by: "worker",
        comment: `${rejectTaskInputValue}`,
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
                    <Label>Início:</Label>
                    <StartTimeView>
                      <StartTime pastDueDate={pastDueDate()}>{formattedDate(data.start_date)}</StartTime>
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
                  <InnerStatusView statusResult={statusBar}></InnerStatusView>
                </OuterStatusView>
                <StartTime>{statusBar}%</StartTime>
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
                { taskConditionIndex === 2
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

                }
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
                      <TouchableOpacity onPress={handleConfirm}>
                        <ConfirmButton>
                          <ButtonIcon name="trash-2"/>
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
                          <MessageButton>
                            <ButtonText>Aceitar</ButtonText>
                          </MessageButton>
                        </TouchableOpacity>
                      </ButtonView>
                      <ButtonView>
                        <TouchableOpacity onPress={() => setToggleModal(!toggleModal)}>
                          <MessageButton>
                          <ButtonText>Recusar</ButtonText>
                          </MessageButton>
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
                    <MessageButton>
                      <ButtonText>Sim</ButtonText>
                    </MessageButton>
                  </TouchableOpacity>
                </ButtonView>
                <ButtonView>
                  <TouchableOpacity onPress={() => setToggleModal(!toggleModal)}>
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
