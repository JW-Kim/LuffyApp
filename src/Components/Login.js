import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import Image from 'react-native-scalable-image';
import {
    Button
} from 'react-native-elements'
import JWT_decode from 'jwt-decode';
import _ from 'lodash';
import Constants from '../Com/Constants.js';
import Toast from 'react-native-toast-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            idStyle: {borderWidth: 1, borderColor: '#C2D8E9'},
            passwordStyle: {borderWidth: 1, borderColor: '#C2D8E9'},
            loginBtnStyle: {backgroundColor: '#C2D8E9', height: 72},
            isUsername: false,
            isPassword: false,
            loading: false
        }

        let goUserRegister = this.goUserRegister.bind(this);
        let changeId = this.changeId.bind(this);
        let changePassword = this.changePassword.bind(this);
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
        const {username, password, isUsername, isPassword} = this.state;

        if (!(isUsername && isPassword)) {
            return;
        }

        if (username === '' || password === '') {
            ToastAndroid.show('아이디, 패스워드를 입력하세요.', ToastAndroid.SHORT);
            return;
        }

        this.setState({loading: true});

        RNFetchBlob.config({
            trusty: true
        })
            .fetch('GET', `${Constants.DOMAIN}/product/login?username=${encodeURI(this.state.username)}&password=${encodeURI(this.state.password)}`)
            .then((response) => {
                let status = response.info().status;

                if (status == 200) {
                    let res = response.json();
                    AsyncStorage.setItem('access_token', res.data, (err, result) => {
                        this.setState({
                            username: '',
                            password: '',
                            idStyle: {borderWidth: 1, borderColor: '#C2D8E9'},
                            passwordStyle: {borderWidth: 1, borderColor: '#C2D8E9'},
                            loginBtnStyle: {backgroundColor: '#C2D8E9', height: 70},
                            isUsername: false,
                            isPassword: false,
                            loading: false
                        })
                        this.props.navigation.navigate('Main');
                    })

                } else {
                    this.setState({loading: false})
                    ToastAndroid.show('아이디, 비밀번호가 일치하지 않습니다.', ToastAndroid.SHORT);
                }
            })
            .catch((error) => {
                console.error(error)
                this.setState({loading: false})
                ToastAndroid.show('아이디, 비밀번호가 일치하지 않습니다.', ToastAndroid.SHORT);
            });
    }

    goUserRegister() {
        this.props.navigation.navigate('UserRegister', {type: 'INSERT'});
    }

    changeId(username) {
        const {isPassword} = this.state;

        let isUsername = true;
        const reg = /^[.A-Za-z0-9]*$/

        if (!reg.test(username) || username === '') {
            isUsername = false;
        }

        let loginBtnStyle = {};
        if (isUsername && isPassword) {
            loginBtnStyle = {backgroundColor: '#142765', height: 72};
        } else {
            loginBtnStyle = {backgroundColor: '#C2D8E9', height: 72};
        }

        this.setState({username, isUsername, loginBtnStyle});
    }

    changePassword(password) {
        const {isUsername} = this.state;

        let isPassword = true;
        const reg = /^[가-힣]+$/

        if (reg.test(password) || password === '') {
            isPassword = false;
        }

        let loginBtnStyle = {};
        if (isUsername && isPassword) {
            loginBtnStyle = {backgroundColor: '#142765', height: 72};
        } else {
            loginBtnStyle = {backgroundColor: '#C2D8E9', height: 72};
        }

        this.setState({password, isPassword, loginBtnStyle});
    }

    renderIdCheckText() {
        const {username, isUsername} = this.state;

        if (username !== '' && !isUsername) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={16}/>
                    <Text style={styles.checkText}>id는 영문자, 숫자만 가능합니다.</Text>
                </View>
            )
        }

        return (<View><Text></Text></View>)
    }

    renderPwCheckText() {
        const {password, isPassword} = this.state;

        if (password !== '' && !isPassword) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={16}/>
                    <Text style={styles.checkText}>pw는 영문자, 숫자, 특수문자만 가능합니다.</Text>
                </View>
            )
        }

        return (<View><Text></Text></View>)
    }

    renderIdClear() {
        const {username} = this.state;

        if (username === '') {
            return (<View></View>)
        } else {
            return (
                <TouchableOpacity onPress={() => this.changeId('')}
                                  style={{position: 'absolute', right: 0, alignItems: 'center', justifyContent: 'center', height: 72, width: 40}}>
                    <Icons name="times-circle" color="#C2D8E9" size={21}/>
                </TouchableOpacity>
            )
        }
    }

    renderPwClear() {
        const {password} = this.state;

        if (password === '') {
            return (<View></View>)
        } else {
            return (
                <TouchableOpacity onPress={() => this.changePassword('')}
                                  style={{position: 'absolute', right: 0, alignItems: 'center', justifyContent: 'center', height: 70, width: 40}}>
                    <Icons name="times-circle" color="#C2D8E9" size={21}/>
                </TouchableOpacity>
            )
        }
    }

    render() {
        const {idStyle, passwordStyle, loginBtnStyle, loading} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <KeyboardAvoidingView style={{flex: 1, width: '100%'}} enabled>
                    <ScrollView>
                        <View style={[styles.mainView, {justifyContent: 'center'}]}>
                            <View style={{flex: 1}}>
                                <View style={{
                                    flex: 0.5,
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        style={{width: 48}}
                                        source={require('../../assets/images/logo3.png')}
                                    />
                                </View>
                                <View style={{
                                    flex: 0.5,
                                    alignItems: 'center'
                                }}>
                                    <View style={styles.row}>
                                        <TextInput
                                            style={[styles.textInput, idStyle]}
                                            underlineColorAndroid="transparent"
                                            placeholder="아이디"
                                            onChangeText={(username) => this.changeId(username)}
                                            onFocus={() => this.setState({
                                                idStyle: {
                                                    borderWidth: 1,
                                                    borderColor: '#142765'
                                                }
                                            })}
                                            onBlur={() => {
                                                this.setState({
                                                    idStyle: {
                                                        borderWidth: 1,
                                                        borderColor: '#C2D8E9'
                                                    }
                                                })
                                                this.pwTextInput.focus();
                                            }}
                                            value={this.state.username}
                                        />
                                        {this.renderIdClear()}
                                    </View>
                                    {this.renderIdCheckText()}
                                    <View style={styles.row}>
                                        <TextInput
                                            ref={(input) => {this.pwTextInput = input; }}
                                            style={[styles.textInput, passwordStyle]}
                                            underlineColorAndroid="transparent"
                                            placeholder="비밀번호"
                                            autoCompleteType="password"
                                            secureTextEntry={true}
                                            onChangeText={(password) => this.changePassword(password)}
                                            onFocus={() => this.setState({
                                                passwordStyle: {
                                                    borderWidth: 1,
                                                    borderColor: '#142765'
                                                }
                                            })}
                                            onBlur={() => this.setState({
                                                passwordStyle: {
                                                    borderWidth: 1,
                                                    borderColor: '#C2D8E9'
                                                }
                                            })}
                                            value={this.state.password}
                                        />
                                        {this.renderPwClear()}
                                    </View>
                                    {this.renderPwCheckText()}
                                </View>
                                <View style={styles.row}>
                                    <Button
                                        buttonStyle={loginBtnStyle}
                                        containerViewStyle={{width: '100%'}}
                                        textStyle={{color: '#fff'}}
                                        title='로그인'
                                        onPress={this.login.bind(this)}
                                    />
                                </View>
                                <View style={styles.row}>
                                    <TouchableOpacity onPress={() => this.goUserRegister()}>
                                        <Text style={{fontSize: 16, color: '#142765'}}>회원가입</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                {loading &&
                <View style={Constants.LOADING}>
                    <ActivityIndicator size='large' color="#FF69B4"/>
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        height: Dimensions.get('window').height - '10px',
        padding: 20,
        backgroundColor: '#fff',
    },

    textInput: {
        paddingLeft: 8,
        paddingRight: 36,
        height: 72,
        flex: 1,
        fontSize: 16
    },

    row: {
        flexDirection: 'row',
        height: 72,
        marginBottom: 8,
        justifyContent: 'center'
    },

    rowTextField: {
        width: 52,
        justifyContent: 'center'
    },

    rowText: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    checkTextView: {
        flexDirection: 'row',
        height: 20,
        paddingLeft: 20,
        marginBottom: 8,
        width: '100%',
        alignItems: 'center'
    },

    checkText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#d32f2f'
    }
})