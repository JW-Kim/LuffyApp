import React, {
    Component
} from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    StyleSheet,
    Dimensions,
    AsyncStorage,
    Picker,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import {
    Button
} from 'react-native-elements';
import ModalHeader from '../Com/ModalHeader.js';
import Toast from 'react-native-toast-native';
import Constants from '../../Com/Constants.js';
import {getToken, getTokenJson} from '../../Com/AuthToken.js';
import ModalStandardHeader from '../Com/ModalStandardHeader'
import Edit from '../Com/Edit';
import DatePicker from 'react-native-datepicker';
import NoteDtlShare from './NoteDtlShare.js';
import NoteDtlCfg from './NoteDtlCfg';
import ImageView from '../Com/ImageView.js';
import ImagePicker from 'react-native-image-picker';
import Icons from 'react-native-vector-icons/FontAwesome';
import NativeModules from 'NativeModules';
import ComCss from '../../../assets/style/ComCss';
import {chkSpecialStr} from '../../Com/ComService';
import _ from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob';

export default class NoteDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.navigation.getParam('type'),
            noteId: this.props.navigation.getParam('noteId'),
            noteNm: '',
            sex: null,
            birthDt: null,
            insertNoteDtlBtnStyle: ComCss.inActiveBtn,
            noteNmStyle: Constants.EDIT_BLUR_STYLE,
            shareList: [],
            noteCfgList: [],
            fileId: null,
            avatarSource: null,
            isNoteNm: false,
            isSex: false,
            isBirthDt: false,
            isProfile: false,
            isNoteCfgList: false
        }

        let setNote = this.setNote.bind(this);
        let checkInsertBtnStyle = this.checkInsertBtnStyle.bind(this);
    }

    async componentWillMount() {
        const {noteId, type} = this.state;
        if (this.props.navigation.getParam('type') == 'UPDATE') {
            RNFetchBlob.config({
                trusty: true
            })
                .fetch('GET', `${Constants.DOMAIN}/product/note/${noteId}`, await getTokenJson())
                .then((response) => {
                    let status = response.info().status;

                    if (status == 200) {
                        let res = response.json();
                            this.setState({
                                noteNm: res.data.noteNm,
                                sex: res.data.sex,
                                birthDt: res.data.birthDt,
                                fileId: res.data.fileId,
                                avatarSource: null,
                                isNoteNm: true,
                                isSex: true,
                                isBirthDt: true,
                                isProfile: true
                            })
                    } else {
                        ToastAndroid.show('조회를 실패하였습니다.', ToastAndroid.SHORT);
                        this.props.navigation.navigate('Login')
                    }
                })
                .catch((error) => {
                    ToastAndroid.show('조회를 실패하였습니다.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                });
        }
    }

    async setNote() {
        const {avatarSource, type} = this.state;
        let fileId = null;
        if(_.isNil(fileId) && !_.isNil(avatarSource)) {
            await this.uploadPhoto();

        } else {
            if (this.state.type == 'INSERT') {
                this.insertNote();

            } else if (this.state.type == 'UPDATE') {
                this.updateNote();
            }
        }
    }


    async insertNote() {
        const {shareList, fileId, isNoteNm, isBirthDt, noteCfgList} = this.state;

        if(!isNoteNm || !isBirthDt) {
            ToastAndroid.show('노트명과 출생일을 입력해주세요.', ToastAndroid.SHORT);
            return;
        }

        RNFetchBlob.config({
            trusty: true
        })
            .fetch('POST', `${Constants.DOMAIN}/product/note`, await getTokenJson({
               'Content-Type': 'application/json'
            }),JSON.stringify({
                noteNm: this.state.noteNm == null ? '' : this.state.noteNm,
                sex: this.state.sex == null ? '' : this.state.sex,
                birthDt: this.state.birthDt == null ? '' : this.state.birthDt,
                shareList,
                fileId,
                noteCfgList
            }))
            .then((response) => {
                let status = response.info().status;

                if (status == 200) {
                    let res = response.json();
                    ToastAndroid.show('저장되었습니다.', ToastAndroid.SHORT);
                    let refreshFnc = this.props.navigation.getParam('refreshFnc');
                    refreshFnc();
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


    async updateNote() {
        const {noteId, fileId, isNoteNm, isSex, isBirthDt, isProfile, noteCfgList} = this.state;
        console.log('updateNote', fileId)
        if(!(isNoteNm || isSex || isBirthDt || isProfile)) {
            ToastAndroid.show('노트명과 출생일을 입력해주세요.', ToastAndroid.SHORT);
            return;
        }

        RNFetchBlob.config({
            trusty: true
        })
            .fetch('POST', `${Constants.DOMAIN}/product/note/${noteId}`, await getTokenJson({
                'Content-Type': 'application/json'
            }),
            JSON.stringify({
                noteNm: this.state.noteNm == null ? '' : this.state.noteNm,
                sex: this.state.sex == null ? '' : this.state.sex,
                birthDt: this.state.birthDt == null ? '' : this.state.birthDt,
                fileId,
                noteCfgList
            }))
            .then((response) => {
                let status = response.info().status;

                if (status == 200) {
                    let res = response.json();
                    ToastAndroid.show('저장되었습니다.', ToastAndroid.SHORT);
                    let refreshFnc = this.props.navigation.getParam('refreshFnc');
                    refreshFnc();
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

    async uploadPhoto() {
        var cur = this;
        const {avatarSource, type} = this.state;

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
            cur.setState({fileId: JSON.parse(result.data).data.fileId});

            if (type == 'INSERT') {
                cur.insertNote();

            } else if (type == 'UPDATE') {
                cur.updateNote();
            }
        })
    }

    checkInsertBtnStyle() {
        const {type, isNoteNm, isSex, isBirthDt, isProfile, isNoteCfgList} = this.state;

        if(type === 'INSERT') {
            if (isNoteNm && isBirthDt) {
                this.setState({insertNoteDtlBtnStyle: ComCss.activeBtn})
            } else {
                this.setState({insertNoteDtlBtnStyle: ComCss.inActiveBtn})
            }
        } else {
            if (isNoteNm || isSex || isBirthDt || isProfile || isNoteCfgList) {
                this.setState({insertNoteDtlBtnStyle: ComCss.activeBtn})
            } else {
                this.setState({insertNoteDtlBtnStyle: ComCss.inActiveBtn})
            }
        }
    }

    changeNoteNm(noteNm) {
        const cur = this;
        let isNoteNm = true;

        if(chkSpecialStr(noteNm) || noteNm === '') {
            isNoteNm = false;
        }

        this.setState({noteNm, isNoteNm}, () => {
            cur.checkInsertBtnStyle();
        })
    }

    changeSex(sex) {
        const cur = this;
        let isSex = true;

        if(sex === '') {
            isSex = false;
        }

        this.setState({sex, isSex}, () => {
            cur.checkInsertBtnStyle();
        })
    }

    changeBirthDt(birthDt) {
        const cur = this;
        let isBirthDt = true;

        if(birthDt === '') {
            isBirthDt = false;
        }

        this.setState({birthDt, isBirthDt}, () => {
            cur.checkInsertBtnStyle();
        })
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
        const {type, noteNm} = this.state;

        return (
            <TouchableOpacity style={styles.profile} onPress={() => this.selectPhoto()}>
                <View style={styles.profileImage} onPress={() => this.selectPhoto()}>
                    {this.renderProfile()}
                </View>
                <View style={styles.selectPhotoRow}>
                    <View>
                        <Text style={styles.rowText}>사진 선택</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    render() {
        const {navigation} = this.props;
        const {noteId, insertNoteDtlBtnStyle, noteNmStyle, type} = this.state;

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ModalStandardHeader title="노트 작성" navigation={navigation} />
                <ScrollView style={{height: Dimensions.get('window').height - 140}}>
                    <View style={{flex: 1}}>
                        <View style={{marginLeft: 20, marginTop: 20}}>
                            <Text style={styles.rowTitle}>노트 정보</Text>
                        </View>
                        {this.renderProfileRow()}
                        <View style={{paddingLeft: 28, paddingRight: 20, height: 180}}>
                            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} enabled>
                                <View style={styles.checkContent}>
                                    <View style={styles.rowTextField}><Text style={styles.rowText}>노트 이름</Text></View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Edit
                                            onRef={(input) => { this.noteNmTextInput = input; }}
                                            height="60"
                                            style={[styles.textInput, noteNmStyle]}
                                            underlineColorAndroid="transparent"
                                            placeholder="영문/숫자 10자"
                                            autoCompleteType="off"
                                            secureTextEntry={false}
                                            onFocus={() => this.setState({noteNmStyle: Constants.EDIT_FOCUS_STYLE})}
                                            onBlur={() => this.setState({noteNmStyle: Constants.EDIT_BLUR_STYLE})}
                                            onChangeText={(noteNm) => this.changeNoteNm(noteNm)}
                                            value={this.state.noteNm}
                                        ></Edit>
                                    </View>
                                </View>
                                <View style={styles.checkContent}>
                                    <View style={styles.rowTextField}><Text style={styles.rowText}>성별</Text></View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Picker
                                            mode='dropdown'
                                            style={{height: 50, width: '100%', color: '#000'}}
                                            onValueChange={(sex, itemIndex) => this.changeSex(sex)}
                                            selectedValue={this.state.sex}
                                        >
                                            <Picker.Item label='남자' value='M'/>
                                            <Picker.Item label='여자' value='W'/>
                                        </Picker>
                                    </View>
                                </View>
                                <View style={styles.checkContent}>
                                    <View style={styles.rowTextField}><Text style={styles.rowText}>출생일</Text></View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <DatePicker
                                            style={{width: '100%'}}
                                            date={this.state.birthDt}
                                            mode='date'
                                            androidMode='default'
                                            placeholder='날짜를 선택하세요'
                                            format='YYYY-MM-DD'
                                            confirmBtnText=''
                                            cancelBtnText=''
                                            customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 4,
                                                    marginLeft: 0
                                                },
                                                dateInput: {
                                                    marginLeft: 36
                                                }
                                            }}
                                            onDateChange={(birthDt) => {
                                                this.changeBirthDt(birthDt)
                                            }}
                                        />
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                        <NoteDtlCfg
                            navigation={this.props.navigation}
                            type={type}
                            noteId={noteId}
                            setNoteCfgList={(noteCfgList, isNoteCfgList) => this.setState({noteCfgList, isNoteCfgList}, () => {if(isNoteCfgList){this.checkInsertBtnStyle()}})} />
                        <NoteDtlShare noteId={noteId} navigation={this.props.navigation} type={type} setShareList={(shareList) => this.setState({shareList})} />
                    </View>
                </ScrollView>
                <View style={{height:60}}>
                    <Button
                        buttonStyle={insertNoteDtlBtnStyle}
                        containerViewStyle={{width: '100%', marginLeft: 0, marginRight: 0}}
                        title="저장"
                        onPress={() => this.setNote()} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    checkContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        justifyContent: 'space-between',
        height: 60
    },
    rowTextField: {
        paddingRight: 20,
        width: 130,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 16
    },
    textInput: {
        paddingLeft: 8,
        paddingRight: 35,
        height: 60,
        fontSize: 16,
        flex: 1
    },
    rowTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    profile: {
        height: 160,
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
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
