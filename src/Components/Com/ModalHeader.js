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
                        <Icons name="times" color="#142765" size={21}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <TouchableOpacity style={{width: 80}} onPress={() => this.props.goEvent(this)}>
                    <Text style={[styles.eventText, {textAlign: 'right'}]}>{buttonTitle}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        height: 60,
        backgroundColor: '#C2D8E9',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20
    },

    titleText: {
        color: '#142765',
        fontWeight: 'bold',
        fontSize: 21
    },
    eventText: {
        color: '#142765',
        fontSize: 21
    }
})
