import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native'
import { Container,   List,
  HeaderTabView, SearchBarTextInput, Title3 } from './styles'
import Contacts from '~/components/Contacts'
import api from '~/services/api';

export default function ContactsPage({ navigation, route }) {
  const userId = useSelector( state => state.user.profile.id)
  const [contacts, setContacts] = useState([]);
  const [defaultContacts, setDefaultContacts] = useState([]);
  const [ queryInput, setQueryInput ] = useState([]);
  const [inputState, setInputState] = useState('');

  useEffect(() => {
    loadContacts(userId);
    // console.tron.log(userId)
  }, [ userId ])

  async function loadContacts(userID) {
    const response = await api.get(`users/${userID}/contact-list`, {
    })
    setContacts(response.data)
    setDefaultContacts(response.data)
  }

  const handleUpdateInput = async (input) => {
    const filteredList = defaultContacts.filter(c => {
      let contactName = c.first_name + c.last_name + c.worker_name
      return contactName.toLowerCase().includes(input.toLowerCase())
    })
    setContacts(filteredList)
    setInputState(input)
  }

  const renderItem = ({ item, index }) => (
    <Contacts key={index} data={item} navigation={navigation}/>
  );

  return (
    <Container>
    <HeaderTabView>
          <SearchBarTextInput
            value={inputState}
            onChangeText={handleUpdateInput}
          ></SearchBarTextInput>
    </HeaderTabView>
      <List
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
      />
    </Container>
  )
}
