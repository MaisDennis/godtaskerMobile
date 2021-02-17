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
  const [taskConditionIndex, setTaskConditionIndex] = useState();

  const workerID = useSelector(state => state.worker.profile.id);
  const update_tasks = useSelector(state => state.task.tasks);
  const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(fdate, "dd 'de' MMMM',' yyyy", { locale: pt });
  const todayDate = formattedDate(new Date())

  useEffect(() => {
    loadTasks();
    // console.tron.log(tasks)
  }, [ update_tasks ]);

  // console.tron.log(taskConditionIndex)

  async function loadTasks() {
    let response = await api.get(`tasks/unfinished`, {
      params: { workerID },
    });
    setTasks(response.data);
    setTaskConditionIndex(1);
  }

  async function loadFinished() {
    let response = await api.get(`tasks/finished`, {
      params: { workerID }
    })
    setTasks(response.data);
    setTaskConditionIndex(2);
  }

  async function loadCanceled() {
    let response = await api.get(`tasks/canceled`, {
      params: { workerID }
    })
    setTasks(response.data);
    setTaskConditionIndex(3);
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
        <TouchableOpacity onPress={() => loadTasks()}>
            <UpperTabText>em aberto</UpperTabText>
          </TouchableOpacity>
        </UpperTabView>
        <UpperTabView>
          <TouchableOpacity onPress={() => loadFinished()}>
            <UpperTabText>finalizadas</UpperTabText>
          </TouchableOpacity>
        </UpperTabView>
        <UpperTabView>
          <TouchableOpacity onPress={() => loadCanceled()}>
            <UpperTabText>canceladas</UpperTabText>
          </TouchableOpacity>
        </UpperTabView>
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
                <Task
                  key={item.id}
                  data={item}
                  navigation={navigation}
                  // position={index+1}
                  taskConditionIndex={taskConditionIndex}
                />
              </>
            )}
          />
        )
      }
    </Container>
  );
}
