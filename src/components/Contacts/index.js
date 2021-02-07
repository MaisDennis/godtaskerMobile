import React, {  useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native'
// -----------------------------------------------------------------------------
import {
  Container, Header, Body,
  TabView, UserInfoView, ButtonsView,
  ImageView, Image, ContactText,
  OthersView, ContactsIcon, BottomTabView, ButtonsText

} from './styles'
import { updateContacts } from '~/store/modules/contact/actions';
import api from '~/services/api';


export default function Contacts({ navigation, data }) {
  const userId = useSelector( state => state.user.profile.id)
  const [toggleContact, setToggleContact] = useState();
  const dispatch = useDispatch();
  // console.tron.log(data)

  function handleToggleContact() {
    setToggleContact(!toggleContact)
  }

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

  function handleEditContact() {
    navigation.navigate('ContactEdit', {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      worker_name: data.worker_name,
      department: data.department,
      phonenumber: data.phonenumber,
    });
  }

  async function handleRemoveContact() {
    const phonenumber = data.phonenumber
    console.tron.log(phonenumber)
    await api.put(`/users/${userId}/remove-contact`, {
      phonenumber: phonenumber,
    })
    dispatch(updateContacts(new Date()))
  }
  // ---------------------------------------------------------------------------
  return (
    <Container>
      <TouchableOpacity onPress={handleToggleContact}>
      <Body>
        <TabView/>
        <UserInfoView>
          <ImageView>
            <Image/>
          </ImageView>
          <ContactText>{data.worker_name}</ContactText>
        </UserInfoView>
      <OthersView>
        { !toggleContact &&
          <ContactsIcon name="more-horizontal"/>
        }

      </OthersView>
      </Body>
      </TouchableOpacity>
      { toggleContact && (
        <BottomTabView>
          <TabView/>
          <ButtonsView>

            <TouchableOpacity key={`1`} onPress={handleContactTasks}>
              <ButtonsText>tarefas</ButtonsText>
            </TouchableOpacity>
            <TouchableOpacity key={`2`} onPress={handleEditContact}>
              <ButtonsText>editar</ButtonsText>
            </TouchableOpacity>
            <TouchableOpacity key={`3`} onPress={handleRemoveContact}>
              <ButtonsText>remover</ButtonsText>
            </TouchableOpacity>
          </ButtonsView>
        </BottomTabView>
      )

      }

    </Container>
  )
}
