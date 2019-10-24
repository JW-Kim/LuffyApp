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
    ToastAndroid
} from 'react-native';
import {
    Button
} from 'react-native-elements';
import _ from 'lodash';
import ModalHeader from '../Com/ModalHeader.js'
import Toast from 'react-native-toast-native';
import Constants from '../../Com/Constants.js';
import {getToken, getTokenJson} from '../../Com/AuthToken.js';
import ModalStandardHeader from '../Com/ModalStandardHeader'
import Edit from '../Com/Edit'
import RNFetchBlob from 'react-native-fetch-blob';
import {getTodayDt} from '../../Com/ComService.js';

export default class NoteDiseaseDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.navigation.getParam('type'), noteId: this.props.navigation.getParam('noteId'),
            diseaseDt: this.props.navigation.getParam('diseaseDt'),
            diseaseId: this.props.navigation.getParam('diseaseId'),
            diseaseNm: '',
            hospitalNm: '',
            saveNoteDiseaseBtnStyle: {backgroundColor: '#C2D8E9', height: 60},
            diseaseNmStyle: Constants.EDIT_BLUR_STYLE,
            hospitalNmStyle: Constants.EDIT_BLUR_STYLE,
            prescriptionStyle: Constants.MULTI_EDIT_BLUR_STYLE,
            symptomStyle: Constants.MULTI_EDIT_BLUR_STYLE
        }

        let setDisease = this.setDisease.bind(this);
    }

    async componentWillMount() {
        if (this.state.type == 'UPDATE') {
            RNFetchBlob.config({
                trusty: true
            })
                .fetch('GET', `${Constants.DOMAIN}/product/diary/disease/${this.state.diseaseId}`, await getTokenJson())
                .then((response) => {
                    let status = response.info().status;

                    if (status == 200) {
                        let res = response.json();
                        this.setState({
                            diseaseNm: res.data.diseaseNm,
                            symptom: res.data.symptom,
                            hospitalNm: res.data.hospitalNm,
                            prescription: res.data.prescription
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

    setDisease() {
        var cur = this;

        if (this.state.type == 'INSERT') {
            cur.insertDisease();

        } else if (this.state.type == 'UPDATE') {
            cur.updateDisease();

        }
    }


    async insertDisease() {
        RNFetchBlob.config({
            trusty: true
        })
            .fetch('POST', `${Constants.DOMAIN}/product/diary/disease`, await getTokenJson({
                'Content-Type': 'application/json'
            }),
            JSON.stringify({
                noteId: this.state.noteId == null ? '' : this.state.noteId,
                diseaseDt: this.state.diseaseDt == null ? '' : this.state.diseaseDt,
                diseaseNm: _.isNil(this.state.diseaseNm) || this.state.diseaseNm == '' ? getTodayDt() : this.state.diseaseNm,
                symptom: this.state.symptom == null ? '' : this.state.symptom,
                hospitalNm: this.state.hospitalNm == null ? '' : this.state.hospitalNm,
                prescription: this.state.prescription == null ? '' : this.state.prescription,
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


    async updateDisease() {
        RNFetchBlob.config({
            trusty: true
        })
            .fetch('POST', `${Constants.DOMAIN}/product/diary/disease/${this.state.diseaseId}`, await getTokenJson({
                'Content-Type': 'application/json'
            }),
            JSON.stringify({
                noteId: this.state.noteId == null ? '' : this.state.noteId,
                diseaseDt: this.state.diseaseDt == null ? '' : this.state.diseaseDt,
                diseaseNm: _.isNil(this.state.diseaseNm) || this.state.diseaseNm == '' ? getTodayDt() : this.state.diseaseNm,
                symptom: this.state.symptom == null ? '' : this.state.symptom,
                hospitalNm: this.state.hospitalNm == null ? '' : this.state.hospitalNm,
                prescription: this.state.prescription == null ? '' : this.state.prescription,
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

    render() {
        const {navigation} = this.props;
        const {saveNoteDiseaseBtnStyle, diseaseNmStyle, hospitalNmStyle, prescriptionStyle, symptomStyle, symptom, hospitalNm, prescription} = this.state;

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ModalStandardHeader title="질병 작성" navigation={navigation}/>
                <KeyboardAvoidingView style={{flex: 1, width: '100%', }} enabled>
                    <ScrollView style={{padding: 10, height: Dimensions.get('window').height - 140}}>
                        <View style={styles.checkContent}>
                            <View style={styles.rowTextField}><Text style={styles.rowText}>병명</Text></View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Edit
                                    onRef={(input) => { this.diseaseNmTextInput = input; }}
                                    style={[styles.textInput, diseaseNmStyle]}
                                    height="60"
                                    underlineColorAndroid="transparent"
                                    placeholder="영문/숫자 6~12자"
                                    autoCompleteType="off"
                                    secureTextEntry={false}
                                    onFocus={() => this.setState({diseaseNmStyle: Constants.EDIT_FOCUS_STYLE})}
                                    onBlur={() => {this.setState({diseaseNmStyle: Constants.EDIT_BLUR_STYLE})
                                        if(symptom == null || symptom == '') {
                                            this.symptomTextInput.focus();
                                        }
                                    }}
                                    onChangeText={(diseaseNm) => this.setState({diseaseNm})}
                                    value={this.state.diseaseNm}
                                ></Edit>
                            </View>
                        </View>
                        <View style={[styles.checkContent, {height: 180}]}>
                            <View style={styles.rowTextField}><Text style={styles.rowText}>증상</Text></View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <TextInput
                                    ref={(input) => { this.symptomTextInput = input; }}
                                    style={[{flex: 1, fontSize: 16, paddingLeft: 8}, symptomStyle]}
                                    numberOfLines={10}
                                    multiline={true}
                                    placeholder="증상을 입력해주세요"
                                    underlineColorAndroid="transparent"
                                    onFocus={() => this.setState({symptomStyle: Constants.MULTI_EDIT_FOCUS_STYLE})}
                                    onBlur={() => {this.setState({symptomStyle: Constants.MULTI_EDIT_BLUR_STYLE})
                                        if(hospitalNm == null || hospitalNm == '') {
                                            this.hospitalNmTextInput.focus();
                                        }
                                    }}
                                    onChangeText={(symptom) => this.setState({symptom})}
                                    value={this.state.symptom}
                                ></TextInput>
                            </View>
                        </View>
                        <View style={styles.checkContent}>
                            <View style={styles.rowTextField}><Text style={styles.rowText}>병원명</Text></View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Edit
                                    onRef={(input) => { this.hospitalNmTextInput = input; }}
                                    style={[styles.textInput, hospitalNmStyle]}
                                    height="60"
                                    underlineColorAndroid="transparent"
                                    placeholder="영문/숫자 6~12자"
                                    autoCompleteType="off"
                                    secureTextEntry={false}
                                    onFocus={() => this.setState({hospitalNmStyle: Constants.EDIT_FOCUS_STYLE})}
                                    onBlur={() => {this.setState({hospitalNmStyle: Constants.EDIT_BLUR_STYLE})
                                        if(prescription == null || prescription == '') {
                                            this.prescriptionTextInput.focus();
                                        }
                                    }}
                                    onChangeText={(hospitalNm) => this.setState({hospitalNm})}
                                    value={this.state.hospitalNm}
                                ></Edit>
                            </View>
                        </View>
                        <View style={[styles.checkContent, {flex: 1, height: 180}]}>
                            <View style={styles.rowTextField}><Text style={styles.rowText}>처방</Text></View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <TextInput
                                    ref={(input) => { this.prescriptionTextInput = input; }}
                                    style={[{flex: 1, fontSize: 16, paddingLeft: 8}, prescriptionStyle]}
                                    numberOfLines={10}
                                    multiline={true}
                                    underlineColorAndroid="transparent"
                                    placeholder="처방을 간단히 입력해주세요"
                                    onFocus={() => this.setState({prescriptionStyle: Constants.MULTI_EDIT_FOCUS_STYLE})}
                                    onBlur={() => this.setState({prescriptionStyle: Constants.MULTI_EDIT_BLUR_STYLE})}
                                    onChangeText={(prescription) => this.setState({prescription})}
                                    value={this.state.prescription}
                                ></TextInput>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Button
                    buttonStyle={saveNoteDiseaseBtnStyle}
                    containerViewStyle={{width: '100%', marginLeft: 0, marginRight: 0}}
                    title='저장'
                    onPress={() => this.setDisease()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    checkContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        marginBottom: 10,
    },
    textInput: {
        paddingLeft: 8,
        paddingRight: 35,
        height: 60,
        fontSize: 16,
        flex: 1
    },
    rowTextField: {
        paddingRight: 20,
        width: 130,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 16
    },
})
