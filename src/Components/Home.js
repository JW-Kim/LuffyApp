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
    AsyncStorage,
    Picker,
    ActivityIndicator
} from 'react-native';
import {
    Card,
    Icon,
    Button
} from 'react-native-elements';
import { NavigationEvents } from "react-navigation";
import ActionButton from 'react-native-action-button';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-scalable-image';
import Toast from 'react-native-toast-native';
import _ from 'lodash'
import DiaryDtl from './DiaryDtl.js'
import HomeCodeTypeIcon from './HomeCodeTypeIcon.js'
import Constants from '../Com/Constants.js'
import ImageView from './ImageView.js'

const toastStyle = {
    backgroundColor: "#acacac",
    width: 300,
    height: 100,
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 2,
    lines: 4,
    borderRadius: 15,
    fontWeight: "bold",
    yOffset: 40,
    opacity: 0.8
}

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

    }

    componentWillUnmount(){
        BackHandler.removeEventListener('handleBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.selectDiaryList();
    }

    selectNoteList(){
        var cur = this;
        if(_.isNil(this.state.noteId)){
            AsyncStorage.getItem('access_token', (err, result) => {
                this.setState({
                    token : result,
                    loading : true
                  }, () =>{
                    BackHandler.addEventListener('handleBackPress', this.handleBackPress);

                    fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/note', {
                            headers: {
                                'Authorization': 'Bearer '+cur.state.token
                            }
                        })
                            .then((response) => response.json())
                            .then((res) => {
                                cur.setState({
                                    note : res.data,
                                    noteId : res.data[0].noteId
                                }, ()=>{
                                    this.selectDiaryList();
                                })
                            })

                            .catch((error) => {
                                Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                                this.props.navigation.navigate('Login')
                            });
                  })
            })
        }else{
            this.setState({
                loading : true
            })
            this.selectDiaryList();
        }

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
                        diaryList : res.data,
                        loading : false
                    })
                })
                .catch((error) => {
                    Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                    this.props.navigation.navigate('Login')
                });
        })
    }

    changeNote(noteId){
        this.setState({
            noteId : noteId
        }, ()=>{
            this.selectDiaryList();
        })
    }

    renderNote(){
        const note = [];
        if(!_.isNil(this.state.note)){
            for(let i=0; i<this.state.note.length; i++){
                 note.push(<Picker.Item label={this.state.note[i].noteNm} key={this.state.note[i].noteId} value={this.state.note[i].noteId}/>);
            }
        }
        return note;
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationEvents
                    onWillFocus={payload => {
                        this.selectNoteList();
                        console.log("will focus", payload);
                    }}
                />
                <View style={{marginLeft:15, height:50}}>
                { this.state.note == null ? <Text></Text> :
                    <Picker
                        selectedValue={this.state.noteId}
                        style={{height:50, width:200, color:'#000'}}
                        onValueChange={(itemValue, itemIndex) => this.changeNote(itemValue)}
                    >
                        {this.renderNote()}
                    </Picker>
                }
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.diaryList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) =>
                            <Card containerStyle={{padding:0, paddingTop:15, paddingBottom:15}} dividerStyle={{marginBottom:0}} title={item.headerTitle}>
                                <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('DiaryDtl', {type:'UPDATE', diaryId:item.diaryId, noteId:item.noteId, refreshFnc:this.selectDiaryList.bind(this)})}>
                                    <View>
                                        <ImageView fileId={item.fileId} width={Dimensions.get('window').width-30}/>
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
                <ActionButton buttonColor="rgba(231,76,60,1)" offsetY={40}>
                    <ActionButton.Item buttonColor='#1abc9c' title="다이어리 작성" onPress={()=> this.props.navigation.navigate('DiaryDtl', {type:'INSERT', noteId:this.state.noteId, refreshFnc:this.selectDiaryList.bind(this)})}>
                        <IonIcons name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                {this.state.loading &&
                    <View style={styles.loading}>
                      <ActivityIndicator size='large' color="#FF69B4"/>
                    </View>
                }
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
    },

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
