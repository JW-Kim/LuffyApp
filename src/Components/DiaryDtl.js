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
import ModalHeader from './ModalHeader'
import Icons from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-scalable-image';
import PhotoUpload from 'react-native-photo-upload'
import ImagePicker from 'react-native-image-picker'
import NativeModules from 'NativeModules'
import _ from 'lodash'
import DiaryDtlCheckBox from './DiaryDtlCheckBox.js'
import Constants from '../Com/Constants.js'
import {getToken} from '../Com/AuthToken.js';
import ImageView from './ImageView.js'

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
            height: null,
            weight: null
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
                                <View style={{paddingLeft: 10, flex: 1}}>
                                    <TextInput style={{flex: 1}}
                                               onChangeText={(title) => this.setState({title})}
                                               value={this.state.title}
                                    >
                                    </TextInput>
                                </View>
                            </View>
                            <View style={styles.checkContent}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>내용</Text></View>
                                <View style={{paddingLeft: 10, flex: 1}}>
                                    <TextInput style={{flex: 1}}
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
                                    paddingLeft: 10
                                }}>
                                    <TextInput
                                        style={{width: 100}}
                                        onChangeText={(height) => this.setState({height})}
                                        value={this.state.height}
                                    ></TextInput>
                                    <Text style={{width: 50}}>cm</Text>
                                </View>
                            </View>
                            <View style={[styles.checkContent, {height: 60}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>몸무게</Text></View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 10
                                }}>
                                    <TextInput
                                        style={{width: 100}}
                                        onChangeText={(weight) => this.setState({weight})}
                                        value={this.state.weight}
                                    ></TextInput>
                                    <Text>kg</Text>
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
                            <View style={[styles.checkContent, {height: 120}]}>
                                <View style={{width: 70, alignItems: 'flex-start'}}>
                                    <View style={styles.rowTextField}><Text style={styles.rowText}>열</Text></View>
                                </View>
                                <View>
                                    <DiaryDtlCheckBox code={this.state.feverCd}
                                                      setCode={(feverCd) => this.setState({feverCd})}></DiaryDtlCheckBox>
                                    <View style={{paddingLeft: 10, paddingRight: 20}}>
                                        <TextInput></TextInput>
                                    </View>
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
                                        paddingRight: 20
                                    }}>
                                        <TextInput style={{flex: 0.2, marginRight: 3}}
                                                   onChangeText={(shitCnt) => this.setState({shitCnt})}
                                                   value={this.state.shitCnt}
                                        ></TextInput>
                                        <Text style={[styles.rowText, {width: 15, marginRight: 10}]}>회</Text>
                                        <TextInput style={{flex: 0.9}}
                                                   onChangeText={(shitDesc) => this.setState({shitDesc})}
                                                   value={this.state.shitDesc}
                                        ></TextInput>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.checkContent, {height: 60}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>수면</Text></View>
                                <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center', paddingLeft: 50}}>
                                    <TextInput
                                        style={{width: 40}}
                                        onChangeText={(sleepStartTime) => this.setState({sleepStartTime})}
                                        value={this.state.sleepStartTime}
                                    >
                                    </TextInput>
                                    <Text>시</Text>
                                </View>
                                <Text style={{flex: 0.2}}>~</Text>
                                <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
                                    <TextInput
                                        style={{width: 40}}
                                        onChangeText={(sleepEndTime) => this.setState({sleepEndTime})}
                                        value={this.state.sleepEndTime}
                                    >
                                    </TextInput>
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
        paddingRight: 20,
        height: 60
    },
    rowTextField: {
        paddingRight: 20,
        width: 80,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 16
    }
})
