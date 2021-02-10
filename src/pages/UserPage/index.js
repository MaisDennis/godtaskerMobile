import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import TaskUser from '~/components/TasksUser';
import HeaderView from '~/components/HeaderView'
import api from '~/services/api';
import {
  Container, List, Title3, Header,
  HeaderTabView, UpperTabView, UpperTabText, AddIcon, SpaceView, HeaderTouchable
} from './styles';
// -----------------------------------------------------------------------------
export default function UserPage({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const user_id = useSelector(state => state.user.profile.id);
  const update_tasks = useSelector(state => state.task.tasks);

  useEffect(() => {
    loadTasks('', user_id);
  }, [ update_tasks ]);

  const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(fdate, "dd 'de' MMMM',' yyyy", { locale: pt });
  const todayDate = formattedDate(new Date())

  async function loadTasks(workerNameFilter, userID) {
    let response = await api.get(`tasks/user/unfinished`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
  }

  async function loadFinished(workerNameFilter, userID) {
    let response = await api.get(`tasks/user/finished`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
  }

  async function loadCanceled(workerNameFilter, userID) {
    let response = await api.get(`tasks/user/canceled`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
  }

  async function loadAll(workerNameFilter, userID) {
    let response = await api.get(`tasks`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
  }

  function handleCreateTaskPage() {
    navigation.navigate('TaskCreate')
  }

  // -----------------------------------------------------------------------------
  return (
    <Container>
      <Header>
        <SpaceView/>
        <HeaderView data={todayDate}/>
        <HeaderTouchable onPress={handleCreateTaskPage}>
          <AddIcon name='plus' size={28}/>
        </HeaderTouchable>
      </Header>
      <HeaderTabView>
        <UpperTabView>
          <TouchableOpacity onPress={() => loadTasks('', user_id)}>
            <UpperTabText>em aberto</UpperTabText>
          </TouchableOpacity>
        </UpperTabView>
        <UpperTabView>
          <TouchableOpacity onPress={() => loadFinished('', user_id)}>
            <UpperTabText>finalizadas</UpperTabText>
          </TouchableOpacity>
        </UpperTabView>
        <UpperTabView>
          <TouchableOpacity onPress={() => loadCanceled('', user_id)}>
            <UpperTabText>canceladas</UpperTabText>
          </TouchableOpacity>
        </UpperTabView>
        {/* <UpperTabView>
          <TouchableOpacity onPress={() => loadAll('', user_id)}>
            <UpperTabText>todas</UpperTabText>
          </TouchableOpacity>
        </UpperTabView> */}
      </HeaderTabView>
      { tasks == ''
        ? (
          <Title3>Sem tarefas nessa condição.</Title3>
        )
        : (
          <List
            data={tasks}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
              <>
                <Title3>{index+1}</Title3>
                <TaskUser key={item.id} data={item} navigation={navigation} />
              </>
            )}
          />
        )
      }
    </Container>
  );
}

