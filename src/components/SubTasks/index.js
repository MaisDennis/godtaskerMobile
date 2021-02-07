import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import {Container, SubTaskTitleView, LabelText, AddSubTaskIcon, AddSubTaskButton } from './styles'

export default function SubTasks({ subTaskList }) {
  const [subTaskListState, setSubTaskListState] = useState(subTaskList);
  const [updateSubTasks, setUpdateSubTasks] = useState(0);
  useEffect(() => {
    setSubTaskListState(subTaskListState)
  }, [updateSubTasks])

  function handleUpdate() {
    setUpdateSubTasks(new Date())
    let editedSubTaskList = subTaskListState
    editedSubTaskList.push({
      description: "1",
      complete: false,
    })
    setSubTaskListState(editedSubTaskList)
    // console.tron.log(subTaskListState)
  }
  console.tron.log(subTaskListState)
  return (
    <Container>
      <SubTaskTitleView>
        <LabelText>Sub-tarefas:</LabelText>
        <AddSubTaskButton onPRess={handleUpdate}>
          <AddSubTaskIcon name="plus"/>
        </AddSubTaskButton>
      </SubTaskTitleView>
      { subTaskListState.map(s => (
        <Text>{s.description}</Text>
      ))
      }

    </Container>
  )
}
