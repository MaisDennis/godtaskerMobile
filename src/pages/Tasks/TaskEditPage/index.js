import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native'
// -----------------------------------------------------------------------------
import { Container, FormScrollView, ItemWrapperView, LabelText,
  Input, SubTaskView, SubTaskLabelText, SubTaskInput,
  DateInput, DateOptionsView, DateOptions, Options, TitleText,
  SubmitView, AlignView, SubmitIcon
} from './styles'
import { parseISO, format } from 'date-fns';
import api from '~/services/api';
// import { ptBR } from 'date-fns/locale';


export default function TaskEditPage({ navigation, route }) {
  const data = route.params;
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [subTaskList, setSubTaskList] = useState(data.sub_task_list);
  const [prior, setPrior] = useState(data.task_attributes[0]);
  const [urgent, setUrgent] = useState(data.task_attributes[1]);
  const [complex, setComplex] = useState(data.task_attributes[2]);
  const [startDate, setStartDate] = useState(parseISO(data.start_date));
  const [dueDate, setDueDate] = useState(parseISO(data.due_date));

  const taskAttributesArray = [ "baixa", "média", "alta", "" ]

  function handleSubmit() {
    console.tron.log('Submit')
    const parsedStartDate = parseISO(startDate);
    const parsedDueDate = parseISO(dueDate);
    api.put(`tasks/${data.id}`, {
      name: name,
      description: description,
      // sub_task_list:
      task_attributes: [prior, urgent, complex],
      start_date: startDate,
      due_date: dueDate,
    });
  }

    // ---------------------------------------------------------------------------
  return (
    <Container>
      <FormScrollView contentContainerStyle={{ alignItems: 'center'}}>
        <ItemWrapperView>
          <LabelText>Tarefa:</LabelText>
          <Input
            value={name}
            onChangeText={setName}
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Descrição:</LabelText>
          <Input
            value={description}
            onChangeText={setDescription}
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Sub-tarefas:</LabelText>
          { subTaskList.map((s, index) => (
            <SubTaskView key={index}>
              <SubTaskLabelText>{index+1}</SubTaskLabelText>
              <SubTaskInput
              value={s.description}
                  // onChangeText={setDescription}
              ></SubTaskInput>
            </SubTaskView>
          ))}
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Início:</LabelText>
          <DateOptionsView>
            <DateOptions
              date={startDate}
              onDateChange={setStartDate}
              locale='pt'
              is24hourSource='locale'
              androidVariant="nativeAndroid"
              textColor="#666"
              textSize="30"
            />
          </DateOptionsView>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Prazo:</LabelText>
          <DateOptionsView>
            <DateOptions
              date={dueDate}
              onDateChange={setDueDate}
              locale='pt'
              is24hourSource='locale'
              androidVariant="nativeAndroid"
              textColor="#666"
              textSize="30"
            />
          </DateOptionsView>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Prioridades:</LabelText>
          <Options selectedValue={prior} onValueChange={setPrior}>
            { taskAttributesArray.map(t => (
              <Options.Item label={t} value={t}/>
            ))}
          </Options>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Urgência:</LabelText>
          <Options selectedValue={urgent} onValueChange={setUrgent}>
            { taskAttributesArray.map(t => (
              <Options.Item label={t} value={t}/>
            ))}
          </Options>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Complexidade:</LabelText>
          <Options selectedValue={complex} onValueChange={setComplex}>
            { taskAttributesArray.map(t => (
              <Options.Item label={t} value={t}/>
            ))}
          </Options>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Funcionário:</LabelText>
          <TitleText>{data.worker.worker_name}</TitleText>
        </ItemWrapperView>
        <TouchableOpacity onPress={handleSubmit}>
          <ItemWrapperView>
            <SubmitView>
              <AlignView>
                <SubmitIcon name="send" size={20} color="#fff" />
              </AlignView>
            </SubmitView>
          </ItemWrapperView>
        </TouchableOpacity>
      </FormScrollView>
    </Container>
  )
}
