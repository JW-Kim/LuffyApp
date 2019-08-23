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
    Image,
    Dimensions,
    ToastAndroid
} from 'react-native';
import {
    Button
} from 'react-native-elements';
import _ from 'lodash';
import Constants from '../../Com/Constants.js';
import {getToken, getTokenJson} from '../../Com/AuthToken.js';
import {chkId, chkKor, chkSpecialStr, chkEmail, chkEng, chkNum} from '../../Com/ComService.js';
import Toast from 'react-native-toast-native';
import ModalStandardHeader from '../Com/ModalStandardHeader'
import Edit from '../Com/Edit'
import ImageView from '../Com/ImageView.js';
import ImagePicker from 'react-native-image-picker';
import Icons from 'react-native-vector-icons/FontAwesome';
import NativeModules from 'NativeModules';
import RNFetchBlob from 'react-native-fetch-blob';

export default class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.navigation.getParam('type'),
            userId: this.props.navigation.getParam('userId'),
            userLoginId: '',
            userPwd: '',
            userPwd2: '',
            userNm: '',
            email: '',
            fileId: null,
            avatarSource: null,
            isUserLoginId: false,
            isUserPwd: false,
            isUserPwd2: false,
            isUserNm: false,
            isEmail: false,
            isEqualPwd: false,
            isCorrectPwd: false,
            isProfile: false,
            insertUserBtnStyle: {backgroundColor: '#C2D8E9', height: 60},
            idStyle: Constants.EDIT_BLUR_STYLE,
            userPwdStyle: Constants.EDIT_BLUR_STYLE,
            userPwd2Style: Constants.EDIT_BLUR_STYLE,
            userNmStyle: Constants.EDIT_BLUR_STYLE,
            emailStyle: Constants.EDIT_BLUR_STYLE,
        }

        let save = this.save.bind(this);
        let selectPhoto = this.selectPhoto.bind(this);
        let changeUserLoginId = this.changeUserLoginId.bind(this);
        let changeUserPwd = this.changeUserPwd.bind(this);
        let changeUserPwd2 = this.changeUserPwd2.bind(this);
        let changeUserNm = this.changeUserNm.bind(this);
        let changeEmail = this.changeEmail.bind(this);
    }

    componentWillMount() {
        const {type} = this.state;

        if (type === 'UPDATE') {
            this.getUserInfo();
        }
    }

    async getUserInfo() {
        RNFetchBlob.config({
            trusty: true
        })
            .fetch('GET', `${Constants.DOMAIN}/product/user/info`, await getTokenJson())
            .then((response) => {
                let status = response.info().status;

                if (status == 200) {
                    let res = response.json();
                    this.setState({
                        userLoginId: res.data.userLoginId,
                        userNm: res.data.userNm,
                        email: res.data.email,
                        fileId: res.data.fileId,
                        isUserNm: true,
                        isEmail: true,
                        isProfile: true,
                    })
                } else {
                    ToastAndroid.show('조회를 실패하였습니다.', ToastAndroid.SHORT);
                }
            })
            .catch((error) => {
                ToastAndroid.show('조회를 실패하였습니다.', ToastAndroid.SHORT);
            });
    }

    async selectUserExist() {
        const {userLoginId, email} = this.state;

        return RNFetchBlob.config({
            trusty: true
        })
            .fetch('GET', `${Constants.DOMAIN}/product/user/selectUserExist?userLoginId=${userLoginId}&email=${email}`)
            .then((response) => {
                let status = response.info().status;

                if (status == 200) {
                    let res = response.json();
                    return res.data
                } else {
                    ToastAndroid.show('조회를 실패하였습니다.', ToastAndroid.SHORT);
                }
            })
            .catch((error) => {
                ToastAndroid.show('조회를 실패하였습니다.', ToastAndroid.SHORT);
            });
    }

    save() {
        const {type, fileId, avatarSource} = this.state;

        if (type === 'INSERT') {
            this.insertUser();

        } else {
            if (_.isNil(fileId) && !_.isNil(avatarSource)) {
                this.uploadPhoto();
            } else {
                this.updateUser();
            }
        }
    }

    async uploadPhoto() {
        var cur = this;
        const {avatarSource} = this.state;

        NativeModules.FileUpload.upload(await getToken({
            uploadUrl: `http://${Constants.HOST}:${Constants.PORT}/product/file/upload`,
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            fields: {
                'hello': 'world'
            },
            files: [{
                name: 'image',
                filename: 'file',
                filepath: avatarSource.uri,
                filetype: 'image/jpeg'
            }]

        }), function (err, result) {
            cur.updateUser(JSON.parse(result.data).data.fileId);
        })
    }

    async insertUser(fileId) {
        const {userLoginId, email, userPwd, userPwd2, userNm} = this.state;

        if (_.isNil(userLoginId) || _.isNil(email) || _.isNil(userPwd) || _.isNil(userPwd2) || _.isNil(userNm)
            || userLoginId === '' || email === '' || userPwd === '' || userPwd2 === '' || userNm === '') {
            return;
        }

        if (userPwd !== userPwd2) {
            return;
        }

        const res = await this.selectUserExist();
        if (res) {
            ToastAndroid.show('동일한 ID가 존재합니다.', ToastAndroid.SHORT);
            return;
        }

        RNFetchBlob.config({
            trusty: true
        })
            .fetch('POST', `${Constants.DOMAIN}/product/user`, await getTokenJson({
                    'Content-Type': 'application/json'
                }),
                JSON.stringify({
                    userLoginId,
                    email,
                    userPwd,
                    userNm
                }))
            .then((response) => {
                let status = response.info().status;

                if (status == 200) {
                    let res = response.json();
                    ToastAndroid.show('사용자가 등록되었습니다.', ToastAndroid.SHORT);
                    this.props.navigation.goBack();
                } else {
                    ToastAndroid.show('등록을 실패하였습니다.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                ToastAndroid.show('등록을 실패하였습니다.', ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            });
    }

    async updateUser(fileId) {
        const {userId, email, userNm} = this.state;

        RNFetchBlob.config({
            trusty: true
        })
        .fetch('POST', `${Constants.DOMAIN}/product/user/${userId}`, await getTokenJson({
               'Content-Type': 'application/json'
            }),
            JSON.stringify({
                email,
                userNm,
                fileId
            }))
           .then((response) => {
               let status = response.info().status;

               if (status == 200) {
                    ToastAndroid.show('사용자가 수정되었습니다.', ToastAndroid.SHORT);
                    this.props.navigation.goBack();
                } else {
                    ToastAndroid.show('수정을 실패하였습니다.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                ToastAndroid.show('수정을 실패하였습니다.', ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            });
    }

    selectPhoto() {
        var cur = this;
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
                    fileId: null,
                    isProfile: true
                }, () => {
                    cur.checkInsertBtnStyle();
                })
            }
        });
    }

    checkInsertBtnStyle() {
        const {type, isUserLoginId, isUserPwd, isUserPwd2, isUserNm, isEmail, isEqualPwd, isProfile} = this.state;

        if (type === 'INSERT') {
            if (isUserLoginId && isUserPwd && isUserPwd2 && isUserNm && isEmail && isEqualPwd) {
                this.setState({insertUserBtnStyle: {backgroundColor: '#142765', height: 60}})
            } else {
                this.setState({insertUserBtnStyle: {backgroundColor: '#C2D8E9', height: 60}})
            }
        } else {
            if (isUserNm && isEmail && isProfile) {
                this.setState({insertUserBtnStyle: {backgroundColor: '#142765', height: 60}})
            } else {
                this.setState({insertUserBtnStyle: {backgroundColor: '#C2D8E9', height: 60}})
            }
        }
    }

    changeUserLoginId(userLoginId) {
        const cur = this;
        let isUserLoginId = true;

        if (!chkId(userLoginId) || userLoginId === '') {
            isUserLoginId = false;
        }

        this.setState({userLoginId, isUserLoginId}, () => {
            cur.checkInsertBtnStyle();
        })
    }

    changeUserPwd(userPwd) {
        const cur = this;
        const {userPwd2} = this.state;

        let isUserPwd = true;
        let isEqualPwd = true;
        let isCorrectPwd = true;

        if (chkKor(userPwd) || userPwd === '') {
            isUserPwd = false;
        }

        if (userPwd !== userPwd2) {
            isEqualPwd = false;
        }

        if (!(chkSpecialStr(userPwd) && chkEng(userPwd) && chkNum(userPwd) && userPwd.length >= 6 && userPwd.length <= 12 )) {
            isCorrectPwd = false;
        }

        this.setState({userPwd, isUserPwd, isEqualPwd, isCorrectPwd}, () => {
            cur.checkInsertBtnStyle();
        })
    }

    changeUserPwd2(userPwd2) {
        const cur = this;
        const {userPwd} = this.state;

        let isUserPwd2 = true;
        let isEqualPwd = true;

        if (chkKor(userPwd2) || userPwd2 === '') {
            isUserPwd2 = false;
        }

        if (userPwd !== userPwd2) {
            isEqualPwd = false;
        }

        this.setState({userPwd2, isUserPwd2, isEqualPwd}, () => {
            cur.checkInsertBtnStyle();
        })
    }

    changeUserNm(userNm) {
        const cur = this;
        let isUserNm = true;

        if (chkSpecialStr(userNm) || userNm === '') {
            isUserNm = false;
        }

        this.setState({userNm, isUserNm}, () => {
            cur.checkInsertBtnStyle();
        })
    }

    changeEmail(email) {
        const cur = this;
        let isEmail = true;

        if (!chkEmail(email) || email === '') {
            isEmail = false;
        }

        this.setState({email, isEmail}, () => {
            cur.checkInsertBtnStyle();
        })
    }

    renderIdCheckText() {
        const {userLoginId, isUserLoginId} = this.state;

        if (userLoginId !== '' && !isUserLoginId) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14}/>
                    <Text style={styles.checkText}>id는 영문자, 숫자만 가능합니다.</Text>
                </View>
            )
        }

        return (<View><Text></Text></View>)
    }

    renderPwCheckText() {
        const {userPwd, isUserPwd, isCorrectPwd} = this.state;

        if (userPwd !== '' && !isUserPwd) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14}/>
                    <Text style={styles.checkText}>PASSWORD는 영문자, 숫자, 특수문자만 가능합니다.</Text>
                </View>
            )
        } else if (userPwd !== '' && !isCorrectPwd) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14}/>
                    <Text style={styles.checkText}>PW 조건을 확인하시기 바랍니다.</Text>
                </View>
            )
        }

        return (<View><Text></Text></View>)
    }

    renderPw2CheckText() {
        const {userPwd, userPwd2, isUserPwd2, isEqualPwd} = this.state;

        if (userPwd2 !== '' && !isUserPwd2) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14}/>
                    <Text style={styles.checkText}>PASSWORD는 영문자, 숫자, 특수문자만 가능합니다.</Text>
                </View>
            )
        } else if (!isEqualPwd && !(userPwd === '' && userPwd2 === '')) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14}/>
                    <Text style={styles.checkText}>패스워드가 일치하지 않습니다.</Text>
                </View>
            )
        }

        return (<View><Text></Text></View>)
    }

    renderUserNmCheckText() {
        const {userNm, isUserNm} = this.state;

        if (userNm !== '' && !isUserNm) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14}/>
                    <Text style={styles.checkText}>이름은 한글, 영문자만 가능합니다.</Text>
                </View>
            )
        }

        return (<View><Text></Text></View>)
    }

    renderEmailCheckText() {
        const {email, isEmail} = this.state;

        if (email !== '' && !isEmail) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14}/>
                    <Text style={styles.checkText}>이메일 형식이 맞지 않습니다.</Text>
                </View>
            )
        }

        return (<View><Text></Text></View>)
    }

    renderProfile() {
        const {avatarSource, fileId} = this.state;

        if (avatarSource !== null) {
            return (<Image style={styles.profileImage} source={avatarSource}/>);

        } else if (fileId !== null) {
            return (<ImageView type="unScalable" style={styles.profileImage} fileId={fileId} width="100"></ImageView>);
        }

        return (<Text></Text>)
    }

    renderProfileRow() {
        const {type, userNm} = this.state;

        if (type === 'INSERT') {
            return;
        }

        return (
            <TouchableOpacity style={styles.profile} onPress={() => this.selectPhoto()}>
                <View style={styles.profileImage} onPress={() => this.selectPhoto()}>
                    {this.renderProfile()}
                </View>
                <View style={styles.selectPhotoRow}>
                    <View>
                        <Text style={styles.rowText}>{userNm}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderIdRow() {
        const {type, idStyle, userLoginId} = this.state;

        if (type === 'UPDATE') {
            return (
                <View style={{width: '100%'}}>
                    <View style={styles.row}>
                        <View style={styles.rowTextField}><Text style={styles.rowText}>아이디</Text></View>
                        <View style={{flex: 1}}><Text style={styles.rowText}>{userLoginId}</Text></View>
                    </View>
                </View>
            )
        }

        return (
            <View style={{width: '100%'}}>
                <View style={styles.row}>
                    <View style={styles.rowTextField}><Text style={styles.rowText}>아이디</Text></View>
                    <Edit
                        onRef={(input) => { this.idTextInput = input; }}
                        height="60"
                        style={[styles.textInput, idStyle]}
                        underlineColorAndroid="transparent"
                        placeholder="영문/숫자 6~12자"
                        autoCompleteType="off"
                        secureTextEntry={false}
                        onChangeText={(userLoginId) => this.changeUserLoginId(userLoginId)}
                        onFocus={() => this.setState({idStyle: Constants.EDIT_FOCUS_STYLE})}
                        onBlur={() => {this.setState({idStyle: Constants.EDIT_BLUR_STYLE}); this.pwTextInput.focus();}}
                        value={userLoginId}>
                    </Edit>
                </View>
                {this.renderIdCheckText()}
            </View>
        )
    }

    renderPasswordRow() {
        const {type, userPwdStyle, userPwd2Style, userPwd, userPwd2} = this.state;

        if (type === 'UPDATE') {
            return;
        }

        return (
            <View style={{width: '100%'}}>
                <View style={styles.row}>
                    <View style={styles.rowTextField}><Text style={styles.rowText}>비밀번호</Text></View>
                    <Edit
                        onRef={(input) => { this.pwTextInput = input; }}
                        height="60"
                        style={[styles.textInput, userPwdStyle]}
                        underlineColorAndroid="transparent"
                        placeholder="영문/숫자/특수기호 조합 6~12자"
                        autoCompleteType="password"
                        secureTextEntry={true}
                        onChangeText={(userPwd) => this.changeUserPwd(userPwd)}
                        onFocus={() => this.setState({userPwdStyle: Constants.EDIT_FOCUS_STYLE})}
                        onBlur={() => {this.setState({userPwdStyle: Constants.EDIT_BLUR_STYLE}); this.rePwTextInput.focus()}}
                        value={userPwd}>
                    </Edit>
                </View>
                {this.renderPwCheckText()}
                <View style={styles.row}>
                    <View style={styles.rowTextField}><Text style={styles.rowText}>비밀번호 확인</Text></View>
                    <Edit
                        onRef={(input) => { this.rePwTextInput = input; }}
                        height="60"
                        style={[styles.textInput, userPwd2Style]}
                        underlineColorAndroid="transparent"
                        placeholder="비밀번호 확인"
                        autoCompleteType="password"
                        secureTextEntry={true}
                        onChangeText={(userPwd2) => this.changeUserPwd2(userPwd2)}
                        onFocus={() => this.setState({userPwd2Style: Constants.EDIT_FOCUS_STYLE})}
                        onBlur={() => {this.setState({userPwd2Style: Constants.EDIT_BLUR_STYLE}); this.userNmTextInput.focus(); }}
                        value={userPwd2}>
                    </Edit>
                </View>
                {this.renderPw2CheckText()}
            </View>
        )
    }

    render() {
        const {navigation} = this.props;
        const {
            type,
            userNm,
            email,
            insertUserBtnStyle,
            userNmStyle,
            emailStyle
        } = this.state;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <KeyboardAvoidingView style={{flex: 1, width: '100%'}} enabled>
                    <ModalStandardHeader title={type === 'INSERT' ? "회원가입" : '사용자 정보'} navigation={navigation}/>
                    <ScrollView style={{backgroundColor: '#fff', height: Dimensions.get('window').height - 140}}>
                        <View style={styles.mainView}>
                            {this.renderProfileRow()}
                            {this.renderIdRow()}
                            {this.renderPasswordRow()}
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>이름</Text></View>
                                <Edit
                                    onRef={(input) => { this.userNmTextInput = input; }}
                                    height="60"
                                    style={[styles.textInput, userNmStyle]}
                                    underlineColorAndroid="transparent"
                                    placeholder="한글/영문/숫자 6~12자"
                                    autoCompleteType="off"
                                    secureTextEntry={false}
                                    onChangeText={(userNm) => this.changeUserNm(userNm)}
                                    onFocus={() => this.setState({
                                        userNmStyle: Constants.EDIT_FOCUS_STYLE
                                    })}
                                    onBlur={() => {
                                        this.setState({
                                            userNmStyle: Constants.EDIT_BLUR_STYLE
                                        });
                                        this.emailTextInput.focus();
                                    }}
                                    value={userNm}>
                                </Edit>
                            </View>
                            {this.renderUserNmCheckText()}
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>email</Text></View>
                                <Edit
                                    onRef={(input) => { this.emailTextInput = input; }}
                                    height="60"
                                    style={[styles.textInput, emailStyle]}
                                    underlineColorAndroid="transparent"
                                    placeholder="xxx@xxxxxx"
                                    autoCompleteType="off"
                                    secureTextEntry={false}
                                    onChangeText={(email) => this.changeEmail(email)}
                                    onFocus={() => this.setState({
                                        emailStyle: Constants.EDIT_FOCUS_STYLE
                                    })}
                                    onBlur={() => this.setState({
                                        emailStyle: Constants.EDIT_BLUR_STYLE
                                    })}
                                    value={email}>
                                </Edit>
                            </View>
                            {this.renderEmailCheckText()}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Button
                    buttonStyle={insertUserBtnStyle}
                    containerViewStyle={{width: '100%', marginLeft: 0, marginRight: 0}}
                    title='저장'
                    onPress={() => this.save()}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainView: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    textInput: {
        paddingLeft: 8,
        paddingRight: 35,
        height: 60,
        fontSize: 16,
        flex: 1
    },
    row: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        height: 60,
        marginBottom: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowTextField: {
        paddingRight: 20,
        width: 130,
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
    },
    checkTextView: {
        flexDirection: 'row',
        height: 20,
        paddingLeft: 170,
        marginBottom: 8,
        width: '100%',
        alignItems: 'center'
    },
    checkText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#d32f2f'
    }
})