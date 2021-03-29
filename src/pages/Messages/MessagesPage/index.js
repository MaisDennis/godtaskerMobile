import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
// -----------------------------------------------------------------------------
import {
  Container, List, Header, AlignView,
  SearchBarTextInput, Title3,
  HeaderTabView, UpperTabView, UpperTabText,
} from './styles';
import Messages from '~/components/Messages';
import api from '~/services/api';
import firebase from '~/services/firebase'
// -----------------------------------------------------------------------------
export default function MessagesPage({ navigation, route }) {
  const user_id = useSelector(state => state.user.profile.id);
  const workerID = useSelector(state => state.worker.profile.id);
  const messages_update = useSelector(state => state.message.profile);

  const [tasks, setTasks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [defaultMessages, setDefaultMessages] = useState();
  const [defaultTasks, setDefaultTasks] = useState();
  const [inputState, setInputState] = useState();
  const [resetTasks, setResetTasks] = useState('Hello');
  // console.log(route)
  useEffect(() => {
    loadTasks('', user_id);
  }, [ messages_update ]);

    async function loadTasks(workerNameFilter, userID) {
    let response = []
    const workerResponse = await api.get(`tasks/unfinished`, {
      params: { workerID },
    });
    const userResponse = await api.get(`tasks/user/unfinished`, {
      params: { workerNameFilter, userID }
    })
    response = [... workerResponse.data, ... userResponse.data]
    // console.log(response)
    // response.map(r => {
    //   getPhoto(r.phonenumber)
    // })

    // remove duplicates
    const seen = new Set()
    const filteredResponse = response.filter(a => {
      const duplicate = seen.has(a.id)
      seen.add(a.id)
      return !duplicate
    })
    filteredResponse.sort(compare);
    // console.log(filteredResponse.length)

    setTasks(filteredResponse);
    setDefaultTasks(filteredResponse);
  }

  async function getPhoto(phonenumber) {
    const worker = await api.get('workers/individual', {
      params: {phonenumber: phonenumber},
    })
    setWorkerData(worker.data)
    // console.log('worker')
  }

  function compare(a, b) {
    if (a.messaged_at > b.messaged_at) {
      return -1;
    }
    if (a.messaged_at < b.messaged_at) {
      return 1;
    }
    return 0;
  }

  const handleUpdateInput = async (input) => {
    const filteredList = defaultTasks.filter(t => {
      let messageSearch = t.name + t.worker.worker_name
      return messageSearch.toLowerCase().includes(input.toLowerCase())
    })
    setTasks(filteredList)
    setInputState(input)
  }
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <Header>
        <AlignView>
          <SearchBarTextInput
            placeholder='Procurar mensagem'
            onChangeText={handleUpdateInput}
            value={inputState}
          ></SearchBarTextInput>
        </AlignView>
      </Header>
      <HeaderTabView>
        <UpperTabView>
        <TouchableOpacity onPress={() => loadTasks('', user_id)}>
            <UpperTabText>atualizar</UpperTabText>
          </TouchableOpacity>
        </UpperTabView>
      </HeaderTabView>
      { tasks == ''
        ? (
          <Title3>Não há conversas em aberto.</Title3>
        )
        : (
          <List
            data={tasks}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
              <Messages
                key={index}
                data={item}
                navigation={navigation}
                resetTasks={resetTasks}
                setResetTasks={setResetTasks}
              />
            )}
          />
        )
      }
    </Container>
  );
}
