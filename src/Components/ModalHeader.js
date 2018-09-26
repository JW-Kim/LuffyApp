import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
    Button
} from 'react-native-elements'

export default class ModalHeader extends Component {

  render(){
    return(
        <View style={styles.total}>
            <View style={{width:70, backgroundColor : '#484f4f'}}></View>
            <Text style={styles.titleText}>{this.props.title}</Text>
            <Button
                buttonStyle={{width:70, backgroundColor:'#fff', height:36}}
                textStyle={{color:'#000'}}
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
