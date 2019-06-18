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

export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {}

        let logout = this.logout.bind(this);
    }

    componentWillMount() {
    }

    logout() {
        AsyncStorage.removeItem('access_token', (err, result) => {
            this.props.navigation.navigate('Login');
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{height: 60}}></View>
                <View style={{height: 60}}>
                    <TouchableOpacity onPress={() => this.logout()}>
                        <Text>logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})