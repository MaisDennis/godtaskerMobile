import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image, Linking, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import whatsappIcon from '../../../assets/whatsapplogo3.png';
import Task from '~/components/Tasks';
import Messages from '~/components/Messages';
// -----------------------------------------------------------------------------
import api from '~/services/api';
import {
  Container,
  // Form, TitleView, TaskName, TaskDescriptionView,
  // TaskDescriptionText, FormInput, SubmitButton, SubmitButtonText, WhatsappButton,
  // WhatsappImage, WhatsappLabelText,
  List,
  HeaderTabView, SearchBarTextInput, Title3
} from './styles';


// -----------------------------------------------------------------------------
export default function MessagesPage({ navigation, route }) {
  const idRef = useRef();
  const [content, setContent] = useState('');
  const id = useSelector(state => state.worker.workerData.id);
  const worker_name = useSelector( state => state.worker.workerData.name)
  const userId = useSelector( state => state.worker.workerData.user_id)
  // const { task_id, user_id, taskName, taskDescription, taskUserPhonenumber } = route.params;

  const [tasks, setTasks] = useState([]);
  const workerName = useSelector(state => state.worker.profile.worker_name);

    useEffect(() => {
    loadTasks();
    // console.tron.log(tasks)
  }, [ workerName ]);

  async function loadTasks() {
    const response = await api.get(`tasks/unfinished`, {
      params: { test: workerName },
    });
    setTasks(response.data);
  }


  async function handleMessage() {
    await api.post(`messages/mobile/${task_id}`, {
      worker_id: id,
      worker_name,
      user_id,
      message_worker: content,
    });
    navigation.navigate('Tasks');
  }

  // -----------------------------------------------------------------------------
  return (

      <Container>
        <HeaderTabView>
          <SearchBarTextInput></SearchBarTextInput>
        </HeaderTabView>
        { tasks == ''
          ? (
            <Title3>Não há conversas em aberto.</Title3>
          )
          : (
            <List
              data={tasks}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Messages
                  key={item.id}
                  data={item}
                  navigation={navigation}
                />
              )}
            />
          )
        }
      </Container>

  );
}
