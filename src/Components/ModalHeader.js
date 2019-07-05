import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
    Button
} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome';

export default class ModalHeader extends Component {

    constructor(props) {
        super(props);

        let close = this.close.bind(this);
    }

    close() {
        this.props.navigation.goBack();
    }

    render() {
        const {buttonTitle, title} = this.props;

        return (
            <View style={styles.mainView}>
                <View style={{width: 80}}>
                    <TouchableOpacity onPress={() => this.close()}>
                        <Icons name="times" color="#000" size={21}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={{width: 80}} onPress={() => this.props.goEvent(this)}>
                    <Text style={[styles.titleText, {textAlign: 'right'}]}>{buttonTitle}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        height: 60,
        backgroundColor: '#ebe0eb',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20
    },

    titleText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 21
    }
})
