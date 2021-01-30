import React from 'react';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
// -----------------------------------------------------------------------------
import User from '~/pages/UserPage';
import Tasks from '~/pages/Tasks/TasksPage';
import TasksFinished from '~/pages/Tasks/TasksFinishedPage';
import Messages from '~/pages/Messages/MessagesPage';
import Contacts from '~/pages/Contacts/ContactsPage';
import Settings from '~/pages/Settings';
// -----------------------------------------------------------------------------
const Tab = createBottomTabNavigator();

export default function TabRoutes({ navigation }) {
  const signed = useSelector(state => state.auth.signed);

  if (!signed) {
    navigation.navigate('SignIn');
  }
  // -----------------------------------------------------------------------------
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === 'User') {
              iconName = 'eye';
            } else if (route.name === 'Worker') {
              iconName = 'briefcase';
            } else if (route.name === 'Messages') {
              iconName = 'message-circle';
            } else if (route.name === 'Contacts') {
              iconName = 'book-open';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
              // iconName = focused ? 'settings' : 'settings';
            }
            return <Icon name={iconName} size={24} color={color} />;
          },
        })}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeBackgroundColor: '#222',
          inactiveBackgroundColor: '#222',
          activeTintColor: '#F5F5F5',
          inactiveTintColor: '#444',
        }}
      >
        <Tab.Screen
          name="User"
          component={User}
          options={{ tabBarLabel: 'Chefe' }}
        />
        <Tab.Screen
          name="Worker"
          component={Tasks}
          options={{ tabBarLabel: 'Funcionário' }}
        />
        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{ tabBarLabel: 'Conversas' }}
        />
        <Tab.Screen
          name="Contacts"
          component={Contacts}
          options={{ tabBarLabel: 'Contatos' }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ tabBarLabel: 'Config.' }}
        />
      </Tab.Navigator>
    </>
  );
}
