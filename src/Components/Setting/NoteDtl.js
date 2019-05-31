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
    Picker
} from 'react-native';
import ModalHeader from '../ModalHeader.js';
import Toast from 'react-native-toast-native';
import Constants from '../../Com/Constants.js';
import DatePicker from 'react-native-datepicker';

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

export default class NoteDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.navigation.getParam('type'),
            noteId: this.props.navigation.getParam('noteId'),
            noteNm: null,
            sex: null,
            birthDt: null
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('access_token', (err, result) => {
            this.setState({
                token: result
            }, () => {
                /*  if(this.state.type == 'UPDATE'){
                    fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/diary/disease/'+this.state.diseaseId,{
                          headers: {
                              'Authorization': 'Bearer '+this.state.token
                          }
                     })
                          .then((response) => response.json())
                          .then((res) => {
                              console.log('res', res)
                              this.setState({
                                  diseaseNm: res.data.diseaseNm,
                                  symptom: res.data.symptom,
                                       hospitalNm : res.data.hospitalNm,
                                      prescription : res.data.prescription
                                })
                          })
                          .catch((error) => {
                              Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                              this.props.navigation.navigate('Login')
                          });
                        } */
            })
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ModalHeader
                    title="노트 작성"
                    goEvent={this.setNote.bind(this)}
                    buttonTitle={'글쓰기'}
                ></ModalHeader>
                <View style={{height: Dimensions.get('window').height - 148}}>
                    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} enabled>
                        <ScrollView style={{padding: 10}}>
                            <View style={styles.checkContent}>
                                <Text style={{width: 70, fontSize: 15, fontWeight: '800'}}>노트 이름</Text>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 50,
                                    paddingRight: 20
                                }}>
                                    <TextInput
                                        style={{flex: 1}}
                                        onChangeText={(noteNm) => this.setState({noteNm})}
                                        value={this.state.noteNm}
                                    ></TextInput>
                                </View>
                            </View>
                            <View style={[styles.checkContent, {height: 200}]}>
                                <Text style={{width: 70, fontSize: 15, fontWeight: '800'}}>성별</Text>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 50,
                                    paddingRight: 20
                                }}>
                                    <Picker
                                        mode='dropdown'
                                        style={{height: 50, width: 200, color: '#000'}}
                                        onValueChange={(itemValue, itemIndex) => this.changeSex(itemValue)}
                                        selectedValue={this.state.sex}
                                    >
                                        <Picker.Item label='남자' value='M'/>
                                        <Picker.Item label='여자' value='W'/>
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.checkContent}>
                                <Text style={{width: 70, fontSize: 15, fontWeight: '800'}}>출생일</Text>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 50,
                                    paddingRight: 20
                                }}>
                                    <DatePicker
                                        style={{width: 200}}
                                        date={this.state.birthDt}
                                        mode='date'
                                        androidMode='spinner'
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
                                            this.setState({birthDt: birthDt})
                                        }}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        )
    }

    setNote() {
        var cur = this;

        if (this.state.type == 'INSERT') {
            cur.insertNote();

        } else if (this.state.type == 'UPDATE') {
            cur.updateNote();

        }
    }


    insertNote() {
        fetch('http://' + Constants.HOST + ':' + Constants.PORT + '/product/note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                noteNm: this.state.noteNm == null ? '' : this.state.noteNm,
                sex: this.state.sex == null ? '' : this.state.sex,
                birthDt: this.state.birthDt == null ? '' : this.state.birthDt
            })
        })
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


    updateNote() {
        fetch('http://' + Constants.HOST + ':' + Constants.PORT + '/product/note/' + this.state.noteId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                noteNm: this.state.noteNm == null ? '' : this.state.noteNm,
                sex: this.state.sex == null ? '' : this.state.sex,
                birthDt: this.state.birthDt == null ? '' : this.state.birthDt

            })
        })
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

    changeSex(sex) {
        this.setState({
            sex: sex
        })
    }
}

const styles = StyleSheet.create({
    checkContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 10,
        justifyContent: 'space-between',
        borderLeftWidth: 0.8,
        borderTopWidth: 0.8,
        borderRightWidth: 0.8,
        borderColor: '#ebe0eb'
    }
})
