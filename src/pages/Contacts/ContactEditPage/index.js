import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native'
import api from '~/services/api';

export default function EditContactPage({ navigation, route }) {
  const user_id = useSelector(state => state.user.profile.id);

  // console.tron.log(route.params)
  const userResponse = api.get(`users/${user_id}/contact-list`, {
  })

  return (
    <View>
      <Text>Edit Contact</Text>
    </View>
  )
}
