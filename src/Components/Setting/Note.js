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
    AsyncStorage
} from 'react-native';
import ModalHeader from '../ModalHeader.js';
import Constants from '../../Com/Constants.js';
import { getToken } from '../../Com/AuthToken.js';
import Toast from 'react-native-toast-native';
import Icons from 'react-native-vector-icons/FontAwesome';

export default class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myNoteList: [],
            shareList: []
        }

        let deleteMyNote = this.deleteMyNote.bind(this);
        let deleteShareNote = this.deleteShareNote.bind(this);
    }

    componentWillMount() {
        this.getMyNoteList();
        this.getShareNoteList();
    }

    async getMyNoteList() {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/my`, await getToken())
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    myNoteList: res.data

                }, () => {

                })
            })
            .catch((error) => {
                Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            });
    }


    async getShareNoteList() {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/share`, await getToken())
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    shareList: res.data

                }, () => {

                })
            })
            .catch((error) => {
                Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            });
    }

    async deleteMyNote(noteId) {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/${noteId}`, await getToken())
            .then((response) => response.json())
            .then((res) => {
                this.getMyNoteList();
                Toast.show('note delete', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);

            })
            .catch((error) => {
                Toast.show('note delete 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            });
    }

    async deleteShareNote(noteId) {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/share/${noteId}`, await getToken())
            .then((response) => response.json())
            .then((res) => {
                cur.getShareNoteList();
                Toast.show('note delete', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);

            })
            .catch((error) => {
                Toast.show('note delete 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            });
    }

    render() {
        const {shareList} = this.state;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ModalHeader
                    title='My 일기장'
                    buttonTitle={'닫기'}
                    goEvent={this.closePopup.bind(this)}
                >
                </ModalHeader>
                <View style={{flex: 1, padding: 10}}>
                    <View style={{flex: 0.5}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontSize: 17}}>내 소유 일기장</Text>
                            <TouchableOpacity style={{width: 50, right: 0, alignItems: 'center'}}
                                              onPress={this.openNoteDtl.bind(this)}
                            >
                                <Icons name='plus' color='#00cc00' size={17}/>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{marginTop: 10}}>
                            <FlatList
                                data={this.state.myNoteList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) =>
                                    <View style={styles.noteItem}>
                                        <View style={{flex: 0.2}}>
                                            <Text>profile</Text>
                                        </View>
                                        <View style={{flex: 0.6}}>
                                            <Text>{item.noteNm}</Text>
                                        </View>
                                        <View style={{
                                            width: 50,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginRight: 15
                                        }}>
                                            <TouchableOpacity>
                                                <Icons name="share-alt" color="blue" size={17}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.deleteMyNote(item.noteId)}>
                                                <Icons name="minus" color="blue" size={17}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            />
                        </ScrollView>
                    </View>
                    <View style={{flex: 0.5}}>
                        <Text style={{fontSize: 17}}>공유 일기장</Text>

                        <ScrollView style={{marginTop: 10}}>
                            <FlatList
                                data={this.state.shareList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) =>
                                    <View style={styles.noteItem}>
                                        <View style={{flex: 0.2}}>
                                            <Text>profile</Text>
                                        </View>
                                        <View style={{flex: 0.6}}>
                                            <Text>{item.noteNm}</Text>
                                        </View>
                                        <View style={{
                                            width: 50,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginRight: 15
                                        }}>
                                            <TouchableOpacity>
                                                <Icons name="share-alt" color="blue" size={17}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.deleteShareNote(item.noteId)}>
                                                <Icons name="minus" color="blue" size={17}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }

    openNoteDtl() {
        this.props.navigation.navigate('NoteSettingDtl', {
            type: 'INSERT',
            refreshFnc: this.getMyNoteList.bind(this)
        })
    }

    closePopup() {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    noteItem: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeftWidth: 0.8,
        borderTopWidth: 0.8,
        borderRightWidth: 0.8,
        borderBottomWidth: 0.8,
        borderColor: '#ebe0eb',
        paddingLeft: 20
    }
})