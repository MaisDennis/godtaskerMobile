import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native'
import { parseISO } from 'date-fns';
import InputSpinner from 'react-native-input-spinner';
// -----------------------------------------------------------------------------
import {
  AddSubTaskIcon, AlignView,
  Container,
  DateOptionsView, DateOptions,
  FormScrollView,
  Input, ItemWrapperView,
  LabelText,
  Options,
  SubTaskView, SubTaskItemView, SubTaskButtonView,  SubTaskLabelText,
  SubTaskInput, SubTaskText, SubTaskWeigeText,
  SubTaskIcon, SubTaskButton,
  SubmitView, SubmitIcon,
  TextWeigeView, TitleText,
  WeigeView, WeigeTagView, WeigeText, WeigeButton,
} from './styles'
import NumberInput from '~/components/NumberInput'
// import SubTasks from '~/components/SubTasks'
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';

export default function TaskEditPage({ navigation, route }) {
  const dispatch = useDispatch();
  const data = route.params;

  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [prior, setPrior] = useState(data.task_attributes[0]);
  const [urgent, setUrgent] = useState(data.task_attributes[1]);
  const [complex, setComplex] = useState(data.task_attributes[2]);
  const [startDate, setStartDate] = useState(parseISO(data.start_date));
  const [dueDate, setDueDate] = useState(parseISO(data.due_date));

  const [subTaskList, setSubTaskList] = useState(data.sub_task_list);
  const [editSubTaskIndex, setEditSubTaskIndex] = useState();
  const [toggleAddSubTask, setToggleAddSubTask] = useState(false);
  const [addSubTaskInputValue, setAddSubTaskInputValue] = useState();
  const [addWeigeInputValue, setAddWeigeInputValue] = useState(1);
  const [editSubTaskInputValue, setEditSubTaskInputValue] = useState();
  const [editWeigeInputValue, setEditWeigeInputValue] = useState(1);
  const [subTaskToggleEdit, setSubTaskToggleEdit] = useState(false);

  const taskAttributesArray = [ "baixa", "média", "alta", "" ]

  function handleAddSubTask() {
    let editedSubTaskList = subTaskList
    const sub_task_id = Math.floor(Math.random() * 1000000)
    editedSubTaskList.push({
      id: sub_task_id,
      description: addSubTaskInputValue,
      weige: editWeigeInputValue,
      complete: false,
      user_read: true,
    })
    setSubTaskList(editedSubTaskList)
    setAddSubTaskInputValue();
    // console.tron.log(subTaskList)
    navigation.navigate('TaskEdit');
    // dispatch(updateTasks(new Date()))
  }

  function handleOpenEditSubTask(position) {
    setEditSubTaskIndex(position)
    setSubTaskToggleEdit(!subTaskToggleEdit)
    setEditSubTaskInputValue(subTaskList[position].description)
    setEditWeigeInputValue(subTaskList[position].weige)
  }

  function handleEditSubTask(position) {
    let editedSubTaskList = subTaskList.map((s, index) => {
      if (index === position) {
        s.description = editSubTaskInputValue;
        s.weige = editWeigeInputValue;
      }
      return s;
    })
    setSubTaskList(editedSubTaskList)
    setEditSubTaskIndex(null);
    setSubTaskToggleEdit(false);
    // navigation.navigate('TaskEdit',{
    //   sub_task_list: subTaskList,
    // });
  }

  function handleDeleteSubTask(position) {
    let editedSubTaskList = subTaskList
    editedSubTaskList.splice(position, 1)
    setSubTaskList(editedSubTaskList)
    navigation.navigate('TaskEdit',{
      sub_task_list: subTaskList,
    });
  }

  function weigeToPercentage(subTasks) {
    let weigeSum = 0;
    for(let i = 0; i < subTasks.length; i++) {
      weigeSum += parseFloat(subTasks[i].weige)
    }

    for(let i = 0; i < subTasks.length; i++) {
      subTasks[i].weige_percentage = (Math.round((parseFloat(subTasks[i].weige) / weigeSum)*1000) /10)
    }
    return weigeSum;
  }

  async function handleSubmit() {
    try {
      weigeToPercentage(subTaskList)

      await api.put(`tasks/${data.id}/notification`, {
        name: name,
        description: description,
        sub_task_list: subTaskList,
        task_attributes: [prior, urgent, complex],
        start_date: startDate,
        due_date: dueDate,
      });
      dispatch(updateTasks(new Date()))
      navigation.goBack();
    }
    catch(error) {
      console.log(error)
    }

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
        {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}
        <ItemWrapperView>
          <LabelText>Adicionar sub-tarefa:</LabelText>
          <SubTaskView>
            <TextWeigeView>
              <SubTaskInput
                value={addSubTaskInputValue}
                onChangeText={setAddSubTaskInputValue}
                mutiline={true}
              />
              <WeigeView>
                <WeigeTagView>
                  <WeigeText>Peso:</WeigeText>
                  <NumberInput
                    numberInputValue={addWeigeInputValue}
                    setNumberInputValue={setAddWeigeInputValue}
                  />
                </WeigeTagView>
                <WeigeButton onPress={handleAddSubTask}>
                  <AddSubTaskIcon name="check-circle" size={55}/>
                </WeigeButton>
              </WeigeView>
            </TextWeigeView>

          </SubTaskView>
          <LabelText>Sub-tarefas:</LabelText>
          { subTaskList.map((s, index) => (
            <SubTaskView key={index}>
              {
                subTaskToggleEdit && (editSubTaskIndex === index)
                ? (
                  <SubTaskItemView>
                    <SubTaskView>
                    <SubTaskLabelText>{index+1}</SubTaskLabelText>
                    <SubTaskText>{s.description}</SubTaskText>
                    </SubTaskView>
                    <WeigeView>
                      <WeigeTagView>
                        <WeigeText>Peso:</WeigeText>
                        <SubTaskWeigeText>{s.weige}</SubTaskWeigeText>
                      </WeigeTagView>
                      <SubTaskButtonView>
                        <SubTaskButton onPress={() => handleOpenEditSubTask(index)}>
                          <SubTaskIcon name="edit"/>
                        </SubTaskButton>
                        <SubTaskButton onPress={() => handleDeleteSubTask(index)}>
                          <SubTaskIcon name="x-circle"/>
                        </SubTaskButton>
                      </SubTaskButtonView>
                    </WeigeView>
                    <SubTaskView>
                      <TextWeigeView>
                        <SubTaskInput
                          value={editSubTaskInputValue}
                          onChangeText={setEditSubTaskInputValue}
                          mutiline={true}
                        />
                        <WeigeView>
                          <WeigeTagView>
                            <WeigeText>Peso:</WeigeText>
                            <NumberInput
                              numberInputValue={editWeigeInputValue}
                              setNumberInputValue={setEditWeigeInputValue}
                            />
                          </WeigeTagView>
                          <WeigeButton onPress={() => handleEditSubTask(index)}>
                            <AddSubTaskIcon name="check-circle" size={55}/>
                          </WeigeButton>
                        </WeigeView>
                      </TextWeigeView>
                    </SubTaskView>
                  </SubTaskItemView>
                )
                : (
                  <SubTaskItemView>
                    <SubTaskView>
                      <SubTaskLabelText>{index+1}</SubTaskLabelText>
                      <SubTaskText>{s.description}</SubTaskText>
                    </SubTaskView>
                    <WeigeView>
                      <WeigeTagView>
                        <WeigeText>Peso:</WeigeText>
                        <SubTaskWeigeText>{s.weige}</SubTaskWeigeText>
                      </WeigeTagView>
                      <SubTaskButtonView>
                        <SubTaskButton onPress={() => handleOpenEditSubTask(index)}>
                          <SubTaskIcon name="edit"/>
                        </SubTaskButton>
                        <SubTaskButton onPress={() => handleDeleteSubTask(index)}>
                          <SubTaskIcon name="x-circle"/>
                        </SubTaskButton>
                      </SubTaskButtonView>
                    </WeigeView>
                  </SubTaskItemView>
                )
              }
            </SubTaskView>
          ))}
          <LabelText>(não esquecer de confirmar as alterações em sub-tarefas para que sejam salvas)</LabelText>
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
              <Options.Item key={t} label={t} value={t}/>
            ))}
          </Options>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Urgência:</LabelText>
          <Options selectedValue={urgent} onValueChange={setUrgent}>
            { taskAttributesArray.map(t => (
              <Options.Item key={t} label={t} value={t}/>
            ))}
          </Options>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Complexidade:</LabelText>
          <Options selectedValue={complex} onValueChange={setComplex}>
            { taskAttributesArray.map(t => (
              <Options.Item key={t} label={t} value={t}/>
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
