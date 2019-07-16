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
    Dimensions
} from 'react-native';
import {
    Button
} from 'react-native-elements';
import _ from 'lodash';
import Constants from '../../Com/Constants.js';
import {getToken} from '../../Com/AuthToken.js';
import {chkId, chkKor, chkSpecialStr, chkEmail, chkEng, chkNum} from '../../Com/ComService.js';
import Toast from 'react-native-toast-native';
import ModalStandardHeader from '../Com/ModalStandardHeader'
import Edit from '../Com/Edit'
import ImageView from '../Com/ImageView.js';
import ImagePicker from 'react-native-image-picker';
import Icons from 'react-native-vector-icons/FontAwesome';

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
            avatarSource: null,
            isUserLoginId: false,
            isUserPwd: false,
            isUserPwd2: false,
            isUserNm: false,
            isEmail: false,
            isEqualPwd: false,
            isCorrectPwd: false,
            insertUserBtnStyle: {backgroundColor: '#C2D8E9', height: 60},
            idSytle: {borderBottomWidth: 0, borderColor: '#C2D8E9'},
            userPwdStyle: {borderBottomWidth: 0, borderColor: '#C2D8E9'},
            userPwd2Style: {borderBottomWidth: 0, borderColor: '#C2D8E9'},
            userNmStyle: {borderBottomWidth: 0, borderColor: '#C2D8E9'},
            emailStyle: {borderBottomWidth: 0, borderColor: '#C2D8E9'},
        }

        let uploadPhoto = this.uploadPhoto.bind(this);
        let selectPhoto = this.selectPhoto.bind(this);
        let changeUserLoginId = this.changeUserLoginId.bind(this);
        let changeUserPwd = this.changeUserPwd.bind(this);
        let changeUserPwd2 = this.changeUserPwd2.bind(this);
        let changeUserNm = this.changeUserNm.bind(this);
        let changeEmail = this.changeEmail.bind(this);
    }

    async selectUserExist() {
        const {userLoginId, email} = this.state;

        return fetch(`http://${Constants.HOST}:${Constants.PORT}/product/user/selectUserExist?userLoginId=${userLoginId}&email=${email}`, await getToken())
            .then((response) => response.json())
            .then((res) => {
                return res.data
            })
    }

    async uploadPhoto() {
        const {fileId, avatarSource} = this.state;

        if (_.isNil(fileId) && !_.isNil(avatarSource)) {
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
                    filepath: cur.state.avatarSource.uri,
                    filetype: 'image/jpeg'
                }]

            }), function (err, result) {
                this.insertUser(JSON.parse(result.data).data.fileId);
            })

        } else {
            this.insertUser()
        }
    }

    async insertUser(fileId) {
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
                userNm,
                fileId
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

    checkInsertBtnStyle() {
        const {isUserLoginId, isUserPwd, isUserPwd2, isUserNm, isEmail, isEqualPwd} = this.state;

        if (isUserLoginId && isUserPwd && isUserPwd2 && isUserNm && isEmail && isEqualPwd) {
            this.setState({insertUserBtnStyle: {backgroundColor: '#142765', height: 60}})
        } else {
            this.setState({insertUserBtnStyle: {backgroundColor: '#C2D8E9', height: 60}})
        }
    }

    changeUserLoginId(userLoginId) {
        const cur = this;
        let isUserLoginId = true;

        if(!chkId(userLoginId) || userLoginId === '') {
            isUserLoginId = false;
        }

        this.setState({userLoginId, isUserLoginId}, () =>{
            cur.checkInsertBtnStyle();
        })
    }

    changeUserPwd(userPwd) {
        const cur = this;
        const {userPwd2} = this.state;

        let isUserPwd = true;
        let isEqualPwd = true;
        let isCorrectPwd = true;

        if(chkKor(userPwd) || userPwd === '') {
            isUserPwd = false;
        }

        if(userPwd !== userPwd2) {
            isEqualPwd = false;
        }

        if(!(chkSpecialStr(userPwd) && chkEng(userPwd) && chkNum(userPwd) && userPwd.length >= 6 && userPwd.length <= 12 )) {
            isCorrectPwd = false;
        }

        this.setState({userPwd, isUserPwd, isEqualPwd, isCorrectPwd}, () =>{
            cur.checkInsertBtnStyle();
        })
    }

    changeUserPwd2(userPwd2) {
        const cur = this;
        const {userPwd} = this.state;

        let isUserPwd2 = true;
        let isEqualPwd = true;

        if(chkKor(userPwd2) || userPwd2 === '') {
            isUserPwd2 = false;
        }

        if(userPwd !== userPwd2) {
            isEqualPwd = false;
        }

        this.setState({userPwd2, isUserPwd2, isEqualPwd}, () =>{
            cur.checkInsertBtnStyle();
        })
    }

    changeUserNm(userNm) {
        const cur = this;
        let isUserNm = true;

        if(chkSpecialStr(userNm) || userNm === '') {
            isUserNm = false;
        }

        this.setState({userNm, isUserNm}, () =>{
            cur.checkInsertBtnStyle();
        })
    }

    changeEmail(email) {
        const cur = this;
        let isEmail = true;

        if(!chkEmail(email) || email === '') {
            isEmail = false;
        }

        this.setState({email, isEmail}, () =>{
            cur.checkInsertBtnStyle();
        })
    }

    renderIdCheckText() {
        const {userLoginId, isUserLoginId} = this.state;

        if(userLoginId !== '' && !isUserLoginId) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14} />
                    <Text style={styles.checkText}>id는영문자, 숫자만 가능합니다.</Text>
                </View>
            )
        }

        return(<View><Text></Text></View>)
    }

    renderPwCheckText() {
        const {userPwd, isUserPwd, isCorrectPwd} = this.state;

        if(userPwd !== '' && !isUserPwd) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14} />
                    <Text style={styles.checkText}>PASSWORD는 영문자, 숫자, 특수문자만 가능합니다.</Text>
                </View>
            )
        } else if(userPwd !== '' && !isCorrectPwd) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14} />
                    <Text style={styles.checkText}>PW 조건을 확인하시기 바랍니다.</Text>
                </View>
            )
        }

        return(<View><Text></Text></View>)
    }

    renderPw2CheckText() {
        const {userPwd, userPwd2, isUserPwd2, isEqualPwd} = this.state;

        if(userPwd2 !== '' && !isUserPwd2) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14} />
                    <Text style={styles.checkText}>PASSWORD는 영문자, 숫자, 특수문자만 가능합니다.</Text>
                </View>
            )
        } else if(!isEqualPwd && !(userPwd === '' && userPwd2 === '')) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14} />
                    <Text style={styles.checkText}>패스워드가 일치하지 않습니다.</Text>
                </View>
            )
        }

        return(<View><Text></Text></View>)
    }

    renderUserNmCheckText() {
        const {userNm, isUserNm} = this.state;

        if(userNm !== '' && !isUserNm) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14} />
                    <Text style={styles.checkText}>이름은 한글, 영문자만 가능합니다.</Text>
                </View>
            )
        }

        return(<View><Text></Text></View>)
    }

    renderEmailCheckText() {
        const {email, isEmail} = this.state;

        if(email !== '' && !isEmail) {
            return (
                <View style={styles.checkTextView}>
                    <Icons name="exclamation-circle" color="#d32f2f" size={14} />
                    <Text style={styles.checkText}>이메일 형식이 맞지 않습니다.</Text>
                </View>
            )
        }

        return(<View><Text></Text></View>)
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

    render() {
        const {navigation} = this.props;
        const {
            userLoginId,
            userPwd,
            userPwd2,
            userNm,
            email,
            insertUserBtnStyle,
            idSytle,
            userPwdStyle,
            userPwd2Style,
            userNmStyle,
            emailStyle
        } = this.state;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <KeyboardAvoidingView style={{flex: 1, width: '100%'}} enabled>
                    <ModalStandardHeader title="회원가입" navigation={navigation}/>
                    <ScrollView style={{backgroundColor: '#fff', height: Dimensions.get('window').height - 140}}>
                        <View style={styles.mainView}>
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>아이디</Text></View>
                                <Edit
                                    height="60"
                                    style={[styles.textInput, idSytle]}
                                    underlineColorAndroid="transparent"
                                    placeholder="영문/숫자 6~12자"
                                    autoCompleteType="off"
                                    secureTextEntry={false}
                                    onChangeText={(userLoginId) => this.changeUserLoginId(userLoginId)}
                                    onFocus={() => this.setState({idSytle: {borderBottomWidth: 1, borderColor: '#C2D8E9'}})}
                                    onBlur={() => this.setState({idSytle: {borderBottomWidth: 0, borderColor: '#C2D8E9'}})}
                                    value={userLoginId}>
                                </Edit>
                            </View>
                            {this.renderIdCheckText()}
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>비밀번호</Text></View>
                                <Edit
                                    height="60"
                                    style={[styles.textInput, userPwdStyle]}
                                    underlineColorAndroid="transparent"
                                    placeholder="영문/숫자/특수기호 조합 6~12자"
                                    autoCompleteType="password"
                                    secureTextEntry={true}
                                    onChangeText={(userPwd) => this.changeUserPwd(userPwd)}
                                    onFocus={() => this.setState({userPwdStyle: {borderBottomWidth: 1, borderColor: '#C2D8E9'}})}
                                    onBlur={() => this.setState({userPwdStyle: {borderBottomWidth: 0, borderColor: '#C2D8E9'}})}
                                    value={userPwd}>
                                </Edit>
                            </View>
                            {this.renderPwCheckText()}
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>비밀번호 확인</Text></View>
                                <Edit
                                    height="60"
                                    style={[styles.textInput, userPwd2Style]}
                                    underlineColorAndroid="transparent"
                                    placeholder="비밀번호 확인"
                                    autoCompleteType="password"
                                    secureTextEntry={true}
                                    onChangeText={(userPwd2) => this.changeUserPwd2(userPwd2)}
                                    onFocus={() => this.setState({userPwd2Style: {borderBottomWidth: 1, borderColor: '#C2D8E9'}})}
                                    onBlur={() => this.setState({userPwd2Style: {borderBottomWidth: 0, borderColor: '#C2D8E9'}})}
                                    value={userPwd2}>
                                </Edit>
                            </View>
                            {this.renderPw2CheckText()}
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>이름</Text></View>
                                <Edit
                                    height="60"
                                    style={[styles.textInput, userNmStyle]}
                                    underlineColorAndroid="transparent"
                                    placeholder="한글/영문/숫자 6~12자"
                                    autoCompleteType="off"
                                    secureTextEntry={false}
                                    onChangeText={(userNm) => this.changeUserNm(userNm)}
                                    onFocus={() => this.setState({userNmStyle: {borderBottomWidth: 1, borderColor: '#C2D8E9'}})}
                                    onBlur={() => this.setState({userNmStyle: {borderBottomWidth: 0, borderColor: '#C2D8E9'}})}
                                    value={userNm}>
                                </Edit>
                            </View>
                            {this.renderUserNmCheckText()}
                            <View style={styles.row}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>email</Text></View>
                                <Edit
                                    height="60"
                                    style={[styles.textInput, emailStyle]}
                                    underlineColorAndroid="transparent"
                                    placeholder="xxx@xxxxxx"
                                    autoCompleteType="off"
                                    secureTextEntry={false}
                                    onChangeText={(email) => this.changeEmail(email)}
                                    onFocus={() => this.setState({emailStyle: {borderBottomWidth: 1, borderColor: '#C2D8E9'}})}
                                    onBlur={() => this.setState({emailStyle: {borderBottomWidth: 0, borderColor: '#C2D8E9'}})}
                                    value={email}>
                                </Edit>
                            </View>
                            {this.renderEmailCheckText()}
                            <View style={styles.profile}>
                                <View style={styles.profileImage} onPress={() => this.selectPhoto()}>
                                    {this.renderProfile()}
                                </View>
                                <View style={styles.selectPhotoRow}>
                                    <TouchableOpacity onPress={() => this.selectPhoto()}>
                                        <Text style={{fontSize: 14}}>selectPhoto</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                    <Button
                        buttonStyle={insertUserBtnStyle}
                        containerViewStyle={{width: '100%', marginLeft: 0, marginRight: 0}}
                        title='등록'
                        onPress={() => this.uploadPhoto()}/>
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
        flex: 1,
        backgroundColor: '#E6ECF0'
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