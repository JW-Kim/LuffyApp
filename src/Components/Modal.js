import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class Modal extends Component {
    static navigationOptions = {
        title: 'Modal',
    };

    render() {
        return (
            <View><Text>MyModal</Text></View>
        )
    }
}
