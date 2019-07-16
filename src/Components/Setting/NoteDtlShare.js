import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import Constants from '../../Com/Constants.js';
import {getToken} from '../../Com/AuthToken.js';
import Toast from 'react-native-toast-native';

export default class NoteDtlShare extends Component {

    constructor(props) {
        super(props)
        this.state = {
            shareList: []
        }

        let deleteShareUser = this.deleteShareUser.bind(this);
        let openSearchUser = this.openSearchUser.bind(this);
    }

    async componentWillMount() {
        this.getShareNoteList();
    }

    async getShareNoteList() {
        const {noteId} = this.props;

        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/${noteId}/share/user`, await getToken())
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    shareList: res.data
                })
            })
            .catch((error) => {
                Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            })
    }

    async deleteShareUser(userId) {
        const {noteId} = this.props;

        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/${noteId}/share/user?userId=${userId}`, await getToken({
            method: 'DELETE'
        }))
            .then((response) => response.json())
            .then((res) => {
                this.getShareNoteList()
                Toast.show('note delete', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
            })
            .catch((error) => {
                Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            })
    }

    openSearchUser() {
        this.props.navigation.navigate('SearchUser', {
            insertShareUser: this.insertShareUser.bind(this)
        })
    }

    async insertShareUser(userId) {
        const {noteId} = this.props;

        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/${noteId}/share/user`, await getToken({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId
            })
        }))
            .then((response) => response.json())
            .then((res) => {
                this.getShareNoteList()
                Toast.show('note share', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
            })
            .catch((error) => {
                Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            })
    }

    renderList() {
        const {shareList} = this.state;

        if(shareList.length == 0) {
            return(
                <TouchableOpacity style={{flex: 1, alignItems: 'center', paddingTop: 30}}
                    onPress={() => this.openSearchUser()} >
                    <View><Icons name="user-plus" color="E6ECF0" size={32}/></View>
                    <View style={{height: 60}}><Text style={styles.rowText}>pleas add share man</Text></View>
                </TouchableOpacity>
            )
        } else {
            return(
                <FlatList
                    data={shareList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) =>
                        <View style={styles.noteItem}>
                            <View style={{flex: 0.2}}>
                                <Text>profile</Text>
                            </View>
                            <View style={{flex: 0.8}}>
                                <Text style={styles.rowText}>{item.userNm}</Text>
                            </View>
                            <View style={{width: 30, justifyContent: 'flex-end', paddingRight: 20}}>
                                <TouchableOpacity onPress={() => this.deleteShareUser(item.userId)}>
                                    <Icons name="minus" color="#d32f2f" size={16}/>
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
                            <Icons name='plus' color='#00cc00' size={16}/>
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
        borderLeftWidth: 0.8,
        borderTopWidth: 0.8,
        borderRightWidth: 0.8,
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
        borderLeftWidth: 0.8,
        borderTopWidth: 0.8,
        borderRightWidth: 0.8,
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