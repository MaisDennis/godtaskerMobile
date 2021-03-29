import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Alert, TouchableOpacity } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
// -----------------------------------------------------------------------------
import {
  AlignView, AddSubTaskIcon, AlignCheckBoxView,
  CheckBoxWrapper, CheckBoxView, Container,
  DateOptionsView, DateOptions, DescriptionSpan,
  FormScrollView,
  ItemWrapperView, Input,
  LabelText,
  ModalButtonWrapper, ModalView,
  Options,
  SubTaskLabelText, SubTaskInput,
  SubTaskText, SubTaskWeigeText, SubTaskIcon, SubTaskButton,
  SubTaskView, SubTaskItemView, SubTaskButtonView,
  SubmitView, SubmitIcon,
  TextWeigeView,
  WeigeView, WeigeTagView, WeigeText, WeigeButton,
} from './styles'
import NumberInput from '~/components/NumberInput'
import { updateTasks } from '~/store/modules/task/actions';
import { updateMessagesRequest } from '~/store/modules/message/actions';
import api from '~/services/api';

export default function TaskCreatePage({ navigation }) {
  const dispatch = useDispatch();
  const userId = useSelector( state => state.user.profile.id)

  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  const [prior, setPrior] = useState(4);
  const [urgent, setUrgent] = useState(4);
  const [complex, setComplex] = useState(4);
  const [confirmPhoto, setConfirmPhoto] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [contacts, setContacts] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [toggleModal, setToggleModal] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [subTaskList, setSubTaskList] = useState([]);
  const [editSubTaskIndex, setEditSubTaskIndex] = useState();
  const [toggleAddSubTask, setToggleAddSubTask] = useState(false);
  const [addSubTaskInputValue, setAddSubTaskInputValue] = useState();
  const [addWeigeInputValue, setAddWeigeInputValue] = useState(1);
  const [editSubTaskInputValue, setEditSubTaskInputValue] = useState();
  const [editWeigeInputValue, setEditWeigeInputValue] = useState(1);
  const [subTaskToggleEdit, setSubTaskToggleEdit] = useState(false);

  let editedWorkers = [];
  const taskAttributesArray = [
    { id: 1, tag: 'baixa'},
    { id: 2, tag: 'média'},
    { id: 3, tag: 'alta'},
    { id: 4, tag: ''},
  ]

  const confirmPhotoArray = [
    { id: true, tag: 'Sim'},
    { id: false, tag: 'Não'}
  ]

  useEffect(() => {
    loadContacts(userId);
  }, [ userId ])

  async function loadContacts(userID) {
    const response = await api.get(`users/${userID}/contact-list`, {
    })
    const checkedList = response.data
    checkedList.forEach(c => {
      c.checked = false;
    });
    setContacts(checkedList)
  }

  async function handletoggleCheckBox(value, position) {
    setToggleCheckBox(!toggleCheckBox) // this distoggles the checkbox
    editedWorkers = contacts;
    const editedWorker = editedWorkers.find((e, index) => index === position)
    editedWorker.checked = value
    editedWorkers[position] = editedWorker
    setContacts(editedWorkers)
    return
  }

  function handleToggleModal() {
    setToggleModal(!toggleModal)
  }

  function handleAddSubTask() {
    let editedSubTaskList = subTaskList
    const sub_task_id = Math.floor(Math.random() * 1000000)
    editedSubTaskList.push({
      id: sub_task_id,
      description: addSubTaskInputValue,
      weige: editWeigeInputValue,
      complete: false,
      user_read: true,
      worker_read: false,
    })
    setSubTaskList(editedSubTaskList)
    setAddSubTaskInputValue();
    // console.log(subTaskList)
    navigation.navigate('TaskCreate');
    // dispatch(updateTasks(new Date()))
  }

  function handleOpenEditSubTask(position) {
    setEditSubTaskIndex(position)
    setSubTaskToggleEdit(!subTaskToggleEdit)
    setEditSubTaskInputValue(subTaskList[position].description)
    setEditWeigeInputValue(subTaskList[position].weige)
  }

  function handleEditSubTask(position) {
    let editedSubTaskList = subTaskList.map((s, index) => {
      if (index === position) {
        s.description = editSubTaskInputValue;
        s.weige = editWeigeInputValue;
      }
      return s;
    })
    setSubTaskList(editedSubTaskList)
    setEditSubTaskIndex(null);
    setSubTaskToggleEdit(false);
    // navigation.navigate('TaskEdit',{
    //   sub_task_list: subTaskList,
    // });
  }

  function handleDeleteSubTask(position) {
    let editedSubTaskList = subTaskList
    editedSubTaskList.splice(position, 1)
    setSubTaskList(editedSubTaskList)
    navigation.navigate('TaskCreate',{
      sub_task_list: subTaskList,
    });
  }

  function weigeToPercentage(subTasks) {
    let weigeSum = 0;
    for(let i = 0; i < subTasks.length; i++) {
      weigeSum += parseFloat(subTasks[i].weige)
    }

    for(let i = 0; i < subTasks.length; i++) {
      subTasks[i].weige_percentage = (Math.round((parseFloat(subTasks[i].weige) / weigeSum)*1000) /10)
    }
    return weigeSum;
  }

  async function createTasks(c) {
    weigeToPercentage(subTaskList)

    await api.post('/tasks', [
      {
        name: name,
        description: description,
        sub_task_list: subTaskList,
        task_attributes: [prior, urgent, complex],
        status: {
          status: 1,
          comment: new Date(),
        },
        confirm_photo: confirmPhoto,
        start_date: startDate,
        due_date: dueDate,
        messaged_at: new Date(),
        workerphonenumber: c.phonenumber,
      }, userId
    ]);
    dispatch(updateTasks(new Date()))
    dispatch(updateMessagesRequest(new Date()))
    setToggleModal(!toggleModal)
  }

  function handleSubmit() {
    try {
      contacts.map(c => {
        if(c.checked == true) createTasks(c)
        return c;
      })
      Alert.alert('Tarefa cadastrada com sucesso!')
    } catch(error) {
      setSubmitError(true)
      Alert.alert('Erro ao cadastrar a tarefa.')
    }
    // dispatch(updateTasks(new Date()))
    navigation.goBack()
  }
  // ---------------------------------------------------------------------------
  return (
    <Container>
      <FormScrollView contentContainerStyle={{ alignItems: 'center'}}>
        <ItemWrapperView>
          <LabelText>Tarefa:</LabelText>
          <Input
            value={name}
            onChangeText={setName}
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Descrição:</LabelText>
          <Input
            value={description}
            onChangeText={setDescription}
          ></Input>
        </ItemWrapperView>
        {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}
        <ItemWrapperView>
          <LabelText>Adicionar sub-tarefa:</LabelText>
          <SubTaskView>
            <TextWeigeView>
              <SubTaskInput
                value={addSubTaskInputValue}
                onChangeText={setAddSubTaskInputValue}
                mutiline={true}
                numberOfLines={5}
                textBreakStrategy="highQuality"
              />
              <WeigeView>
                <WeigeTagView>
                  <WeigeText>Peso:</WeigeText>
                  <NumberInput
                    numberInputValue={addWeigeInputValue}
                    setNumberInputValue={setAddWeigeInputValue}
                  />
                </WeigeTagView>
                <WeigeButton onPress={handleAddSubTask}>
                  <AddSubTaskIcon name="check-circle" size={55}/>
                </WeigeButton>
              </WeigeView>
            </TextWeigeView>

          </SubTaskView>
          <LabelText>Sub-tarefas:</LabelText>
          { subTaskList.map((s, index) => (
            <SubTaskView key={index}>
              {
                subTaskToggleEdit && (editSubTaskIndex === index)
                ? (
                  <SubTaskItemView>
                    <SubTaskView>
                    <SubTaskLabelText>{index+1}</SubTaskLabelText>
                    <SubTaskText>{s.description}</SubTaskText>
                    </SubTaskView>
                    <WeigeView>
                      <WeigeTagView>
                        <WeigeText>Peso:</WeigeText>
                        <SubTaskWeigeText>{s.weige}</SubTaskWeigeText>
                      </WeigeTagView>
                      <SubTaskButtonView>
                        <SubTaskButton onPress={() => handleOpenEditSubTask(index)}>
                          <SubTaskIcon name="edit"/>
                        </SubTaskButton>
                        <SubTaskButton onPress={() => handleDeleteSubTask(index)}>
                          <SubTaskIcon name="x-circle"/>
                        </SubTaskButton>
                      </SubTaskButtonView>
                    </WeigeView>
                    <SubTaskView>
                      <TextWeigeView>
                        <SubTaskInput
                          value={editSubTaskInputValue}
                          onChangeText={setEditSubTaskInputValue}
                          mutiline={true}
                        />
                        <WeigeView>
                          <WeigeTagView>
                            <WeigeText>Peso:</WeigeText>
                            <NumberInput
                              numberInputValue={editWeigeInputValue}
                              setNumberInputValue={setEditWeigeInputValue}
                            />
                          </WeigeTagView>
                          <WeigeButton onPress={() => handleEditSubTask(index)}>
                            <AddSubTaskIcon name="check-circle" size={55}/>
                          </WeigeButton>
                        </WeigeView>
                      </TextWeigeView>
                    </SubTaskView>
                  </SubTaskItemView>
                )
                : (
                  <SubTaskItemView>
                    <SubTaskView>
                      <SubTaskLabelText>{index+1}</SubTaskLabelText>
                      <SubTaskText>{s.description}</SubTaskText>
                    </SubTaskView>
                    <WeigeView>
                      <WeigeTagView>
                        <WeigeText>Peso:</WeigeText>
                        <SubTaskWeigeText>{s.weige}</SubTaskWeigeText>
                      </WeigeTagView>
                      <SubTaskButtonView>
                        <SubTaskButton onPress={() => handleOpenEditSubTask(index)}>
                          <SubTaskIcon name="edit"/>
                        </SubTaskButton>
                        <SubTaskButton onPress={() => handleDeleteSubTask(index)}>
                          <SubTaskIcon name="x-circle"/>
                        </SubTaskButton>
                      </SubTaskButtonView>
                    </WeigeView>
                  </SubTaskItemView>
                )
              }
            </SubTaskView>
          ))}
          <LabelText>(não esquecer de confirmar as alterações em sub-tarefas para que sejam salvas)</LabelText>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Início:</LabelText>
          <DateOptionsView>
            <DateOptions
              date={startDate}
              onDateChange={setStartDate}
              locale='pt'
              is24hourSource='locale'
              androidVariant="nativeAndroid"
              textColor="#666"
              textSize="30"
            />
          </DateOptionsView>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Prazo:</LabelText>
          <DateOptionsView>
            <DateOptions
              date={dueDate}
              onDateChange={setDueDate}
              locale='pt'
              is24hourSource='locale'
              androidVariant="nativeAndroid"
              textColor="#666"
              textSize="30"
            />
          </DateOptionsView>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Prioridades:</LabelText>
          <Options selectedValue={prior} onValueChange={setPrior}>
            { taskAttributesArray.map(t => (
              <Options.Item key={t.id} label={t.tag} value={t.id}/>
            ))}
          </Options>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Urgência:</LabelText>
          <Options selectedValue={urgent} onValueChange={setUrgent}>
            { taskAttributesArray.map(t => (
              <Options.Item key={t.id} label={t.tag} value={t.id}/>
            ))}
          </Options>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Complexidade:</LabelText>
          <Options selectedValue={complex} onValueChange={setComplex}>
            { taskAttributesArray.map(t => (
              <Options.Item key={t.id} label={t.tag} value={t.id}/>
            ))}
          </Options>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Requer foto de confirmação ao completar a tarefa?</LabelText>
          <Options selectedValue={confirmPhoto} onValueChange={setConfirmPhoto}>
            { confirmPhotoArray.map(t => (
              <Options.Item key={t.id} label={t.tag} value={t.id}/>
            ))}
          </Options>
        </ItemWrapperView>
        <TouchableOpacity onPress={handleToggleModal}>
          <ItemWrapperView>
            <SubmitView>
              <AlignView>
                <SubmitIcon name="arrow-right" size={20} color="#fff" />
              </AlignView>
            </SubmitView>
          </ItemWrapperView>
        </TouchableOpacity>
        <Modal isVisible={toggleModal}>
          { submitError
            ? (
              <ModalView>
                <Text> Error </Text>
              </ModalView>
            )
            : (
              <ModalView>
                <LabelText>Funcionário(s):</LabelText>
                <CheckBoxWrapper>
                  { contacts.map((c, index) => (
                    <AlignCheckBoxView key={index}>
                      <CheckBoxView>
                        <CheckBox
                          disabled={false}
                          // value={editedWorkers[index]}
                          value={c.checked}
                          onValueChange={
                            (newValue) => handletoggleCheckBox(newValue, index)
                          }
                        />
                        <DescriptionSpan type="check-box">{c.worker_name}</DescriptionSpan>
                      </CheckBoxView>
                    </AlignCheckBoxView>
                  ))}
                </CheckBoxWrapper>
              </ModalView>
            )
          }
          <ModalButtonWrapper>
            <TouchableOpacity onPress={handleToggleModal}>
              <ItemWrapperView>
                <SubmitView>
                  <AlignView>
                    <SubmitIcon name="arrow-left" size={20} color="#fff" />
                  </AlignView>
                </SubmitView>
              </ItemWrapperView>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
              <ItemWrapperView>
                <SubmitView>
                  <AlignView>
                    <SubmitIcon name="send" size={20} color="#fff" />
                  </AlignView>
                </SubmitView>
              </ItemWrapperView>
            </TouchableOpacity>
          </ModalButtonWrapper>
        </Modal>
      </FormScrollView>
    </Container>
  )
}
