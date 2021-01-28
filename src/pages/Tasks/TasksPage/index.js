import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
// -----------------------------------------------------------------------------
import Task from '~/components/Tasks';
import { workerCheckIn, signOut } from '~/store/modules/worker/actions';
import api from '~/services/api';
import {
  Container, List, Title3,
  HeaderTabView, UpperTabView, UpperTabText,
} from './styles';
// -----------------------------------------------------------------------------
export default function Dashboard({ navigation }) {
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
  // -----------------------------------------------------------------------------
  return (
    <Container>
      <HeaderTabView>
        <TouchableOpacity><UpperTabView><UpperTabText>em aberto</UpperTabText></UpperTabView></TouchableOpacity>
        <TouchableOpacity><UpperTabView><UpperTabText>finalizadas</UpperTabText></UpperTabView></TouchableOpacity>
        <TouchableOpacity><UpperTabView><UpperTabText>canceladas</UpperTabText></UpperTabView></TouchableOpacity>
        <TouchableOpacity><UpperTabView><UpperTabText>todas</UpperTabText></UpperTabView></TouchableOpacity>
      </HeaderTabView>
      { tasks == ''
          ? <Title3>Não há tarefas em aberto.</Title3>
          : <List
              data={tasks}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <>
                  <Task data={item} navigation={navigation} />
                </>
              )}
            />
      }
    </Container>
  );
}
