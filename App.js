import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createTabNavigator } from 'react-navigation';
import Modal from './src/Components/Modal.js'
import Home from './src/Components/Home.js'
import BasicComponents from './src/Components/Sample/BasicComponents.js'
import UserInterface from './src/Components/Sample/UserInterface.js'
import Detail from './src/Components/Detail.js'

const MainStack = createTabNavigator(
    {
        Home: Home,
        Detail:  Detail,
        BasicComponents : BasicComponents,
        UserInterface : UserInterface
    },
    {
       initialRouteName : 'Home'
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
