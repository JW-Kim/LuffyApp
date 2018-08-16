import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Card, Icon, Button} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Image from 'react-native-scalable-image';

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
            <ScrollView>
                <Card
                  title='오늘은 행복한 날'
                >
                    <View>
                        <Image
                            width={Dimensions.get('window').width}
                            source={require('../../assets/images/92062_32711_1635.jpg')}
                        />
                    </View>
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
                >
                    <View>
                        <Image
                            width={Dimensions.get('window').width}
                            source={require('../../assets/images/hyo1920.jpg')}
                        />
                    </View>
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
                  imageProps={{resizeMode:'cover'}}
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
                  imageProps={{resizeMode:'stretch'}}
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
                  image={require('../../assets/images/hyo1920.jpg')}
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
                  image={require('../../assets/images/hyo1920.jpg')}
                  imageProps={{resizeMode:'cover'}}
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
                  image={require('../../assets/images/hyo1920.jpg')}
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
                  image={require('../../assets/images/hyo1920.jpg')}
                  imageProps={{resizeMode:'stretch'}}
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
            <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
                <Ionicons name="md-create" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
                <Ionicons name="md-notifications-off" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
                <Ionicons name="md-done-all" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
