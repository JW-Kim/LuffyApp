import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import ModalStandardHeader from '../Com/ModalStandardHeader';
import ComCss from '../../../assets/style/ComCss';

export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {}

        let logout = this.logout.bind(this);
        let goUserRegister = this.goUserRegister.bind(this);
    }

    componentWillMount() {
    }

    logout() {
        AsyncStorage.removeItem('access_token', (err, result) => {
            this.props.navigation.navigate('Login');
        })
    }

    goUserRegister() {
        this.props.navigation.navigate('UserRegister', {type: 'UPDATE'});
    }

    render() {
        const {navigation} = this.props;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ModalStandardHeader title="설정" navigation={navigation} />
                <TouchableOpacity style={styles.row} onPress={() => this.goUserRegister()}>
                    <View style={ComCss.rowTextField}><Text style={ComCss.rowText}>사용자 정보</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={() => this.logout()}>
                    <View style={ComCss.rowTextField}><Text style={ComCss.rowText}>로그아웃</Text></View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        height: 60,
        marginBottom: 1,
        alignItems: 'center',
        borderBottomWidth: 0.8,
        borderColor: '#E6ECF0'
    },
})