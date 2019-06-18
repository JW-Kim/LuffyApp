import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Modal from './src/Components/Modal.js'
import Login from './src/Components/Login.js'
import Home from './src/Components/Home.js'
import DiaryDtl from './src/Components/DiaryDtl.js'
import BasicComponents from './src/Components/Sample/BasicComponents.js'
import UserInterface from './src/Components/Sample/UserInterface.js'
import Detail from './src/Components/Detail.js'
import Note from './src/Components/Note/Note.js'
import NoteStatics from './src/Components/Note/NoteStatics.js'
import NoteDiseaseDtl from './src/Components/Note/NoteDiseaseDtl.js'
import NoteSetting from './src/Components/Setting/Note.js'
import NoteSettingDtl from './src/Components/Setting/NoteDtl.js'
import Setting from './src/Components/Setting/Setting.js'
import SearchUser from './src/Components/User/SearchUser.js'
import UserRegister from './src/Components/User/UserRegister.js'

const MainStack = createBottomTabNavigator(
    {
        Note: Note,
        NoteStatics : NoteStatics
//        Home: Home,

/*        Detail: Detail,
        BasicComponents : BasicComponents,
        UserInterface : UserInterface*/
    },
    {
       initialRouteName : 'Note',
       tabBarOptions: {
            style: {
                backgroundColor: '#ffffff',
                shadowColor: 'transparent',
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
				  height: 40
            },
            labelStyle : {
                fontSize: 12,
                //fontWeight: 'bold',
                color : '#000'
            },
			 activeBackgroundColor : '#ff3399' 
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
    },
    NoteDiseaseDtl : {
        screen : NoteDiseaseDtl
    },
	NoteSetting : {
		screen : NoteSetting
	},
	NoteSettingDtl : {
		screen : NoteSettingDtl
	},
	Setting : {
		screen : Setting
    },
    SearchUser : {
    	screen : SearchUser
    },
    UserRegister: { screen: UserRegister }
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
