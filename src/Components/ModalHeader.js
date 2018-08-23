import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ModalHeader extends Component {

  render(){
    return(
        <View style={styles.total}>
            <Text style={styles.titleText}>{this.props.title}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    total : {
        height : 40,
        backgroundColor : '#484f4f',
        alignItems : 'center',
        justifyContent : 'center'
    },

    titleText : {
        color : 'white',
        fontSize : 15
    }
})
