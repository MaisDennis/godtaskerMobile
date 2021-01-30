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
ModalButtonWrapper, PhoneMask
} from './styles'
import { parseISO, format } from 'date-fns';
import api from '~/services/api';
// import { ptBR } from 'date-fns/locale';

export default function ContactCreatePage() {
  const userId = useSelector( state => state.user.profile.id)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [department, setDepartment] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  function handleSubmit() {
    const unmaskPhoneNumber = (
      maskedPhoneNumber => maskedPhoneNumber.replace(/[()\s-]/g, '')
    )
    const unmaskedPhoneNumber = unmaskPhoneNumber(phonenumber)
    const id = Math.floor(Math.random() * 1000000)
    try {
      api.post(`users/${userId}/contact-list`, {
        worker_id: id,
        first_name: firstName,
        last_name: lastName,
        worker_name: workerName,
        department: department,
        phonenumber: unmaskedPhoneNumber,
      })
    } catch(error) {
      console.tron.log(error);
    }
    setFirstName("");  setLastName(""); setWorkerName(""); setDepartment("")
    setPhonenumber("");
  }

    // ---------------------------------------------------------------------------
  return (
    <Container>
      <FormScrollView contentContainerStyle={{ alignItems: 'center'}}>
        <ItemWrapperView>
          <LabelText>Nome:</LabelText>
          <Input
            value={firstName}
            onChangeText={setFirstName}
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Sobrenome:</LabelText>
          <Input
            value={lastName}
            onChangeText={setLastName}
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Conhecido como (nome ou apelido para delegar tarefas):</LabelText>
          <Input
            value={workerName}
            onChangeText={setWorkerName}
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Departamento:</LabelText>
          <Input
            value={department}
            onChangeText={setDepartment}
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Número de Whatsapp:</LabelText>
          <PhoneMask
            type={'cel-phone'}
            options={
              {
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }
            }
            placeholder="Número de Whatsapp"
            returnKeyType="next"
            value={phonenumber}
            onChangeText={setPhonenumber}
            placeholderTextColor={'#999'}
          />
        </ItemWrapperView>
        <TouchableOpacity onPress={handleSubmit}>
          <ItemWrapperView>
            <SubmitView>
              <AlignView>
                <SubmitIcon name="send" size={20} color="#fff" />
              </AlignView>
            </SubmitView>
          </ItemWrapperView>
        </TouchableOpacity>
      </FormScrollView>
    </Container>
  )
}
