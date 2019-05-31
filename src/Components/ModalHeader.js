import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
    Button
} from 'react-native-elements'

export default class ModalHeader extends Component {

    render() {
        return (
            <View style={styles.total}>
                <View style={{width: 70, backgroundColor: '#ebe0eb'}}></View>
                <Text style={styles.titleText}>{this.props.title}</Text>
                <Button
                    buttonStyle={{width: 70, backgroundColor: '#fff', height: 40}}
                    textStyle={{color: '#000'}}
                    onPress={() => this.props.goEvent(this)}
                    title={this.props.buttonTitle}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    total: {
        height: 60,
        backgroundColor: '#ebe0eb',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    titleText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 17
    }
})
