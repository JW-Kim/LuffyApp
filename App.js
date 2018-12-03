import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Modal from './src/Components/Modal.js'
import Login from './src/Components/Login.js'
import Home from './src/Components/Home.js'
import DiaryDtl from './src/Components/DiaryDtl.js'
import BasicComponents from './src/Components/Sample/BasicComponents.js'
import UserInterface from './src/Components/Sample/UserInterface.js'
import Detail from './src/Components/Detail.js'
import Note from './src/Components/Note/Note.js'

const MainStack = createMaterialTopTabNavigator(
    {
        Note: Note,
        Home: Home,

/*        Detail: Detail,
        BasicComponents : BasicComponents,
        UserInterface : UserInterface*/
    },
    {
       initialRouteName : 'Note',
       tabBarOptions: {
         style: {
            backgroundColor: '#484f4f'
          }
       },
       lazy : true
    }
);

const RootStack = createStackNavigator(
  {
    Login : {
        screen : Login,
    },
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: Modal,
    },
    DiaryDtl : {
      screen : DiaryDtl
    }
  },
  {
    initialRouteName : 'Login',
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
