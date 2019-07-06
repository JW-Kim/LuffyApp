import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import {
    CheckBox
} from 'react-native-elements'
import Toast from 'react-native-toast-native';
import ModalHeader from '../Com/ModalHeader'
import Icons from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-scalable-image';
import PhotoUpload from 'react-native-photo-upload'
import ImagePicker from 'react-native-image-picker'
import NativeModules from 'NativeModules'
import _ from 'lodash'
import DiaryDtlCheckBox from './DiaryDtlCheckBox.js'
import Constants from '../../Com/Constants.js'
import {getToken} from '../../Com/AuthToken.js';
import ImageView from '../Com/ImageView.js'
import Edit from '../Com/Edit'

const toastStyle = {
    backgroundColor: "#acacac",
    width: 300,
    height: 100,
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 2,
    lines: 4,
    borderRadius: 15,
    fontWeight: "bold",
    yOffset: 40,
    opacity: 0.8
}

export default class DiaryDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            feelingCd: null,
            healthCd: null,
            feverCd: null,
            breakfastCd: null,
            lunchCd: null,
            dinnerCd: null,
            shitCd: null,
            shitCnt: '0',
            shitDesc: '',
            sleepStartTime: '',
            sleepEndTime: '',
            title: '',
            content: '',
            avatarSource: null,
            base64: '',
            type: this.props.navigation.getParam('type'),
            diaryId: this.props.navigation.getParam('diaryId'),
            noteId: this.props.navigation.getParam('noteId'),
            diaryDt: this.props.navigation.getParam('diaryDt'),
            fileId: null,
            height: '',
            weight: '',
            titleStyle: Constants.EDIT_BLUR_STYLE,
            contentStyle: Constants.MULTI_EDIT_BLUR_STYLE,
            heightStyle: Constants.EDIT_BLUR_STYLE,
            weightStyle: Constants.EDIT_BLUR_STYLE,
            shiCntStyle: Constants.EDIT_BLUR_STYLE,
            shitDescStyle: Constants.EDIT_BLUR_STYLE,
            sleepStartTimeStyle: Constants.EDIT_BLUR_STYLE,
            sleepEndTimeStyle: Constants.EDIT_BLUR_STYLE
        }

        let insertDiary = this.insertDiary.bind(this);

    }

    async componentDidMount() {
        if (this.state.type == 'UPDATE') {
            fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary/${this.state.diaryId}`, await getToken())
                .then((response) => response.json())
                .then((res) => {
                    console.log('res', res)
                    this.setState({
                        feelingCd: res.data.feelingCd,
                        healthCd: res.data.healthCd,
                        feverCd: res.data.feverCd,
                        breakfastCd: res.data.breakfastCd,
                        lunchCd: res.data.lunchCd,
                        dinnerCd: res.data.dinnerCd,
                        shitCd: res.data.shitCd,
                        shitCnt: res.data.shitCnt,
                        shitDesc: res.data.shitDesc,
                        sleepStartTime: res.data.sleepStartTime,
                        sleepEndTime: res.data.sleepEndTime,
                        title: res.data.title,
                        content: res.data.content,
                        fileId: res.data.fileId,
                        weight: res.data.weight + '',
                        height: res.data.height + ''
                    })
                })
                .catch((error) => {
                    Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                    this.props.navigation.navigate('Login')
                });
        }
    }

    async insertDiaryInfo(fileId) {
        //2.파일 정보
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary`, await getToken({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                feelingCd: this.state.feelingCd == null ? '' : this.state.feelingCd,
                healthCd: this.state.healthCd == null ? '' : this.state.healthCd,
                feverCd: this.state.feverCd == null ? '' : this.state.feverCd,
                breakfastCd: this.state.breakfastCd == null ? '' : this.state.breakfastCd,
                lunchCd: this.state.lunchCd == null ? '' : this.state.lunchCd,
                dinnerCd: this.state.dinnerCd == null ? '' : this.state.dinnerCd,
                shitCd: this.state.shitCd == null ? '' : this.state.shitCd,
                shitCnt: this.state.shitCnt == null ? '0' : this.state.shitCnt,
                shitDesc: this.state.shitDesc == null ? '' : this.state.shitDesc,
                sleepStartTime: this.state.sleepStartTime == null ? '' : this.state.sleepStartTime,
                sleepEndTime: this.state.sleepEndTime == null ? '' : this.state.sleepEndTime,
                title: this.state.title == null ? '' : this.state.title,
                content: this.state.content == null ? '' : this.state.content,
                fileId: fileId == null ? null : fileId,
                noteId: this.state.noteId == null ? '' : this.state.noteId,
                diaryDt: this.state.diaryDt == null ? null : this.state.diaryDt,
                height: this.state.height == '' ? 0 : this.state.height,
                weight: this.state.weight == '' ? 0 : this.state.weight
            })
        }))
            .then((response) => response.json())
            .then((responseJson) => {
                Toast.show('저장되었습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                let refreshFnc = this.props.navigation.getParam('refreshFnc');
                refreshFnc();
                this.props.navigation.goBack();
                console.log(responseJson)
            })
            .catch((error) => {
                Toast.show('정보 저장을 실패하였습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                this.props.navigation.navigate('Login')
            });
    }

    async updateDiaryInfo(fileId) {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary/${this.state.diaryId}`, await getToken({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                feelingCd: this.state.feelingCd == null ? '' : this.state.feelingCd,
                healthCd: this.state.healthCd == null ? '' : this.state.healthCd,
                feverCd: this.state.feverCd == null ? '' : this.state.feverCd,
                breakfastCd: this.state.breakfastCd == null ? '' : this.state.breakfastCd,
                lunchCd: this.state.lunchCd == null ? '' : this.state.lunchCd,
                dinnerCd: this.state.dinnerCd == null ? '' : this.state.dinnerCd,
                shitCd: this.state.shitCd == null ? '' : this.state.shitCd,
                shitCnt: this.state.shitCnt == null ? '0' : this.state.shitCnt,
                shitDesc: this.state.shitDesc == null ? '' : this.state.shitDesc,
                sleepStartTime: this.state.sleepStartTime == null ? '' : this.state.sleepStartTime,
                sleepEndTime: this.state.sleepEndTime == null ? '' : this.state.sleepEndTime,
                title: this.state.title == null ? '' : this.state.title,
                content: this.state.content == null ? '' : this.state.content,
                fileId: fileId == null ? null : fileId,
                height: this.state.height == null ? 0 : this.state.height,
                weight: this.state.weight == null ? 0 : this.state.weight
            })
        }))
            .then((response) => response.json())
            .then((responseJson) => {
                Toast.show('저장되었습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                let refreshFnc = this.props.navigation.getParam('refreshFnc');
                refreshFnc();
                this.props.navigation.goBack();
                console.log(responseJson)
            })
            .catch((error) => {
                Toast.show('정보 저장을 실패하였습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                this.props.navigation.navigate('Login')
            });
    }

    async insertDiary() {
        var cur = this;

        if (this.state.type == 'INSERT') {
            //1.파일 업로드
            if (!_.isNil(cur.state.avatarSource)) {
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
                    cur.insertDiaryInfo(JSON.parse(result.data).data.fileId);
                })
            } else {
                cur.insertDiaryInfo();
            }
        } else if (this.state.type == 'UPDATE') {
            if (_.isNil(cur.state.fileId) && !_.isNil(cur.state.avatarSource)) {
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
                    cur.updateDiaryInfo(JSON.parse(result.data).data.fileId);
                })

            } else {
                cur.updateDiaryInfo(cur.state.fileId);
            }
        }
    }

    selectPhotoTapped() {
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
                /*                let source = {
                                    uri: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
                                };*/

                this.setState({
                    avatarSource: source,
                    base64: response.data,
                    fileId: null
                });
            }
        });
    }

    renderImageView() {
       const {avatarSource, fileId} = this.state;

       if(avatarSource !== null) {
           return(
               <View>
                   <Image width={Dimensions.get('window').width - 20} source={this.state.avatarSource}/>
               </View>
           )
       }

       if(fileId !== null) {
           return (
               <View>
                   <ImageView fileId={this.state.fileId} width={Dimensions.get('window').width - 20}></ImageView>
               </View>
           )
       }

       return;
    }

    render() {
        const {navigation} = this.props;
        const {
            titleStyle,
            contentStyle,
            heightStyle,
            weightStyle,
            shiCntStyle,
            shitDescStyle,
            sleepStartTimeStyle,
            sleepEndTimeStyle
        } = this.state;

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ModalHeader
                    title="일기 작성"
                    goEvent={this.insertDiary.bind(this)}
                    buttonTitle={'저장'}
                    navigation={navigation}
                ></ModalHeader>
                <View style={{height: Dimensions.get('window').height - 148}}>
                    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} enabled>
                        <ScrollView style={{padding: 20}}>
                            {this.renderImageView()}
                            <View style={styles.title}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>제목</Text></View>
                                <View style={{paddingLeft: 20, flex: 1}}>
                                    <Edit
                                        height="60"
                                        style={[styles.textInput, titleStyle]}
                                        underlineColorAndroid="transparent"
                                        placeholder="제목을 입력하세요"
                                        autoCompleteType="off"
                                        secureTextEntry={false}
                                        onFocus={() => this.setState({titleStyle: Constants.EDIT_FOCUS_STYLE})}
                                        onBlur={() => this.setState({titleStyle: Constants.EDIT_BLUR_STYLE})}
                                        onChangeText={(title) => this.setState({title})}
                                        value={this.state.title}
                                    >
                                    </Edit>
                                </View>
                            </View>
                            <View style={styles.checkContent}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>내용</Text></View>
                                <View style={{paddingLeft: 20, flex: 1}}>
                                    <TextInput
                                        style={[{flex: 1, fontSize: 16}, contentStyle]}
                                        underlineColorAndroid="transparent"
                                        placeholder="내용을 입력하세요"
                                        autoCompleteType="off"
                                        secureTextEntry={false}
                                        onFocus={() => this.setState({contentStyle: Constants.MULTI_EDIT_FOCUS_STYLE})}
                                        onBlur={() => this.setState({contentStyle: Constants.MULTI_EDIT_BLUR_STYLE})}
                                        numberOfLines={10}
                                        multiline={true}
                                        onChangeText={(content) => this.setState({content})}
                                        value={this.state.content}
                                    >
                                    </TextInput>
                                </View>
                            </View>
                            <View style={[styles.checkContent, {height: 60}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>키</Text></View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 20
                                }}>
                                    <View style={{flex: 1}}>
                                        <Edit
                                            height="60"
                                            style={[styles.textInput, heightStyle]}
                                            underlineColorAndroid="transparent"
                                            placeholder="숫자만 입력하세요"
                                            autoCompleteType="off"
                                            secureTextEntry={false}
                                            onFocus={() => this.setState({heightStyle: Constants.EDIT_FOCUS_STYLE})}
                                            onBlur={() => this.setState({heightStyle: Constants.EDIT_BLUR_STYLE})}
                                            onChangeText={(height) => this.setState({height})}
                                            value={this.state.height}
                                        ></Edit>
                                    </View>
                                    <View>
                                        <Text style={styles.rowText}>cm</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.checkContent, {height: 60}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>몸무게</Text></View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 20
                                }}>
                                    <View style={{flex: 1}}>
                                        <Edit
                                            height="60"
                                            style={[styles.textInput, weightStyle]}
                                            underlineColorAndroid="transparent"
                                            placeholder="숫자만 입력하세요"
                                            autoCompleteType="off"
                                            secureTextEntry={false}
                                            onFocus={() => this.setState({weightStyle: Constants.EDIT_FOCUS_STYLE})}
                                            onBlur={() => this.setState({weightStyle: Constants.EDIT_BLUR_STYLE})}
                                            onChangeText={(weight) => this.setState({weight})}
                                            value={this.state.weight}
                                        ></Edit>
                                    </View>
                                    <View>
                                        <Text style={styles.rowText}>kg</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.checkContent, {height: 60}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>기분</Text></View>
                                <DiaryDtlCheckBox code={this.state.feelingCd}
                                                  setCode={(feelingCd) => this.setState({feelingCd})}></DiaryDtlCheckBox>
                            </View>
                            <View style={[styles.checkContent, {height: 60}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>건강</Text></View>
                                <DiaryDtlCheckBox code={this.state.healthCd}
                                                  setCode={(healthCd) => this.setState({healthCd})}></DiaryDtlCheckBox>
                            </View>
                            <View style={[styles.checkContent, {height: 60}]}>
                                <View style={{width: 70, alignItems: 'flex-start'}}>
                                    <View style={styles.rowTextField}><Text style={styles.rowText}>열</Text></View>
                                </View>
                                <View>
                                    <DiaryDtlCheckBox code={this.state.feverCd}
                                                      setCode={(feverCd) => this.setState({feverCd})}></DiaryDtlCheckBox>
                                </View>
                            </View>
                            <View style={[styles.checkContent, {height: 60}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>아침식사</Text></View>
                                <DiaryDtlCheckBox code={this.state.breakfastCd}
                                                  setCode={(breakfastCd) => this.setState({breakfastCd})}></DiaryDtlCheckBox>
                            </View>
                            <View style={[styles.checkContent, {height: 60}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>점심식사</Text></View>
                                <DiaryDtlCheckBox code={this.state.lunchCd}
                                                  setCode={(lunchCd) => this.setState({lunchCd})}></DiaryDtlCheckBox>
                            </View>
                            <View style={[styles.checkContent, {height: 60}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>저녁식사</Text></View>
                                <DiaryDtlCheckBox code={this.state.dinnerCd}
                                                  setCode={(dinnerCd) => this.setState({dinnerCd})}></DiaryDtlCheckBox>
                            </View>
                            <View style={[styles.checkContent, {height: 120}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>배변</Text></View>
                                <View>
                                    <DiaryDtlCheckBox code={this.state.shitCd}
                                                      setCode={(shitCd) => this.setState({shitCd})}></DiaryDtlCheckBox>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingLeft: 10,
                                        height: 60
                                    }}>
                                        <View style={{flex: 0.3}}>
                                            <Edit
                                                height="60"
                                                style={[styles.textInput, shiCntStyle]}
                                                underlineColorAndroid="transparent"
                                                placeholder="예) 1"
                                                autoCompleteType="off"
                                                secureTextEntry={false}
                                                onFocus={() => this.setState({shiCntStyle: Constants.EDIT_FOCUS_STYLE})}
                                                onBlur={() => this.setState({shiCntStyle: Constants.EDIT_BLUR_STYLE})}
                                                onChangeText={(shitCnt) => this.setState({shitCnt})}
                                                value={this.state.shitCnt}
                                            ></Edit>
                                        </View>
                                        <View style={{flex: 0.2}}>
                                            <Text style={styles.rowText}>회</Text>
                                        </View>
                                        <View style={{flex: 0.5}}>
                                            <Edit
                                                height="60"
                                                style={[styles.textInput, shitDescStyle]}
                                                underlineColorAndroid="transparent"
                                                placeholder="배변 설명"
                                                autoCompleteType="off"
                                                secureTextEntry={false}
                                                onFocus={() => this.setState({shitDescStyle: Constants.EDIT_FOCUS_STYLE})}
                                                onBlur={() => this.setState({shitDescStyle: Constants.EDIT_BLUR_STYLE})}
                                                onChangeText={(shitDesc) => this.setState({shitDesc})}
                                                value={this.state.shitDesc}
                                            ></Edit>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.checkContent, {height: 60, marginBottom: 20}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>수면</Text></View>
                                <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
                                    <Edit
                                        height="60"
                                        style={[styles.textInput, sleepStartTimeStyle]}
                                        underlineColorAndroid="transparent"
                                        placeholder="예) 22"
                                        autoCompleteType="off"
                                        secureTextEntry={false}
                                        onFocus={() => this.setState({sleepStartTimeStyle: Constants.EDIT_FOCUS_STYLE})}
                                        onBlur={() => this.setState({sleepStartTimeStyle: Constants.EDIT_BLUR_STYLE})}
                                        onChangeText={(sleepStartTime) => this.setState({sleepStartTime})}
                                        value={this.state.sleepStartTime}
                                    >
                                    </Edit>
                                </View>
                                <View style={{justifyContent: 'center'}}><Text style={{flex: 0.2}}>~</Text></View>
                                <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
                                    <Edit
                                        height="60"
                                        style={[styles.textInput, sleepEndTimeStyle]}
                                        underlineColorAndroid="transparent"
                                        placeholder="예) 7"
                                        autoCompleteType="off"
                                        secureTextEntry={false}
                                        onFocus={() => this.setState({sleepEndTimeStyle: Constants.EDIT_FOCUS_STYLE})}
                                        onBlur={() => this.setState({sleepEndTimeStyle: Constants.EDIT_BLUR_STYLE})}
                                        onChangeText={(sleepEndTime) => this.setState({sleepEndTime})}
                                        value={this.state.sleepEndTime}
                                    >
                                    </Edit>
                                    <Text style={styles.rowText}>시</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
                <TouchableOpacity style={styles.eventIcons} onPress={this.selectPhotoTapped.bind(this)}>
                    <Icons name="image" color="#00cc00" size={18}/>
                    <Text style={{marginLeft: 5, fontSize: 18}}> 사진 </Text>
                </TouchableOpacity>
            </View>
        )

    }

}


const styles = StyleSheet.create({
    eventIcons: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#d9e6f2',
        flex: 1
    },

    checkContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        justifyContent: 'space-between'
    },

    checkBox: {
        width: 69,
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 0,
        borderWidth: 0
    },

    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    },

    avatarContainer: {
        borderColor: '#9B9B9B',
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 60
    },
    rowTextField: {
        paddingRight: 20,
        width: 80,
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
})
