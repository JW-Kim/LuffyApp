import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Card, Icon, Button} from 'react-native-elements';

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
        <ScrollView>
            <Card
              title='오늘은 행복한 날'
              image={require('../../assets/images/92062_32711_1635.jpg')}
              imageProps={{resizeMode:'contain'}}
            >
              <Text style={{marginBottom: 10}}>
                {'오늘은 재윤이 병원간날\n재윤이 너무 아픈날\n재윤이 화이팅!!!'}
              </Text>
              <Button
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor='#03A9F4'
                fontFamily='Lato'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VIEW NOW' />
            </Card>
            <Card
              title='오늘은 행복한 날'
              image={require('../../assets/images/92062_32711_1635.jpg')}
              imageProps={{resizeMode:'contain'}}
            >
              <Text style={{marginBottom: 10}}>
                {'오늘은 재윤이 병원간날\n재윤이 너무 아픈날\n재윤이 화이팅!!!'}
              </Text>
              <Button
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor='#03A9F4'
                fontFamily='Lato'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VIEW NOW' />
            </Card>
            <Card
              title='오늘은 행복한 날'
              image={require('../../assets/images/92062_32711_1635.jpg')}
              imageProps={{resizeMode:'contain'}}
            >
              <Text style={{marginBottom: 10}}>
                {'오늘은 재윤이 병원간날\n재윤이 너무 아픈날\n재윤이 화이팅!!!'}
              </Text>
              <Button
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor='#03A9F4'
                fontFamily='Lato'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VIEW NOW' />
            </Card>

        </ScrollView>
    )
  }
}
