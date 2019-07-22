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
import {
    Button
} from 'react-native-elements';
import ModalHeader from '../Com/ModalHeader.js';
import Toast from 'react-native-toast-native';
import Constants from '../../Com/Constants.js';
import {getToken} from '../../Com/AuthToken.js';
import ModalStandardHeader from '../Com/ModalStandardHeader'
import Edit from '../Com/Edit';
import DatePicker from 'react-native-datepicker';
import NoteDtlShare from './NoteDtlShare.js';

export default class NoteDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: this.props.navigation.getParam('type'),
            noteId: this.props.navigation.getParam('noteId'),
            noteNm: '',
            sex: null,
            birthDt: null,
            insertNoteDtlBtnStyle: {backgroundColor: '#C2D8E9', height: 60},
            noteNmStyle: {borderBottomWidth: 0, borderColor: '#C2D8E9'},
            shareList: []
        }

        let setNote = this.setNote.bind(this);
    }

    async componentWillMount() {
        const {noteId, type} = this.state;
        if (type == 'UPDATE') {
            fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/${noteId}`, await getToken())
                .then((response) => response.json())
                .then((res) => {
                    console.log('res', res)
                    this.setState({
                        noteNm: res.data.noteNm,
                        sex: res.data.sex,
                        birthDt: res.data.birthDt
                    })
                })
                .catch((error) => {
                    Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                    this.props.navigation.navigate('Login')
                });
        }
    }

    setNote() {
        var cur = this;

        if (this.state.type == 'INSERT') {
            cur.insertNote();

        } else if (this.state.type == 'UPDATE') {
            cur.updateNote();

        }
    }


    async insertNote() {
        const {shareList} = this.state;

        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note`, await getToken({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                noteNm: this.state.noteNm == null ? '' : this.state.noteNm,
                sex: this.state.sex == null ? '' : this.state.sex,
                birthDt: this.state.birthDt == null ? '' : this.state.birthDt,
                shareList
            })
        }))
            .then((response) => response.json())
            .then((res) => {
                Toast.show('저장되었습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                let refreshFnc = this.props.navigation.getParam('refreshFnc');
                refreshFnc();
                this.props.navigation.goBack();
            })
            .catch((error) => {
                Toast.show('정보 저장을 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            });
    }


    async updateNote() {
        const {noteId} = this.state;

        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/${noteId}`, await getToken({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                noteNm: this.state.noteNm == null ? '' : this.state.noteNm,
                sex: this.state.sex == null ? '' : this.state.sex,
                birthDt: this.state.birthDt == null ? '' : this.state.birthDt

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
        const {noteId, insertNoteDtlBtnStyle, noteNmStyle, type} = this.state;

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ModalStandardHeader title="노트 작성" navigation={navigation} />
                <View style={{height: Dimensions.get('window').height - 140}}>
                    <View style={{flex: 1}}>
                        <View style={{marginLeft: 20, marginTop: 20}}>
                            <Text style={styles.rowTitle}>노트 정보</Text>
                        </View>
                        <View style={{paddingLeft: 28, paddingRight: 20, paddingTop: 8, height: 180}}>
                            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} enabled>
                                <View style={styles.checkContent}>
                                    <View style={styles.rowTextField}><Text style={styles.rowText}>노트 이름</Text></View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Edit
                                            height="60"
                                            style={[styles.textInput, noteNmStyle]}
                                            underlineColorAndroid="transparent"
                                            placeholder="영문/숫자 10자"
                                            autoCompleteType="off"
                                            secureTextEntry={false}
                                            onFocus={() => this.setState({noteNmStyle: {borderBottomWidth: 1, borderColor: '#C2D8E9'}})}
                                            onBlur={() => this.setState({noteNmStyle: {borderBottomWidth: 0, borderColor: '#C2D8E9'}})}
                                            onChangeText={(noteNm) => this.setState({noteNm})}
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
                                            onValueChange={(sex, itemIndex) => this.setState({sex})}
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
                                                this.setState({birthDt: birthDt})
                                            }}
                                        />
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                        <NoteDtlShare noteId={noteId} navigation={this.props.navigation} type={type} setShareList={(shareList) => this.setState({shareList})} />
                    </View>
                </View>
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
        flex: 1,
        backgroundColor: '#E6ECF0'
    },
    rowTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
