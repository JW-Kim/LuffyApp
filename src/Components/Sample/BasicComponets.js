import React, {Component} from 'react'
import {ScrollView, View, Text, StyleSheet} from 'react-native'
import BasicComponentsTextInput from './BasicComponentsTextInput.js'

export default class BasicComponent extends Component {
    static navigationOptions = {
        title: 'basicComponent',
    };

    render() {
        return (
            <ScrollView contentContainer={styles.contentContainer}>
                <Text>BasicComponent</Text>
                <View style={{backgroundColor : 'blue', flexDirection:'row'}}>
                    <View style={{backgroundColor : 'yellow', flex:0.4}}>
                        <Text>first</Text>
                    </View>
                    <View style={{backgroundColor : 'pink', flex:0.4}}>
                        <Text>Second</Text>
                    </View>
                </View>
                <View style={{backgroundColor : 'red'}}>
                    <BasicComponentsTextInput/>
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    contentContainer : {
        paddingVertical : 20
    }
})
