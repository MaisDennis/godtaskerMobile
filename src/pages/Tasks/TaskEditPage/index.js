import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native'
import { parseISO } from 'date-fns';
import InputSpinner from 'react-native-input-spinner';
// -----------------------------------------------------------------------------
import { Container, FormScrollView, ItemWrapperView, LabelText,
  Input, SubTaskView, SubTaskTitleView, SubTaskItemView, SubTaskButtonView,
  TextWeigeView, WeigeView, WeigeTagView, WeigeText, WeigeButton,
  SubTaskLabelText, SubTaskInput, SubTaskText, SubTaskWeigeText,
  SubTaskIcon,
  DateOptionsView, DateOptions, Options, TitleText,
  SubmitView, AlignView, SubmitIcon, AddSubTaskIcon, SubTaskButton,
} from './styles'
import NumberInput from '~/components/NumberInput'
import SubTasks from '~/components/SubTasks'
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';

export default function TaskEditPage({ navigation, route }) {
  const dispatch = useDispatch();
  const data = route.params;

  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [subTaskList, setSubTaskList] = useState(data.sub_task_list);
  const [prior, setPrior] = useState(data.task_attributes[0]);
  const [urgent, setUrgent] = useState(data.task_attributes[1]);
  const [complex, setComplex] = useState(data.task_attributes[2]);
  const [startDate, setStartDate] = useState(parseISO(data.start_date));
  const [dueDate, setDueDate] = useState(parseISO(data.due_date));
  const [toggleAddSubTask, setToggleAddSubTask] = useState(false);
  const [addSubTaskInput, setAddSubTaskInput] = useState();
  const [editSubTaskInputValue, setEditSubTaskInputValue] = useState();
  const [editWeigeInputValue, setEditWeigeInputValue] = useState(1);
  const [editSubTaskIndex, setEditSubTaskIndex] = useState();
  const [subTaskToggleEdit, setSubTaskToggleEdit] = useState();
  const taskAttributesArray = [ "baixa", "média", "alta", "" ]

  async function handleSubmit() {
    await api.put(`tasks/${data.id}`, {
      name: name,
      description: description,
      // sub_task_list:
      task_attributes: [prior, urgent, complex],
      start_date: startDate,
      due_date: dueDate,
    });
    dispatch(updateTasks(new Date()))
    navigation.goBack()
  }

  function handleAddSubTask() {
    let editedSubTaskList = subTaskList
    editedSubTaskList.push({
      description: addSubTaskInput,
      weige: editWeigeInputValue,
      complete: false,
      user_read: false,
    })
    setSubTaskList(editedSubTaskList)
    setAddSubTaskInput();
    console.tron.log(subTaskList)
    navigation.navigate('TaskEdit');
    // dispatch(updateTasks(new Date()))
  }

  function handleOpenEditSubTask(position) {
    setEditSubTaskIndex(position)
    setSubTaskToggleEdit(!subTaskToggleEdit)
  }

  function handleEditSubTask(position) {
    let editedSubTaskList = subTaskList.map((s, index) => {
      if (index === position) {
        s.description = editSubTaskInputValue;
        // s.weige = editWeigeInputValue;
      }
      return s;
    })
    setSubTaskList(editedSubTaskList)
    console.tron.log(subTaskList)
    navigation.navigate('TaskEdit',{
      sub_task_list: subTaskList,
    });
  }

  function handleDeleteSubTask(position) {
    let editedSubTaskList = subTaskList
    editedSubTaskList.splice(position, 1)
    setSubTaskList(editedSubTaskList)
    navigation.navigate('TaskEdit',{
      sub_task_list: subTaskList,
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

        {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}
        <ItemWrapperView>
          {/* <SubTasks subTaskList={subTaskList}/> */}
          <SubTaskTitleView>
            <LabelText>Adicionar sub-tarefa:</LabelText>
          </SubTaskTitleView>
          <SubTaskView>
            <TextWeigeView>
              <SubTaskInput
                value={addSubTaskInput}
                onChangeText={setAddSubTaskInput}
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
                          value={addSubTaskInput}
                          onChangeText={setAddSubTaskInput}
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
                          <WeigeButton onPress={handleAddSubTask}>
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
          {/* { toggleAddSubTask && (
            <SubTaskView key={index}>
            <SubTaskLabelText>{index+1}</SubTaskLabelText>
            <SubTaskInput
            value={s.description}
                // onChangeText={setDescription}
            ></SubTaskInput>
          </SubTaskView>
          )} */}
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
