import 'react-native-gesture-handler';
import * as React from 'react';
// import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  // HeaderStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
// import { format } from 'date-fns';
// import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import ContactCreate from './pages/Contacts/ContactCreatePage';
import ContactEdit from './pages/Contacts/ContactEditPage';
import ContactTasks from './pages/Contacts/ContactTasksPage';

import MessagesConversationPage from './pages/Messages/MessagesConversationPage/index';

import SignInPhone from './pages/SignInPhone';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UpdateProfile from './pages/UpdateProfile';
import UpdateProfilePhoto from './pages/UpdateProfilePhoto';

import TaskCreate from './pages/Tasks/TaskCreatePage';
import TaskEdit from './pages/Tasks/TaskEditPage';
import Confirm from './pages/Confirm';

import TabRoutes from '~/components/TabRoutes';
import HeaderView from './components/HeaderRoutesView'

import TestPage from './pages/TestPage';

import { Header } from './pages/RoutesStyles/styles'
// -----------------------------------------------------------------------------
const Stack = createStackNavigator();
// -----------------------------------------------------------------------------
export default function App() {
  const signed = useSelector(state => state.auth.signed);
  // console.log(signed)
  // -----------------------------------------------------------------------------
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={signed === true ? 'Home' : 'SignInPhone'}
          // initialRouteName={'SignIn'}
          screenOptions={{
            headerTitleAlign: "center",
            ...TransitionPresets.ModalTransition,
          }}
        >
        <Stack.Screen name="SignInPhone" component={SignInPhone}
          options={{
            title: 'Entrar',
            headerShown: false,
          }}
        />
        <Stack.Screen name="SignIn" component={SignIn}
          options={{
            title: 'Entrar',
            headerShown: false,
          }}
        />
        <Stack.Screen name="SignUp" component={SignUp}
          options={{
            headerTitle: (() => (
              <Header>
                {/* <SpaceView/> */}
                  <HeaderView data={'Cadastro de usuário'}/>
                {/* <SpaceView/> */}
              </Header>
            )),
            headerShown: true,
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
            headerStyle: {
              height: 66,
              // backgroundColor: '#73c479',
              backgroundColor: '#222',
            },
          }}
        />
        <Stack.Screen name="TestPage" component={TestPage}
          options={{
            title: 'Entrar',
            headerShown: false,
          }}
        />
         <Stack.Screen
           name="Home"
           component={TabRoutes}
           options={{
             headerShown: false,
             // headerTitle: (props => (
             // <HeaderView/>
             // )),
             // headerRight: (props => (
             //   <Text style={{'color': '#fff'}}>Hello</Text>
             // )),
             // headerStyleInterpolator: HeaderStyleInterpolators.forFade,
             // headerTintColor: '#fff',
             // // headerBackTitleVisible: false,
             // headerStyle: {
             //   backgroundColor: '#222',
             //   height: 90,
             // },
           }}
         />
         <Stack.Screen
           name="TaskCreate"
           component={TaskCreate}
           options={{
             headerTitle: (() => (
               <Header>
                 <HeaderView data={'Criar uma tarefa'}/>
               </Header>
             )),
             headerShown: true,
             headerBackTitleVisible: false,
             headerTintColor: '#fff',
             headerStyle: {
               height: 66,
               // backgroundColor: '#73c479',
               backgroundColor: '#222',
             },
           }}
         />
        <Stack.Screen
          name="TaskEdit"
          component={TaskEdit}
          options={{
            headerTitle: (() => (
              <>
                <HeaderView data={'Editar a tarefa'}/>
              </>
            )),
            headerShown: true,
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
            headerStyle: {
              backgroundColor: '#222',
              height: 90,
            },
          }}
        />
        <Stack.Screen
          name="Confirm"
          component={Confirm}
          options={{
            headerTitle: (() => (
              <>
                <HeaderView data={'Finalizar a tarefa'}/>
              </>
            )),
            headerShown: true,
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
            headerStyle: {
              backgroundColor: '#222',
              height: 90,
            },
          }}
        />

        <Stack.Screen
          name="ContactEdit"
          component={ContactEdit}
          options={{
            headerTitle: (() => (
              <Header>
                <HeaderView data={'Editar o funcionário'}/>
              </Header>
            )),
            headerShown: true,
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
            headerStyle: {
              backgroundColor: '#222',
              height: 90,
            },
          }}
        />
        <Stack.Screen
          name="ContactTasks"
          component={ContactTasks}
          options={{
            headerTitle: (() => (
              <>
                <HeaderView data={'Tarefas do contato'}/>
              </>
            )),
            headerShown: true,
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
            headerStyle: {
              backgroundColor: '#222',
              height: 90,
            },
          }}
        />
       <Stack.Screen
          name="MessagesConversationPage"
          component={MessagesConversationPage}
          options={{
            headerTitle: (() => (
              <Header >
                <HeaderView data={'Mensagens'}/>
                {/* <BodyView>
                  <ImageView>
                    <Image/>
                  </ImageView>
                  <SenderView>
                    <SenderText>{props.data}</SenderText>
                  </SenderView>
                </BodyView> */}
              </Header>
            )),
            headerShown: true,
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
            headerStyle: {
              backgroundColor: '#222',
              height: 66,
            },
          }}
        />
         <Stack.Screen
           name="UpdateProfile"
           component={UpdateProfile}
           options={{
             headerTitle: (() => (
               <Header>
                 {/* <SpaceView/> */}
                   <HeaderView data={'Atualizar o cadastro'}/>
                 {/* <SpaceView/> */}
               </Header>
             )),
             headerShown: true,
             headerBackTitleVisible: false,
             headerTintColor: '#fff',
             headerStyle: {
               height: 66,
               // backgroundColor: '#73c479',
               backgroundColor: '#222',
             },
           }}
         />
         <Stack.Screen
           name="UpdateProfilePhoto"
           component={UpdateProfilePhoto}
           options={{
             headerTitle: (() => (
               <>
                 <HeaderView data={'Atualizar a foto de perfil'}/>
               </>
             )),
             headerShown: true,
             headerBackTitleVisible: false,
             headerTintColor: '#fff',
             headerTitleStyle: {
               fontWeight: 'bold',
               fontSize: 24,
             },
             headerStyle: {
               backgroundColor: '#222',
               height: 90,
             },
           }}
         />
         <Stack.Screen
           name="ContactCreate"
           component={ContactCreate}
           options={{
             headerTitle: (() => (
               <Header>
                 <HeaderView data={'Adicionar um funcionário'}/>
               </Header>
             )),
             headerShown: true,
             headerBackTitleVisible: false,
             headerTintColor: '#fff',
             headerTitleStyle: {
               fontWeight: 'bold',
               fontSize: 24,
             },
             headerStyle: {
               backgroundColor: '#222',
               height: 66,
             },
           }}
         />


        </Stack.Navigator>
      </NavigationContainer>
    )

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator
  //       initialRouteName={signed === true ? 'TabRoutes' : 'SignInPhone'}
  //       screenOptions={{
  //         headerTitleAlign: "center",
  //         ...TransitionPresets.ModalTransition,
  //       }}
  //     >

  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}
