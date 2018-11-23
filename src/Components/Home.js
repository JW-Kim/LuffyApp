import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
    BackHandler,
    AsyncStorage
} from 'react-native';
import {
    Card,
    Icon,
    Button
} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-scalable-image';
import DiaryDtl from './DiaryDtl.js'
import HomeCodeTypeIcon from './HomeCodeTypeIcon.js'
import Constants from '../Com/Constants.js'
import ImageView from './ImageView.js'

export default class Home extends Component {
    static navigationOptions = {
        title: '육아일기',
        header: {
            style: {
                backgroundColor: '#484f4f'
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            diaryList : [],
            token : null,
            noteId : null,

        }
    }

    componentDidMount() {
        AsyncStorage.getItem('access_token', (err, result) => {
            this.setState({
                token : result,
                noteId : '1'
              }, () =>{
                BackHandler.addEventListener('handleBackPress', this.handleBackPress);
                this.selectDiaryList();
              })
        })

    }

    componentWillUnmount(){
        BackHandler.removeEventListener('handleBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.selectDiaryList();
    }

    selectDiaryList(){
        this.setState({
            diaryList : []
        }, () =>{
            console.log('Constants', Constants)
            fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/diary?noteId='+this.state.noteId,{
                 headers: {
                     'Authorization': 'Bearer '+this.state.token,
                 }
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    this.setState({
                        diaryList : res.data
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
        })
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <FlatList
                        data={this.state.diaryList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) =>
                            <Card containerStyle={{padding:0, paddingTop:15, paddingBottom:15}} dividerStyle={{marginBottom:0}} title={item.headerTitle}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DiaryDtl', {type:'UPDATE', diaryId:item.diaryId, noteId:item.noteId, refreshFnc:this.selectDiaryList.bind(this)})}>
                                    <View>
                                        <ImageView fileId={item.fileId} />
                                    </View>
                                    <View style={{margin: 15}}>
                                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                                            <Text>기분 : </Text>
                                            <Text>{item.feelingCd} </Text>
                                            <HomeCodeTypeIcon code={item.feelingCd}></HomeCodeTypeIcon>
                                        </View>
                                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                                            <Text>건강 : </Text>
                                            <Text>{item.healthCd} </Text>
                                            <HomeCodeTypeIcon code={item.healthCd}></HomeCodeTypeIcon>
                                        </View>
                                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                                            <Text>열 : </Text>
                                            <Text>{item.feverCd} </Text>
                                            <HomeCodeTypeIcon code={item.feverCd}></HomeCodeTypeIcon>
                                        </View>
                                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                                            <Text>아침 식사 : </Text>
                                            <Text>{item.breakfastCd} </Text>
                                            <HomeCodeTypeIcon code={item.breakfastCd}></HomeCodeTypeIcon>
                                        </View>
                                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                                            <Text>점심 식사 : </Text>
                                            <Text>{item.lunchCd} </Text>
                                            <HomeCodeTypeIcon code={item.lunchCd}></HomeCodeTypeIcon>
                                        </View>
                                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                                            <Text>저녁 식사 : </Text>
                                            <Text>{item.dinnerCd} </Text>
                                            <HomeCodeTypeIcon code={item.dinnerCd}></HomeCodeTypeIcon>
                                        </View>
                                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                                            <Text>배변 : </Text>
                                            <Text>{item.shitCnt}회, {item.shitCd}({item.shitDesc}) </Text>
                                            <HomeCodeTypeIcon code={item.shitCd}></HomeCodeTypeIcon>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <Text>수면 : </Text>
                                            <Text>{item.sleepStartTime}시 ~ {item.sleepEndTime}시</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.content}>
                                        {item.content}
                                    </Text>
                                </TouchableOpacity>
                            </Card>

                        }
                    />

                </ScrollView>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#1abc9c' title="새글 작성" onPress={()=> this.props.navigation.navigate('DiaryDtl', {type:'INSERT', noteId:this.state.noteId, refreshFnc:this.selectDiaryList.bind(this)})}>
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

    title: {
        marginLeft: 15,
        marginTop: 0,
        marginRight: 15,
        marginBottom: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },

    content: {
        marginLeft: 15,
        marginRight: 15
    },

    good: {
        color: '#33cc33'
    },
    notBad: {
        color: '#ff8c00'
    },
    bad: {
        color: '#ff471a'
    }
});
