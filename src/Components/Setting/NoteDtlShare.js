import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ToastAndroid
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Constants from '../../Com/Constants.js';
import {getToken, getTokenJson} from '../../Com/AuthToken.js';
import Toast from 'react-native-toast-native';
import Profile from '../Com/Profile';
import _ from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob';

export default class NoteDtlShare extends Component {

    constructor(props) {
        super(props)
        this.state = {
            shareList: []
        }

        let confirmDelShareUser = this.confirmDelShareUser.bind(this);
        let openSearchUser = this.openSearchUser.bind(this);
    }

    async componentWillMount() {
        const {type} = this.props;

        if(type === 'UPDATE') {
            this.getShareNoteList();
        }
    }

    async getShareNoteList() {
        const {noteId} = this.props;

        RNFetchBlob.config({
            trusty: true
        })
            .fetch('GET', `${Constants.DOMAIN}/product/note/${noteId}/share/user`, await getTokenJson())
            .then((response) => {
                let status = response.info().status;

                if (status == 200) {
                    let res = response.json();
                    this.setState({
                        shareList: res.data
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

    confirmDelShareUser(userId) {
        Alert.alert('', '삭제하시겠습니까?', [{text: '확인', onPress: () => this.deleteShareUser(userId)}, {text: '취소', style: 'cancel'}], {cancelable: false});
    }

    async deleteShareUser(userId) {
        const {noteId, type, setShareList} = this.props;
        const {shareList} = this.state;

        if(type === 'UPDATE') {
            RNFetchBlob.config({
                trusty: true
            })
                .fetch('DELETE', `${Constants.DOMAIN}/product/note/${noteId}/share/user?userId=${userId}`, await getTokenJson())
                .then((response) => {
                    let status = response.info().status;

                    if (status == 200) {
                        let res = response.json();
                        this.getShareNoteList()
                        ToastAndroid.show('공유자가 삭제되었습니다.', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('삭제를 실패하였습니다.', ToastAndroid.SHORT);
                        this.props.navigation.navigate('Login')
                    }
                })
                .catch((error) => {
                    ToastAndroid.show('삭제를 실패하였습니다.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                });

        } else {
            const {shareList} = this.state;
            let tmpShareList = _.reject(shareList, {userId});

            this.setState({shareList: tmpShareList});
            setShareList(shareList);
        }
    }

    openSearchUser() {
        this.props.navigation.navigate('SearchUser', {
            insertShareUser: this.insertShareUser.bind(this)
        })
    }

    async insertShareUser(userId, userNm, fileId) {
        const {noteId, type, setShareList} = this.props;
        const {shareList} = this.state;

        if(type === 'UPDATE') {
            RNFetchBlob.config({
                trusty: true
            })
                .fetch('POST', `${Constants.DOMAIN}/product/note/${noteId}/share/user`, await getTokenJson({
                    'Content-Type': 'application/json'
                }),
                JSON.stringify({
                    userId: userId
                }))
                .then((response) => {
                    let status = response.info().status;

                    if (status == 200) {
                        let res = response.json();
                	    this.getShareNoteList()
                	    ToastAndroid.show('공유 되었습니다.', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('공유를 실패하였습니다.', ToastAndroid.SHORT);
                        this.props.navigation.navigate('Login')
                    }
                })
                .catch((error) => {
                    ToastAndroid.show('공유를 실패하였습니다.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                });

        } else {
            const {shareList} = this.state;
            let tmpShareList = _.clone(shareList);
            const share = {userId, userNm, fileId};

            tmpShareList.push(share);

            this.setState({shareList: tmpShareList});
            setShareList(tmpShareList);
        }
    }

    renderList() {
        const {shareList} = this.state;

        if(shareList.length == 0) {
            return(
                <TouchableOpacity style={{flex: 1, alignItems: 'center', paddingTop: 30}}
                    onPress={() => this.openSearchUser()} >
                    <View><Icons name="user-plus" color="#E6ECF0" size={32}/></View>
                    <View style={{height: 60}}><Text style={[styles.rowText, {color: '#E6ECF0'}]}>일기장을 공유할 사람을 등록하세요.</Text></View>
                </TouchableOpacity>
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
                                <Text style={styles.rowText}>{item.userNm}</Text>
                            </View>
                            <View style={{width: 30, justifyContent: 'flex-end', flexDirection: 'row', marginRight: 7}}>
                                <TouchableOpacity onPress={() => this.confirmDelShareUser(item.userId)}>
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
        const {noteId} = this.props;
        const {shareList} = this.state;

        return (
            <View style={{flex: 1, paddingTop: 32, paddingLeft: 20, paddingRight: 20}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.rowTitle}>공유한 사람</Text>
                        <TouchableOpacity style={{width: 30, justifyContent: 'flex-end', alignItems: 'center'}}
                                          onPress={() => this.openSearchUser()}
                        >
                            <Icons name='plus-circle' color='#4caf50' size={21}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.shareContent}>
                        {this.renderList()}
                    </ScrollView>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    shareContent: {
        marginTop: 8,
        marginBottom: 20,
        flex: 1
    },
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
    checkContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 10,
        justifyContent: 'space-between',
        borderTopWidth: 0.8,
        borderColor: '#E6ECF0'
    },
    rowText: {
        fontSize: 16
    },
    rowTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})