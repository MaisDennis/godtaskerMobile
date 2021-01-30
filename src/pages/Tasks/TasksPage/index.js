import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import Task from '~/components/Tasks';
import api from '~/services/api';
import HeaderView from '~/components/HeaderView';
import {
  Container, List, Title3,
  HeaderTabView, UpperTabView, UpperTabText,
  Header, SpaceView,
} from './styles';
// -----------------------------------------------------------------------------
export default function Dashboard({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const workerName = useSelector(state => state.worker.profile.worker_name);
  const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(fdate, "dd 'de' MMMM',' yyyy", { locale: pt });
  const todayDate = formattedDate(new Date())

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
      <Header>
        <SpaceView/>
          <HeaderView data={todayDate}/>
        <SpaceView/>
      </Header>
      <HeaderTabView>
        <UpperTabView>
          <TouchableOpacity>
            <UpperTabText>em aberto</UpperTabText>
          </TouchableOpacity>
        </UpperTabView>
        <UpperTabView>
          <TouchableOpacity>
            <UpperTabText>finalizadas</UpperTabText>
          </TouchableOpacity>
        </UpperTabView>
        <UpperTabView>
          <TouchableOpacity>
            <UpperTabText>canceladas</UpperTabText>
          </TouchableOpacity>
        </UpperTabView>
        <UpperTabView>
          <TouchableOpacity>
            <UpperTabText>todas</UpperTabText>
          </TouchableOpacity>
        </UpperTabView>
      </HeaderTabView>
      { tasks == ''
        ? (
          <Title3>Não há tarefas em aberto.</Title3>
        )
        : (
          <List
            data={tasks}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
              <>
                <Title3>{index+1}</Title3>
                <Task data={item} navigation={navigation} position={index+1}/>
              </>
            )}
          />
        )
      }
    </Container>
  );
}
