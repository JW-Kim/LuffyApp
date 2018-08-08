import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class Home extends Component {
     static navigationOptions = {
         title: '육아일기',
         header: {
         style: {
           backgroundColor: '#484f4f'
         }
       }
    }


  render(){
    return(
        <View>
            <Text>Home</Text>
            <Button
              title="Go to Details"
              onPress={() => this.props.navigation.navigate('Detail')}
            />
        </View>
    )
  }
}