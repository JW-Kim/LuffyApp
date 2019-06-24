import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import {
    Button
} from 'react-native-elements';
import _ from 'lodash';
import Constants from '../../Com/Constants.js';
import {getToken} from '../../Com/AuthToken.js';
import Toast from 'react-native-toast-native';
import ModalStandardHeader from '../Com/ModalStandardHeader'
import Image from 'react-native-scalable-image';
import ImageView from '../ImageView.js';
import ImagePicker from 'react-native-image-picker';

export default class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoginId: '',
            userPwd: '',
            userPwd2: '',
            userNm: '',
            email: '',
            fileId: null,
            avatarSource: null
        }

        let insertUser = this.insertUser.bind(this);
        let selectPhoto = this.selectPhoto.bind(this);
    }

    async selectUserExist() {
        const {userLoginId, email} = this.state;

        return fetch(`http://${Constants.HOST}:${Constants.PORT}/product/user/selectUserExist?userLoginId=${userLoginId}&email=${email}`, await getToken())
            .then((response) => response.json())
            .then((res) => {
                return res.data
            })
    }

    async insertUser() {
        const {userLoginId, email, userPwd, userPwd2, userNm} = this.state;

        if (_.isNil(userLoginId) || _.isNil(email) || _.isNil(userPwd) || _.isNil(userPwd2) || _.isNil(userNm)
            || userLoginId === '' || email === '' || userPwd === '' || userPwd2 === '' || userNm === '') {
            Toast.show('all input', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
            return;
        }

        if (userPwd !== userPwd2) {
            Toast.show('not equal', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
            return;
        }

        const res = await this.selectUserExist();
        if (res) {
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

    selectPhoto() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            title: '사진선택',
            cancelButtonTitle: '취소',
            takePhotoButtonTitle: '사진촬영',
            chooseFromLibraryButtonTitle: '앨범에서 사진 선택'
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};

                this.setState({
                    avatarSource: source,
                    base64: response.data,
                    fileId: null
                });
            }
        });
    }

    renderProfile() {
        const {avatarSource, fileId} = this.state;

        if (avatarSource !== null) {
            return (<Image width="80" source={avatarSource}/>);

        } else if (fileId !== null) {
            return (<ImageView fileId={fileId} width="80"></ImageView>);
        }

        return (<Text></Text>)
    }

    render() {
        const {navigation} = this.props;
        const {userLoginId, userPwd, userPwd2, userNm, email} = this.state;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <KeyboardAvoidingView style={{flex: 1, width: '100%'}} enabled>
                    <ModalStandardHeader title="insert User" navigation={navigation}/>
                    <ScrollView style={{backgroundColor: '#fff'}}>
                        <View style={styles.mainView}>
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>ID</Text></View>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                    placeholder="ID"
                                    onChangeText={(userLoginId) => this.setState({userLoginId})}
                                    value={userLoginId}>
                                </TextInput>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>pw</Text></View>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                    placeholder="PW"
                                    onChangeText={(userPwd) => this.setState({userPwd})}
                                    value={userPwd}>
                                </TextInput>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>pw confirm</Text></View>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                    placeholder="PW"
                                    onChangeText={(userPwd2) => this.setState({userPwd2})}
                                    value={userPwd2}>
                                </TextInput>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>email</Text></View>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                    placeholder="name"
                                    onChangeText={(userNm) => this.setState({userNm})}
                                    value={userNm}>
                                </TextInput>
                            </View>
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>email</Text></View>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                    placeholder="email"
                                    onChangeText={(email) => this.setState({email})}
                                    value={email}>
                                </TextInput>
                            </View>
                            <View style={styles.profile}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>email</Text></View>
                                <View style={styles.profileImage}>
                                    {this.renderProfile()}
                                </View>
                                <View style={styles.selectPhotoRow}>
                                    <TouchableOpacity onPress={() => this.selectPhoto()}>
                                        <Text style={{fontSize: 14}}>selectPhoto</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <Button
                                    buttonStyle={{width: 150, backgroundColor: '#000', height: 60}}
                                    containerViewStyle={{width: '100%'}}
                                    title='insert User'
                                    onPress={() => this.insertUser()}/>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainView: {
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    textInput: {
        paddingLeft: 8,
        paddingRight: 8,
        height: 60,
        fontSize: 16,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        height: 60,
        marginBottom: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.3
    },
    rowTextField: {
        paddingLeft: 20,
        paddingRight: 20,
        width: 100,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 16
    },
    profile: {
        height: 200,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderWidth: 0.5
    },
    selectPhotoRow: {
        flexDirection: 'row',
        height: 60,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})