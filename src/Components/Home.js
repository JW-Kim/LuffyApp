import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {Card, Icon, Button} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import IonIcons from 'react-native-vector-icons/Ionicons';
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
                    containerStyle={{padding:0, paddingTop:15, paddingBottom:15}}
                    dividerStyle={{marginBottom:0}}
                    title='2018.08.16  오늘은 행복한 날'
                >
                    <View>
                        <Image
                            width={Dimensions.get('window').width}
                            source={require('../../assets/images/B612_20180812_175712_313.jpg')}
                        />
                    </View>
                    <View style={{margin: 15}}>
                        <Text>기분 : 좋음</Text>
                        <Text>건강 : 양호</Text>
                        <Text>열 : 없음</Text>
                        <Text>아침 식사 : 양호</Text>
                        <Text>점심 식사 : 양호</Text>
                        <Text>저녁 식사 : 양호</Text>
                        <Text>배변 : 2회(11:45, 15:00), 좋지않음(설사)</Text>
                        <Text>수면 :  23시 30분 ~ 08시 10분</Text>
                    </View>
                    <Text style={{margin: 15}}>
                        {'오늘은 재윤이 병원간날\n재윤이 너무 아픈날\n재윤이 화이팅!!!'}
                    </Text>
                </Card>
                <Card
                    containerStyle={{padding:0, paddingTop:15, paddingBottom:15}}
                    dividerStyle={{marginBottom:0}}
                  title='2018.07.16  오늘은 행복한 날'
                >
                    <View>
                        <Image
                            width={Dimensions.get('window').width}
                            source={require('../../assets/images/B612_20180814_195816_395.jpg')}
                        />
                    </View>
                  <Text style={{margin: 15}}>
                    {'오늘은 재윤이 병원간날\n재윤이 너무 아픈날\n재윤이 화이팅!!!'}
                  </Text>
                </Card>
                <Card
                    containerStyle={{padding:0, paddingTop:15, paddingBottom:15}}
                    dividerStyle={{marginBottom:0}}
                  title='2018.05.16  오늘은 행복한 날'
                >
                    <View>
                        <Image
                            width={Dimensions.get('window').width}
                            source={require('../../assets/images/B612_20180810_195704_283.jpg')}
                        />
                    </View>
                  <Text style={{margin: 15}}>
                    {'오늘은 재윤이 병원간날\n재윤이 너무 아픈날\n재윤이 화이팅!!!'}
                  </Text>
                </Card>
                <Card
                    containerStyle={{padding:0, paddingTop:15, paddingBottom:15}}
                    dividerStyle={{marginBottom:0}}
                  title='2018.04.16  오늘은 행복한 날'
                >
                    <View>
                        <Image
                            width={Dimensions.get('window').width}
                            source={require('../../assets/images/B612_20180812_161957_448.jpg')}
                        />
                    </View>
                  <Text style={{margin: 15}}>
                    {'오늘은 재윤이 병원간날\n재윤이 너무 아픈날\n재윤이 화이팅!!!'}
                  </Text>
                </Card>
                <Card
                    containerStyle={{padding:0, paddingTop:15, paddingBottom:15}}
                    dividerStyle={{marginBottom:0}}
                  title='2018.03.16  오늘은 행복한 날'
                >
                    <View>
                        <Image
                            width={Dimensions.get('window').width}
                            source={require('../../assets/images/B612_20180816_154948_413.jpg')}
                        />
                    </View>
                  <Text style={{margin: 15}}>
                    {'오늘은 재윤이 병원간날\n재윤이 너무 아픈날\n재윤이 화이팅!!!'}
                  </Text>
                </Card>
                <Card
                    containerStyle={{padding:0, paddingTop:15, paddingBottom:15}}
                    dividerStyle={{marginBottom:0}}
                  title='2018.01.16  오늘은 행복한 날'
                >
                    <View>
                        <Image
                            width={Dimensions.get('window').width}
                            source={require('../../assets/images/B612_20180816_191925_963.jpg')}
                        />
                    </View>
                  <Text style={{margin: 15}}>
                    {'오늘은 재윤이 병원간날\n재윤이 너무 아픈날\n재윤이 화이팅!!!'}
                  </Text>
                </Card>

            </ScrollView>
            <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor='#1abc9c' title="새글 작성" onPress={() => {}}>
                <IonIcons name="md-create" style={styles.actionButtonIcon} />
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
