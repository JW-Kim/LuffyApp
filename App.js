import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Modal from './src/Components/Modal.js'
import Home from './src/Components/Home.js'
import DiaryDtl from './src/Components/DiaryDtl.js'
import BasicComponents from './src/Components/Sample/BasicComponents.js'
import UserInterface from './src/Components/Sample/UserInterface.js'
import Detail from './src/Components/Detail.js'

const MainStack = createMaterialTopTabNavigator(
    {
        Home: Home,
        Detail: Detail,
        BasicComponents : BasicComponents,
        UserInterface : UserInterface
    },
    {
       initialRouteName : 'Home',
       tabBarOptions: {
         style: {
            backgroundColor: '#484f4f'
          }
       }
    }
);

const RootStack = createStackNavigator(
  {
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
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
