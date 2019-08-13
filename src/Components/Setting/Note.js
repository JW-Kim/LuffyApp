import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    Alert,
    ToastAndroid
} from 'react-native';
import ModalHeader from '../Com/ModalHeader.js';
import Constants from '../../Com/Constants.js';
import {getToken} from '../../Com/AuthToken.js';
import ModalStandardHeader from '../Com/ModalStandardHeader'
import Profile from '../Com/Profile';
import Toast from 'react-native-toast-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

export default class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myNoteList: [],
            shareList: []
        }

        let openNoteDtl = this.openNoteDtl.bind(this);
        let confirmDelMyNote = this.confirmDelMyNote.bind(this);
        let confirmDelShareNote = this.confirmDelShareNote.bind(this);
    }

    componentWillMount() {
        this.getMyNoteList();
        this.getShareNoteList();
    }

    async getMyNoteList() {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/my`, await getToken())
            .then((response) => {
                if(response.ok) {
                    response.json()
                        .then((res) => {
            	            this.setState({
                                myNoteList: res.data

                            }, () => {

                            })
                        })
                } else {
                    ToastAndroid.show('조회를 실패하였습니다.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                ToastAndroid.show('조회를 실패하였습니다.', ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            });    }


    async getShareNoteList() {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/share`, await getToken())
            .then((response) => {
                if(response.ok) {
                    response.json()
                        .then((res) => {
            	            this.setState({
                                shareList: res.data

                            }, () => {

                            })
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

    confirmDelMyNote(noteId) {
        Alert.alert('', '삭제하시겠습니까?', [{text: '확인', onPress: () => this.deleteMyNote(noteId)}, {text: '취소', style: 'cancel'}], {cancelable: false});
    }

    async deleteMyNote(noteId) {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/${noteId}`, await getToken({
            method: 'DELETE'
        }))
            .then((response) => {
                if(response.ok) {
                    response.json()
                        .then((res) => {
            	            this.getMyNoteList();
                            ToastAndroid.show('일기장을 삭제하였습니다.', ToastAndroid.SHORT);
                        })
                } else {
                    ToastAndroid.show('삭제를 실패하였습니다.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                ToastAndroid.show('삭제를 실패하였습니다.', ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            });
    }

    confirmDelShareNote(noteId) {
        Alert.alert('', '삭제하시겠습니까?', [{text: '확인', onPress: () => this.deleteShareNote(noteId)}, {text: '취소', style: 'cancel'}], {cancelable: false});
    }

    async deleteShareNote(noteId) {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/share/${noteId}`, await getToken({
            method: 'DELETE'
        }))
            .then((response) => {
                if(response.ok) {
                    response.json()
                        .then((res) => {
            	            this.getShareNoteList();
            	            ToastAndroid.show('일기장을 삭제하였습니다.', ToastAndroid.SHORT);
                        })
                } else {
                    ToastAndroid.show('삭제를 실패하였습니다.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                ToastAndroid.show('삭제를 실패하였습니다.', ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            });
    }

    openNoteDtl(noteId) {
        this.props.navigation.navigate('NoteSettingDtl', {
            type: _.isNil(noteId) ? 'INSERT' : 'UPDATE',
            noteId: noteId,
            refreshFnc: this.getMyNoteList.bind(this)
        })
    }

    renderMyDiaryList() {
        const {myNoteList} = this.state;

        if(myNoteList.length == 0) {
            return(
                <TouchableOpacity style={{flex: 1, alignItems: 'center', paddingTop: 30}}
                    onPress={() => this.openNoteDtl()} >
                    <View><Icons name="exclamation-triangle" color="#E6ECF0" size={32}/></View>
                    <View style={{height: 60}}><Text style={[styles.rowText, {color: '#E6ECF0'}]}>등록된 일기장이 없습니다. 일기장을 등록하세요</Text></View>
                </TouchableOpacity>
            )
        } else {
            return(
                <FlatList
                    data={myNoteList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) =>
                        <View style={[styles.noteItem, index == 0 && {borderTopWidth: 0.8, borderColor: '#E6ECF0'}]}>
                            <View style={{flex: 0.2}}>
                                <Profile fileId={item.fileId} />
                            </View>
                            <TouchableOpacity style={{flex: 0.8}} onPress={() => this.openNoteDtl(item.noteId)}>
                                <Text style={styles.rowText}>{item.noteNm}</Text>
                            </TouchableOpacity>
                            <View style={{width: 30, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 7}}>
                                <TouchableOpacity onPress={() => this.confirmDelMyNote(item.noteId)}>
                                    <Icons name="minus-circle" color="#d32f2f" size={21}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                />
            )
        }
    }

    renderShareList() {
        const {shareList} = this.state;

        if(shareList.length == 0) {
            return(
                <View style={{flex: 1, alignItems: 'center', paddingTop: 30}}>
                    <View><Icons name="exclamation-triangle" color="#E6ECF0" size={32}/></View>
                    <View style={{height: 60}}><Text style={[styles.rowText, {color: '#E6ECF0'}]}>공유된 일기장이 없습니다.</Text></View>
                </View>
            )
        } else {
            return(
                <FlatList
                    data={shareList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) =>
                        <View style={[styles.noteItem, index == 0 && {borderTopWidth: 0.8, borderColor: '#E6ECF0'}]}>
                            <View style={{flex: 0.2}}>
                                <Profile fileId={item.fileId} />
                            </View>
                            <View style={{flex: 0.8}}>
                                <Text style={styles.rowText}>{item.noteNm}</Text>
                            </View>
                            <View style={{width: 30, justifyContent: 'flex-end', flexDirection: 'row', marginRight: 7}}>
                                <TouchableOpacity onPress={() => this.confirmDelShareNote(item.noteId)}>
                                    <Icons name="minus-circle" color="#d32f2f" size={21}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                />
            )
        }
    }

    render() {
        const {navigation} = this.props;
        const {shareList} = this.state;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ModalStandardHeader title="일기장" navigation={navigation} />
                <View style={{flex: 1, padding: 20}}>
                    <View style={{flex: 0.5}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.rowTitle}>내 소유 일기장</Text>
                            <TouchableOpacity style={{width: 30, justifyContent: 'flex-end', alignItems: 'center'}}
                                              onPress={() => this.openNoteDtl()}
                            >
                                <Icons name='plus-circle' color='#4caf50' size={21}/>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{marginTop: 8}}>
                            {this.renderMyDiaryList()}
                        </ScrollView>
                    </View>
                    <View style={{flex: 0.5, marginTop: 20}}>
                        <Text style={styles.rowTitle}>공유 일기장</Text>

                        <ScrollView style={{marginTop: 8}}>
                            {this.renderShareList()}
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noteItem: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.8,
        borderColor: '#E6ECF0',
        paddingLeft: 20
    },
    rowText: {
        fontSize:16
    },
    rowTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})