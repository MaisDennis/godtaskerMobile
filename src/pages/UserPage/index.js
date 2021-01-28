import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import Task from '~/components/Tasks';
import TaskUser from '~/components/TasksUser';
import HeaderView from '~/components/HeaderView'
import { signOut } from '~/store/modules/auth/actions';
// import { workerCheckIn, signOut } from '~/store/modules/worker/actions';
import api from '~/services/api';
import {
  Container, List, Title3, Header,
  HeaderTabView, UpperTabView, UpperTabText, AddIcon, SpaceView, HeaderTouchable
} from './styles';
// -----------------------------------------------------------------------------
export default function UserPage({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const user_id = useSelector(state => state.user.profile.id);
  const dispatch = useDispatch();
  const signed = useSelector(state => state.auth.signed);
  useEffect(() => {
    loadTasks('', user_id);
    // console.tron.log(tasks)
  }, [ user_id ]);

  const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(fdate, "dd 'de' MMMM',' yyyy", { locale: pt });
  const todayDate = formattedDate(new Date())

  async function loadTasks(workerNameFilter, userID) {
    response = await api.get(`tasks/user/unfinished`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);

  }
  function handleCreateTaskPage() {
    navigation.navigate('TaskCreate')
  }

  function handleSignOut() {
    dispatch(
      signOut()
    );
    if (!signed) {
      navigation.navigate('SignIn')
    }
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
      <UpperTabView><TouchableOpacity><UpperTabText>em aberto</UpperTabText></TouchableOpacity></UpperTabView>
      <UpperTabView><TouchableOpacity><UpperTabText>finalizadas</UpperTabText></TouchableOpacity></UpperTabView>
      <UpperTabView><TouchableOpacity><UpperTabText>canceladas</UpperTabText></TouchableOpacity></UpperTabView>
      <UpperTabView><TouchableOpacity onPress={handleSignOut}><UpperTabText>todas</UpperTabText></TouchableOpacity></UpperTabView>
      </HeaderTabView>
      { tasks == ''
          ? <Title3>Não há tarefas em aberto.</Title3>
          : <List
              data={tasks}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <>
                  <TaskUser key={item.id} data={item} navigation={navigation} />
                </>
              )}
            />
      }
    </Container>
  );
}

