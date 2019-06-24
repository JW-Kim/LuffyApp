import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidView,
    ScrollView,
    Dimensions
} from 'react-native';
import Image from 'react-native-scalable-image';
import {
    Button
} from 'react-native-elements'
import JWT_decode from 'jwt-decode';
import _ from 'lodash';
import Constants from '../Com/Constants.js';
import Toast from 'react-native-toast-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        let goUserRegister = this.goUserRegister.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem('access_token', (err, result) => {

            if (!_.isNil(result)) {
                const token = JWT_decode(result);

                let now = new Date();

                if (now > new Date(token.exp * 1000)) {
                    AsyncStorage.removeItem('access_token', (err, result) => {

                    })
                } else {
                    this.props.navigation.navigate('Main')
                }
            }
        });
    }

    login() {
        const { username, password } = this.state;

        if(username === '' || password === '') {
             Toast.show('put in username, password', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
        }

        fetch('http://' + Constants.HOST + ':' + Constants.PORT + '/product/login?username=' + encodeURI(this.state.username) + '&password=' + encodeURI(this.state.password))
            .then((response) => response.json())
            .then((res) => {
                console.log('res', res)
                AsyncStorage.setItem('access_token', res.data, (err, result) => {
                    console.log('setItem', err, result)
                    this.props.navigation.navigate('Main');
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    goUserRegister() {
         this.props.navigation.navigate('UserRegister');
    }

    render() {
        return (
        <View style={{ flex: 1}}>
      <KeyboardAvoidView style={{flex: 1, width: '100%'}} enabled>
      <ScrollView>
        <View style={[styles.mainView, {justifyContent: 'center'}]}>
            <View style={{flex: 1 }}>
                <View style={{
                    flex: 0.5,
                    alignItems: 'center'
                }}>
                    <Image
                        style={{width: 50}}
                        source={require('../../assets/images/logo3.png')}
                    />
                </View>
                <View style={{
                    flex: 0.5,
                    alignItems: 'center'
                }}>
                    <View style={styles.row}>
                        <View style={styles.rowTextField}><Text style={styles.rowText}>ID</Text></View>
                         <TextInput
                              style={styles.textInput}
                              onChangeText={(username) => this.setState({username})}
                             value={this.state.username}
                         />
                    </View>
                    <View style={styles.row}>
                         <View style={styles.rowTextField}><Text style={styles.rowText}>PW</Text></View>
                         <TextInput
                             style={styles.textInput}
                             onChangeText={(password) => this.setState({password})}
                             value={this.state.password}
                         />
                    </View>
                    </View>
                    <View style={styles.row}>
                         <Button
                             buttonStyle={{backgroundColor: '#000', height: 70}}
                             containerViewStyle={{width: '100%'}}
                             textStyle={{color: '#fff'}}
                             title='로그인'
                             onPress={this.login.bind(this)}
                         />
                    </View>
                    <View style={styles.row}>
                         <TouchableOpacity onPress={() => this.goUserRegister()}>
                              <Text style={{ fontSize: 14}}>insert User</Text>
                         </TouchableOpacity>
                    </View>
                </View>
            </View>
         </View>
         </ScrollView>
         </KeyboardAvoidView>
         </View>
        )
    }
}

const styles = StyleSheet.create({
     mainView: {
          height: Dimensions.get('window').height,
          padding: 20,
          backgroundColor: '#fff',
     },

     textInput: {
          paddingLeft: 8,
          paddingRight: 8,
          height: 70,
          flex: 1
     },

     row: {
          flexDirection: 'row',
          height: 70,
          marginBottom: 8
     },

     rowTextField: {
          width: 50,
          justifyContent: 'center'
     },

     rowText: {
          fontSize: 21,
          fontWeight: 'bold'
     }
})