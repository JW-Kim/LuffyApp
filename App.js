import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Login from './src/Components/Login.js'
import DiaryDtl from './src/Components/Note/DiaryDtl.js'
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
        NoteStatics: NoteStatics
    },
    {
        initialRouteName: 'Note',
        tabBarOptions: {
            style: {
                backgroundColor: '#C2D8E9',
                shadowColor: 'transparent',
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
                height: 40
            },
            labelStyle: {
                fontSize: 16,
                //fontWeight: 'bold',
                //color: '#000',
                paddingBottom: 8
            },
            activeBackgroundColor: '#142765',
            activeTintColor: '#fff',
            inactiveTintColor: '#142765'
        },
        lazy: true
    }
);

const RootStack = createStackNavigator(
    {
        Login: {
            screen: Login,
        },
        Main: {
            screen: MainStack,
        },
        DiaryDtl: {
            screen: DiaryDtl
        },
        NoteDiseaseDtl: {
            screen: NoteDiseaseDtl
        },
        NoteSetting: {
            screen: NoteSetting
        },
        NoteSettingDtl: {
            screen: NoteSettingDtl
        },
        Setting: {
            screen: Setting
        },
        SearchUser: {
            screen: SearchUser
        },
        UserRegister: {screen: UserRegister}
    },
    {
        initialRouteName: 'Login',
        mode: 'modal',
        headerMode: 'none',
    }
);

export default class App extends Component {
    render() {
        return <RootStack/>;
    }
}
