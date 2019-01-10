import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage,
    Picker,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    Calendar,
    CalendarList,
    Agenda,
    LocaleConfig
} from 'react-native-calendars';
import { NavigationEvents } from "react-navigation";
import ActionButton from 'react-native-action-button';
import _ from 'lodash'
import IonIcons from 'react-native-vector-icons/Ionicons';
import Constants from '../../Com/Constants.js'
import ImageView from '../ImageView.js'
import NoteDiary from './NoteDiary.js'
import Toast from 'react-native-toast-native';

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

export default class Note extends Component {
    static navigationOptions = {
        title: '일기장'
    };

    constructor(props) {
        super(props);
        this.state = {
            noteId : null,
            selectedDay : null,
            calCurrentMonth : null
        }
    }

    componentDidMount() {
        LocaleConfig.locales['kr'] = {
          monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
          monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
          dayNames: ['일','월','화','수','목','금','토'],
          dayNamesShort: ['일','월','화','수','목','금','토']
        };


        LocaleConfig.defaultLocale = 'kr';
    }

    getNote(){
        var cur = this;
        let today = new Date();
        let dd = today.getDate()<10 ? '0'+today.getDate() : today.getDate();
        let mm = today.getMonth()<10 ? '0'+(today.getMonth()+1) : today.getMonth()+1;
        let yyyy = today.getFullYear();
        let month = yyyy + '-' + mm;
        let day = new Date(mm+'/'+dd+'/'+yyyy) ;
        let diaryDt = yyyy + '-' + mm + '-' + dd;

        if(_.isNil(this.state.noteId)){

            AsyncStorage.getItem('access_token', (err, result) => {
                cur.setState({
                    token : result,
                    loading : true
                }, () =>{
                    fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/note', {
                        headers: {
                            'Authorization': 'Bearer '+cur.state.token
                        }
                    })
                        .then((response) => response.json())
                        .then((res) => {
                            cur.setState({
                                note : res.data,
                                noteId : res.data[0].noteId,
                                selectedDay : day,
                                calCurrentMonth : day,
                                diaryDt : diaryDt
                            }, ()=>{
                                cur.getMonthDiary(month);
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
            this.getMonthDiary(month);
        }
    }

    getMonthDiary(month){
        console.log('month', month)
        let monthArr = month.split("-");
        this.setState({
            calCurrentMonth : new Date(monthArr[1]+'/'+'01'+'/'+monthArr[0])
        })

        fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/diary/month?noteId='+this.state.noteId+'&diaryMonth='+month, {
            headers: {
                'Authorization': 'Bearer '+this.state.token
            }
        })
            .then((response) => response.json())
            .then((res) => {
                if(!(_.isNil(res.data) || res.data == null)){
                    this.setState({
                        diary : res.data
                    })
                    this.setMarkedDate(res.data, this.state.selectedDay)
                }
            })
            .catch((error) => {
               Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, toastStyle);
               this.props.navigation.navigate('Login')
            });
    }

    setMarkedDate(marketDateList, day){
        let markedDates = new Object();
        let todayYn = false;
        let selectedDiary = null;
        for(var i=0; i<marketDateList.length; i++){
            if(marketDateList[i].diaryDt == day){
                markedDates[""+marketDateList[i].diaryDt+""]= {selected:true, marked: true, selectedColor: '#33d6ff'};
                todayYn = true;
                selectedDiary = marketDateList[i];
            }else{
                markedDates[""+marketDateList[i].diaryDt+""]= {marked: true, selectedColor: '#33d6ff'};
            }
        }

        if(!todayYn){
            markedDates[""+day+""]= {selected:true};
        }

        this.setState({
            markedDates : markedDates,
            selectedDay : day,
            selectedDiary : selectedDiary,
            diaryDt : day,
            loading : false
        })
    }

    getDay(day){
        var cur = this;
        if(!_.isNil(this.state.markedDates)){
            cur.setState({
                selectedDiary : null
            }, ()=>{
                cur.setMarkedDate(cur.state.diary, day.dateString)
            })
        }
    }

    openDiaryDtl(){
        this.setState({
            selectedDiary : null
        })
        this.props.navigation.navigate('DiaryDtl', {   type:'UPDATE',
                                                        diaryId:this.state.selectedDiary.diaryId,
                                                        noteId:this.state.noteId,
                                                        refreshFnc:this.getNote.bind(this)})
    }

    changeNote(noteId){
       this.setState({
            noteId : noteId
        }, ()=>{
            this.getNote();
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

    render(){
        return(
            <View style={{backgroundColor:'white', padding:10, flex:1}}>
                <NavigationEvents
                    onWillFocus={payload => {
                        this.getNote()
                        console.log("will focus", payload);
                    }}
                />
                <View style={{marginTop: 10, marginLeft:15, height:50}}>
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
                <Calendar
                    style={{
                        borderWidth: 1,
                        borderColor: '#ebe0eb',
                        backgroundColor : '#ebe0eb'
                    }}
                    theme={{
                        backgroundColor: '#ebe0eb',
                        calendarBackground : '#ebe0eb',
                        selectedDayBackgroundColor: '#b992b9'
                    }}
                    // Initially visible month. Default = Date()
                    current={this.state.calCurrentMonth}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2022-12-31'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {this.getDay(day)}}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {this.getDay(day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {this.getMonthDiary(month.dateString.substring(0,7))}}

                    hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={true}

                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                    markedDates={this.state.markedDates}
                />
                {this.state.selectedDiary == null ? <View><Text></Text></View> :
                (
                <View style={{marginTop:10}}>
                    <NoteDiary
                        diaryId = {this.state.selectedDiary.diaryId}
                        noteId = {this.state.noteId}
                        title = {this.state.selectedDiary.title}
                        fileId = {this.state.selectedDiary.fileId}
                        openDiaryDtl = {this.openDiaryDtl.bind(this)}
                    ></NoteDiary>
                </View>)}
                </ScrollView>
				<ActionButton buttonColor="rgba(231,76,60,1)" offsetY={40}>
                    <ActionButton.Item buttonColor='#1abc9c' title="disease 작성"
                        onPress={()=> this.props.navigation.navigate('NoteDiseaseDtl', {  type:'INSERT',
                                                                                    noteId:this.state.noteId,
                                                                                    diaryDt:this.state.diaryDt,
                                                                                    refreshFnc:this.getNote.bind(this)})}>
                        <IonIcons name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                
				<ActionButton buttonColor="rgba(231,76,60,1)" offsetY={40}>
                    <ActionButton.Item buttonColor='#1abc9c' title="다이어리 작성"
                        onPress={()=> this.props.navigation.navigate('DiaryDtl', {  type:'INSERT',
                                                                                    noteId:this.state.noteId,
                                                                                    diaryDt:this.state.diaryDt,
                                                                                    refreshFnc:this.getNote.bind(this)})}>
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
