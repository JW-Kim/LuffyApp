import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet, Dimensions} from 'react-native';
import ModalHeader from './ModalHeader'
import Icons from 'react-native-vector-icons/FontAwesome';

export default class DiaryDtl extends Component {

  render(){
    return(
        <View style={{flex:1}}>
            <ModalHeader
                title="일기 작성"
            ></ModalHeader>
            <View style={{height:Dimensions.get('window').height-150, marginLeft:18, marginRight:18, marginTop:18, backgroundColor:'white'}}>
                <View>
                    <TextInput>
                    </TextInput>
                </View>
            </View>
            <View style={styles.eventIcons}>
                <Icons name="image" color="#00cc00" size={30}/>
                <Text style={{marginLeft:5}}> 사진 </Text>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    eventIcons : {
        flexDirection:'row',
        height:50,
        alignItems : 'center',
        borderColor: 'gray',
        borderWidth: 1,
        padding : 10,
        marginLeft : 18,
        marginRight : 18,
        backgroundColor:'white'
    }
})
