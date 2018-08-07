import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class Home extends Component {
 static navigationOptions = {
    title: 'Home',
  };

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