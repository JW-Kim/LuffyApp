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

    render() {
        const {noteId} = this.props;
        const {shareList} = this.state;

        return (
            <View style={{flex: 0.5, padding: 10}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontSize: 17}}>share user</Text>
                        <TouchableOpacity style={{width: 50, right: 0, alignItems: 'center'}}
                                          onPress={() => this.openSearchUser()}
                        >
                            <Icons name='plus' color='#00cc00' size={17}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{marginTop: 10}}>
                        <FlatList
                            data={shareList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) =>
                                <View style={styles.noteItem}>
                                    <View style={{flex: 0.2}}>
                                        <Text>profile</Text>
                                    </View>
                                    <View style={{flex: 0.6}}>
                                        <Text>{item.userNm}</Text>
                                    </View>
                                    <View style={{
                                        width: 50,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginRight: 15
                                    }}>
                                        <TouchableOpacity onPress={() => this.deleteShareUser(item.userId)}>
                                            <Icons name="minus" color="blue" size={17}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        />
                    </ScrollView>
                </View>
            </View>
        )
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
        borderColor: '#ebe0eb'
    }
})