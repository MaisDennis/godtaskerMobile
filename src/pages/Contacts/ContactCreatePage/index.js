import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native'
// -----------------------------------------------------------------------------
import {
  Container, FormScrollView, ItemWrapperView, LabelText,
  Input,  SubmitView, AlignView, SubmitIcon,  PhoneMask
} from './styles'
import { updateContacts } from '~/store/modules/contact/actions';
import api from '~/services/api';

export default function ContactCreatePage({ navigation }) {
  const userId = useSelector( state => state.user.profile.id)
  const dispatch = useDispatch();

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
    dispatch(updateContacts(new Date()))
    navigation.goBack()
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
            placeholder="Edson"
            placeholderTextColor='#ccc'
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Sobrenome:</LabelText>
          <Input
            value={lastName}
            onChangeText={setLastName}
            placeholder="Arantes de Nascimento"
            placeholderTextColor='#ccc'
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Conhecido como (nome ou apelido para delegar tarefas):</LabelText>
          <Input
            value={workerName}
            onChangeText={setWorkerName}
            placeholder="Pelé"
            placeholderTextColor='#ccc'
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Departamento:</LabelText>
          <Input
            value={department}
            onChangeText={setDepartment}
            placeholder="RH"
            placeholderTextColor='#ccc'
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
            placeholder="(10)  91010-1010"
            returnKeyType="next"
            value={phonenumber}
            onChangeText={setPhonenumber}
            placeholderTextColor={'#999'}
            placeholderTextColor='#ccc'
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
