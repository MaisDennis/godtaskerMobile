import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import {
  Container, List, Header, AddIcon, SpaceView, HeaderTouchable,
  HeaderTabView, SearchBarTextInput
} from './styles'
import HeaderView from '~/components/HeaderView'
import Contacts from '~/components/Contacts'
import api from '~/services/api';

export default function ContactsPage({ navigation }) {
  const userId = useSelector( state => state.user.profile.id)
  const contacts_update = useSelector( state => state.contact.profile)

  const [contacts, setContacts] = useState([]);
  const [defaultContacts, setDefaultContacts] = useState([]);
  const [inputState, setInputState] = useState('');

  const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(fdate, "dd 'de' MMMM',' yyyy", { locale: pt });
  const todayDate = formattedDate(new Date())

  useEffect(() => {
    loadContacts(userId);
  }, [contacts_update]);

  async function loadContacts(userID) {
    const response = await api.get(`users/${userID}/contact-list`, {
    })
    // sorter
    const sortedResponseData = response.data.sort(compare)
    setContacts(sortedResponseData)
    setDefaultContacts(sortedResponseData)
  }

  function compare(a, b) {
    if (a.worker_name > b.worker_name) {
      return 1;
    }
    if (a.worker_name < b.worker_name) {
      return -1;
    }
    return 0;
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

  function handleCreateContact() {
    navigation.navigate('ContactCreate')
  }
  // ---------------------------------------------------------------------------
  return (
    <Container>
      <Header>
        <SpaceView/>
        <HeaderView data={todayDate}/>
        <HeaderTouchable onPress={handleCreateContact}>
          <AddIcon name='plus' size={28}/>
        </HeaderTouchable>
      </Header>
      <HeaderTabView>
        <SearchBarTextInput
          value={inputState}
          onChangeText={handleUpdateInput}
          placeholder='Procurar o contato'
        ></SearchBarTextInput>
      </HeaderTabView>
      <List
        data={contacts}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
      />
    </Container>
  )
}
