import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import {
     Button
} from 'react-native-elements';
import _ from 'lodash';
import Constants from '../../Com/Constants.js';
import { getToken } from '../../Com/AuthToken.js';
import Toast from 'react-native-toast-native';

export default class UserRegister extends Component {
     constructor(props) {
          super(props);
          this.state = {
               userLoginId: '',
               userPwd: '',
               userPwd2: '',
               userNm: '',
               email: ''
          }

          let insertUser = this.insertUser.bind(this);
     }

     async selectUserExist() {
          const { userLoginId, email } = this.state;

          return fetch(`http://${Constants.HOST}:${Constants.PORT}/product/user/selectUserExist?userLoginId=${userLoginId}&email=${email}`, await getToken())
               .then((response) => response.json())
               .then((res) => {
                    return res.data
               })
     }

     async insertUser() {
              const { userLoginId, email, userPwd, userPwd2, userNm } = this.state;

              if(_.isNil(userLoginId) || _.isNil(email) || _.isNil(userPwd) || _.isNil(userPwd2) || _.isNil(userNm)
              || userLoginId === '' || email === '' || userPwd === '' || userPwd2 === '' || userNm === ''){
                   Toast.show('all input', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                   return;
              }

              if (userPwd !== userPwd2) {
                   Toast.show('not equal', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                   return;
              }

              const res = await this.selectUserExist();
              if(res){
                   Toast.show('exist user', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                   return;
              }

               fetch(`http://${Constants.HOST}:${Constants.PORT}/product/user`, await getToken({
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                         userLoginId,
                         email,
                         userPwd,
                         userNm
                    })
               }))
                    .then((response) => response.json())
                    .then((res) => {
                         Toast.show('note share', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                         this.props.navigation.goBack();
                    })
                    .catch((error) => {
                         Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                         this.props.navigation.navigate('Login')
                    })
          }

     render() {
          const { userLoginId, userPwd, userPwd2, userNm, email } = this.state;

          return (
              <View style={{ flex: 1 }}>
                   <View style={{ height: 60, flexDirection: 'row' }}>
                        <Text>ID</Text>
                        <TextInput
                             style={{ flex: 1 }}
                             onChangeText={(userLoginId) => this.setState({ userLoginId })}
                             value={userLoginId} >
                        </TextInput>
                   </View>
                   <View style={{ height: 60, flexDirection: 'row' }}>
                        <Text>PW</Text>
                        <TextInput
                             style={{ flex: 1 }}
                             onChangeText={(userPwd) => this.setState({ userPwd })}
                             value={userPwd} >
                        </TextInput>
                   </View>
                   <View style={{ height: 60, flexDirection: 'row' }}>
                        <Text>PW Confirm</Text>
                        <TextInput
                             style={{ flex: 1 }}
                             onChangeText={(userPwd2) => this.setState({ userPwd2 })}
                             value={userPwd2} >
                        </TextInput>
                   </View>
                   <View style={{ height: 60, flexDirection: 'row' }}>
                        <Text>name</Text>
                        <TextInput
                             style={{ flex: 1 }}
                             onChangeText={(userNm) => this.setState({ userNm })}
                             value={userNm} >
                        </TextInput>
                   </View>
                   <View style={{ height: 60, flexDirection: 'row' }}>
                        <Text>email</Text>
                        <TextInput
                             style={{ flex: 1 }}
                             onChangeText={(email) => this.setState({ email })}
                             value={email} >
                        </TextInput>
                   </View>
                   <View><Text>profile</Text></View>
                   <Button
                        buttonStyle={{ width: 150, backgroundColor: '#000', height: 36}}
                        textStyle={{ color: '#fff' }}
                        title='insert User'
                        onPress={() => this.insertUser()} />
              </View>
          )
     }
}


const styles = StyleSheet.create({

})