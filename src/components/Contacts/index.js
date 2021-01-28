import React, {  useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native'
// -----------------------------------------------------------------------------
import { Container, Header, Body, ImageView, Image } from './styles'
import api from '~/services/api';

export default function Contacts({ navigation, data }) {
  const userId = useSelector( state => state.worker.workerData.user_id)
  const [contacts, setContacts] = useState([]);
  const [defaultContacts, setDefaultContacts] = useState([]);
  const [ queryInput, setQueryInput ] = useState([]);
  const [inputState, setInputState] = useState('');

  console.tron.log(data)

  function handleContactTasks() {
    navigation.navigate('ContactTasks', {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      worker_name: data.worker_name,
      department: data.department,
      phonenumber: data.phonenumber,
    })
  }

  // function handleEditContact() {
  //   navigation.navigate('EditContact', {
  //     id: data.id,
  //     first_name: data.first_name,
  //     last_name: data.last_name,
  //     worker_name: data.worker_name,
  //     department: data.department,
  //     phonenumber: data.phonenumber,
  //   })
  // }

  function handleEditContact() {
    navigation.navigate('EditContact');
  }

  // ---------------------------------------------------------------------------
  return (
    <Container>
      <Body>
        <ImageView>
          <Image/>
        </ImageView>
        <Text>{data.worker_name}</Text>
        <TouchableOpacity key={`1`} onPress={handleContactTasks}>
          <Text>tarefas</Text>
        </TouchableOpacity>
        <TouchableOpacity key={`2`} onPress={handleEditContact}>
          <Text>editar</Text>
        </TouchableOpacity>
      </Body>
    </Container>
  )
}
