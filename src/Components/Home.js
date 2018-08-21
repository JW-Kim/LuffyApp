import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {Card, Icon, Button} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
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
                    title='2018.08.16 (월)'
                >
                    <View>
                        <Image
                            width={Dimensions.get('window').width}
                            source={require('../../assets/images/B612_20180812_175712_313.jpg')}
                        />
                    </View>
                    <View style={{margin: 15}}>
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            <Text>기분 : </Text>
                            <Text>좋음 </Text>
                            <FontAwesomeIcons name="smile-o" color="#33cc33"/>
                        </View>
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            <Text>건강 : </Text>
                            <Text>보통 </Text>
                            <FontAwesomeIcons name="meh-o" color="#ff8c00"/>
                        </View>
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            <Text>열 : </Text>
                            <Text>있음(38도) </Text>
                            <FontAwesomeIcons name="frown-o" color="#ff471a"/>
                        </View>
                        <View  style={{flexDirection:'row', alignItems: 'center'}}>
                            <Text>아침 식사 : </Text>
                            <Text>양호 </Text>
                            <FontAwesomeIcons name="smile-o" color="#33cc33"/>
                        </View>
                        <View  style={{flexDirection:'row', alignItems: 'center'}}>
                            <Text>점심 식사 : </Text>
                            <Text>보통 </Text>
                            <FontAwesomeIcons name="meh-o" color="#ff8c00"/>
                        </View>
                        <View  style={{flexDirection:'row', alignItems: 'center'}}>
                            <Text>저녁 식사 : </Text>
                            <Text>나쁨 </Text>
                            <FontAwesomeIcons name="frown-o" color="#ff471a"/>
                        </View>
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            <Text>배변 : </Text>
                            <Text>2회(11:45, 15:00), 좋지않음(설사) </Text>
                            <FontAwesomeIcons name="frown-o" color="#ff471a"/>
                        </View>
                        <View  style={{flexDirection:'row'}}>
                            <Text>수면 : </Text>
                            <Text>23시 30분 ~ 08시 10분</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>
                        {'오늘은 행복한 날'}
                    </Text>
                    <Text style={styles.content}>
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

  title : {
    marginLeft: 15,
    marginTop : 0,
    marginRight : 15,
    marginBottom : 5,
    fontSize : 15,
    fontWeight : 'bold'
  },

  content : {
    marginLeft : 15,
    marginRight : 15
  },

  good : {
    color: '#33cc33'
  },
  notBad : {
    color: '#ff8c00'
  },
  bad : {
    color: '#ff471a'
  }
});
