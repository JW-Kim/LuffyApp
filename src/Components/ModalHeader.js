import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default class ModalHeader extends Component {

  render(){
    return(
        <View style={styles.total}>
            <View style={{width:30, backgroundColor : '#484f4f'}}></View>
            <Text style={styles.titleText}>{this.props.title}</Text>
            <Button
                style={{width:30}}
                onPress={() => this.props.goEvent(this)}
                title={this.props.buttonTitle}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    total : {
        height : 40,
        backgroundColor : '#484f4f',
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection: 'row'
    },

    titleText : {
        color : 'white',
        fontSize : 15
    }
})
