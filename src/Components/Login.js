import React, {Component} from 'react';
import {
    View,
    TextInput,
    AsyncStorage
} from 'react-native';
import Image from 'react-native-scalable-image';
import {
    Button
} from 'react-native-elements'
import JWT_decode from 'jwt-decode';
import _ from 'lodash';
import Constants from '../Com/Constants.js';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : null,
            password : null
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('access_token', (err, result) => {
            console.log('getItem', err, result);
            if(!_.isNil(result)){
                const token = JWT_decode(result);

                let now = new Date();

                if(now > new Date(token.exp  * 1000) ){
                    AsyncStorage.removeItem('access_token', (err, result) =>{

                    })
                }else{
                    this.props.navigation.navigate('Main')
                }
            }
        });
    }

    login(){
       fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/login?username='+encodeURI(this.state.username)+'&password='+encodeURI(this.state.password))
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

    render(){
        return(
            <View style={{
                flex:1,
                flexDirection : 'column',
                justifyContent : 'center',
                backgroundColor : '#fff'
             }}>
                <View style={{
                    height : 300,
                    alignItems:'center'
                }}>
                    <Image
                        style={{width: 50}}
                        source={require('../../assets/images/logo3.png')}
                    />
                </View>
                <View style={{
                    height : 100,
                    alignItems:'center'
                }}>
                    <TextInput
                        style={{
                            width:150
                        }}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />
                    <TextInput
                        style={{
                            width:150
                        }}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <Button
                        buttonStyle={{
                            width:150,
                            backgroundColor:'#000',
                            height:36
                        }}
                        textStyle={{color:'#fff'}}
                        title='로그인'
                        onPress={this.login.bind(this)}
                    />
                </View>
            </View>
        )
    }
}
