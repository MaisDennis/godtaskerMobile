import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
// -----------------------------------------------------------------------------
import { Container, FormScrollView, ItemWrapperView, LabelText,
  Input, SubTaskView, SubTaskLabelText, SubTaskInput,
  DateInput, DateOptionsView, DateOptions, Options, TitleText,
  SubmitView, AlignView, SubmitIcon, AlignCheckBoxView, CheckBoxWrapper, CheckBoxView, DescriptionSpan,
ModalButtonWrapper
} from './styles'
import { parseISO, format } from 'date-fns';
import api from '~/services/api';
// import { ptBR } from 'date-fns/locale';


export default function TaskCreatePage() {
  const userId = useSelector( state => state.user.profile.id)
  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  // const [subTaskList, setSubTaskList] = useState();
  const [prior, setPrior] = useState("");
  const [urgent, setUrgent] = useState("");
  const [complex, setComplex] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [contacts, setContacts] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [toggleModal, setToggleModal] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  let editedWorkers = [];

  const taskAttributesArray = [ "baixa", "média", "alta", "" ]
  useEffect(() => {
    loadContacts(userId);
    // console.tron.log(editedWorkers)

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
    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    console.tron.log(editedWorkers)
    return
  }

  function handleSubmit() {
    try {
      contacts.map(p => {
        if(p.checked == true) {
          api.post('/tasks', [
            {
              name: name,
              description: description,
              sub_task_list: [],
              task_attributes: [prior, urgent, complex],
              start_date: startDate,
              due_date: dueDate,
              workerphonenumber: p.phonenumber,
            }, userId
          ]);
        }
        return p;
      })
      setToggleModal(!toggleModal)
      setName("");  setDescription(""); setPrior(""); setUrgent("")
      setComplex(""); setStartDate(new Date()); setDueDate(new Date());
    } catch(error) {
      setSubmitError(true)
    }

  }

  function handleToggleModal() {
    setToggleModal(!toggleModal)
  }

    // ---------------------------------------------------------------------------
  return (
    <Container>
      <FormScrollView contentContainerStyle={{ alignItems: 'center'}}>
        <Modal isVisible={toggleModal}>
          { submitError
            ? (
              <ItemWrapperView>
                <Text> Error </Text>
              </ItemWrapperView>
            )
            : (
              <ItemWrapperView>
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
              </ItemWrapperView>
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
        <ItemWrapperView>
          <LabelText>Sub-tarefas:</LabelText>
          {/* { subTaskList.map((s, index) => (
            <SubTaskView key={index}>
              <SubTaskLabelText>{index+1}</SubTaskLabelText>
              <SubTaskInput
              value={s.description}
                  // onChangeText={setDescription}
              ></SubTaskInput>
            </SubTaskView>
          ))} */}
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
              <Options.Item key={t} label={t} value={t}/>
            ))}
          </Options>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Urgência:</LabelText>
          <Options selectedValue={urgent} onValueChange={setUrgent}>
            { taskAttributesArray.map(t => (
              <Options.Item key={t} label={t} value={t}/>
            ))}
          </Options>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Complexidade:</LabelText>
          <Options selectedValue={complex} onValueChange={setComplex}>
            { taskAttributesArray.map(t => (
              <Options.Item key={t} label={t} value={t}/>
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
      </FormScrollView>
    </Container>
  )
}
