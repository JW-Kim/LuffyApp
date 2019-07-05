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
    AsyncStorage
} from 'react-native';
import {
    Button
} from 'react-native-elements';
import ModalHeader from '../ModalHeader.js'
import Toast from 'react-native-toast-native';
import Constants from '../../Com/Constants.js';
import {getToken} from '../../Com/AuthToken.js';
import ModalStandardHeader from '../Com/ModalStandardHeader'
import Edit from '../Com/Edit'

export default class NoteDiseaseDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.navigation.getParam('type'), noteId: this.props.navigation.getParam('noteId'),
            diseaseDt: this.props.navigation.getParam('diseaseDt'),
            diseaseId: this.props.navigation.getParam('diseaseId'),
            saveNoteDiseaseBtnStyle: {backgroundColor: 'gray', height: 60},
            diseaseNmStyle: {borderBottomWidth: 0, borderColor: 'gray'},
            hospitalNmStyle: {borderBottomWidth: 0, borderColor: 'gray'},
            prescriptionStyle: {borderWidth: 0, borderColor: 'gray'},
            symptomStyle: {borderWidth: 0, borderColor: 'gray'}
        }

        let setDisease = this.setDisease.bind(this);
    }

    async componentWillMount() {
        if (this.state.type == 'UPDATE') {
            fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary/disease/${this.state.diseaseId}`, await getToken())
                .then((response) => response.json())
                .then((res) => {
                    this.setState({
                        diseaseNm: res.data.diseaseNm,
                        symptom: res.data.symptom,
                        hospitalNm: res.data.hospitalNm,
                        prescription: res.data.prescription
                    })
                })
                .catch((error) => {
                    Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
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
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary/disease`, await getToken({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                noteId: this.state.noteId == null ? '' : this.state.noteId,
                diseaseDt: this.state.diseaseDt == null ? '' : this.state.diseaseDt,
                diseaseNm: this.state.diseaseNm == null ? '' : this.state.diseaseNm,
                symptom: this.state.symptom == null ? '' : this.state.symptom,
                hospitalNm: this.state.hospitalNm == null ? '' : this.state.hospitalNm,
                prescription: this.state.prescription == null ? '' : this.state.prescription,

            })
        }))
            .then((response) => response.json())
            .then((responseJson) => {
                Toast.show('저장되었습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                let refreshFnc = this.props.navigation.getParam('refreshFnc');
                refreshFnc();
                this.props.navigation.goBack();
                console.log(responseJson)
            })
            .catch((error) => {
                Toast.show('정보 저장을 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            });
    }


    async updateDisease() {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary/disease/${this.state.diseaseId}`, await getToken({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                noteId: this.state.noteId == null ? '' : this.state.noteId,
                diseaseDt: this.state.diseaseDt == null ? '' : this.state.diseaseDt,
                diseaseNm: this.state.diseaseNm == null ? '' : this.state.diseaseNm,
                symptom: this.state.symptom == null ? '' : this.state.symptom,
                hospitalNm: this.state.hospitalNm == null ? '' : this.state.hospitalNm,
                prescription: this.state.prescription == null ? '' : this.state.prescription,

            })
        }))
            .then((response) => response.json())
            .then((responseJson) => {
                Toast.show('저장되었습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                let refreshFnc = this.props.navigation.getParam('refreshFnc');
                refreshFnc();
                this.props.navigation.goBack();
                console.log(responseJson)
            })
            .catch((error) => {
                Toast.show('정보 저장을 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            });
    }

    render() {
        const {navigation} = this.props;
        const {saveNoteDiseaseBtnStyle, diseaseNmStyle, hospitalNmStyle, prescriptionStyle, symptomStyle} = this.state;

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ModalStandardHeader title="질병 작성" navigation={navigation}/>
                <View style={{height: Dimensions.get('window').height - 140}}>
                    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} enabled>
                        <ScrollView style={{padding: 10}}>
                            <View style={styles.checkContent}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>병명</Text></View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Edit
                                        style={[styles.textInput, diseaseNmStyle]}
                                        height="60"
                                        underlineColorAndroid="transparent"
                                        placeholder="영문/숫자 6~12자"
                                        autoCompleteType="off"
                                        secureTextEntry={false}
                                        onFocus={() => this.setState({diseaseNmStyle: {borderBottomWidth: 1, borderColor: 'gray'}})}
                                        onBlur={() => this.setState({diseaseNmStyle: {borderBottomWidth: 0, borderColor: 'gray'}})}
                                        onChangeText={(diseaseNm) => this.setState({diseaseNm})}
                                        value={this.state.diseaseNm}
                                    ></Edit>
                                </View>
                            </View>
                            <View style={[styles.checkContent, {height: 200}]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>증상</Text></View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <TextInput
                                        style={[{flex: 1}, symptomStyle]}
                                        numberOfLines={10}
                                        multiline={true}
                                        underlineColorAndroid="transparent"
                                        onFocus={() => this.setState({symptomStyle: {borderWidth: 1, borderColor: 'gray'}})}
                                        onBlur={() => this.setState({symptomStyle: {borderWidth: 0, borderColor: 'gray'}})}
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
                                        style={[styles.textInput, hospitalNmStyle]}
                                        height="60"
                                        underlineColorAndroid="transparent"
                                        placeholder="영문/숫자 6~12자"
                                        autoCompleteType="off"
                                        secureTextEntry={false}
                                        onFocus={() => this.setState({hospitalNmStyle: {borderBottomWidth: 1, borderColor: 'gray'}})}
                                        onBlur={() => this.setState({hospitalNmStyle: {borderBottomWidth: 0, borderColor: 'gray'}})}
                                        onChangeText={(hospitalNm) => this.setState({hospitalNm})}
                                        value={this.state.hospitalNm}
                                    ></Edit>
                                </View>
                            </View>
                            <View style={[styles.checkContent, {
                                borderColor: '#ebe0eb',
                                borderBottomWidth: 0.8,
                                height: 200
                            }]}>
                                <View style={styles.rowTextField}><Text style={styles.rowText}>처방</Text></View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <TextInput
                                        style={[{flex: 1}, prescriptionStyle]}
                                        numberOfLines={10}
                                        multiline={true}
                                        underlineColorAndroid="transparent"
                                        onFocus={() => this.setState({prescriptionStyle: {borderWidth: 1, borderColor: 'gray'}})}
                                        onBlur={() => this.setState({prescriptionStyle: {borderWidth: 0, borderColor: 'gray'}})}
                                        onChangeText={(prescription) => this.setState({prescription})}
                                        value={this.state.prescription}
                                    ></TextInput>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
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
        paddingRight: 10,    },
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
