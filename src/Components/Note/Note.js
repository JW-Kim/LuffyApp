import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage,
    Picker,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
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

export default class Note extends Component {
    static navigationOptions = {
        title: '일기장',
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
          dayNames: ['월','화','수','목','금','토','일'],
          dayNamesShort: ['월','화','수','목','금','토','일']
        };


        LocaleConfig.defaultLocale = 'kr';
    }

    getNote(){
        var cur = this;
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
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
                            console.error(error);
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
    }

    setMarkedDate(marketDateList, day){
        let markedDates = new Object();
        let todayYn = false;
        let selectedDiary = null;
        for(var i=0; i<marketDateList.length; i++){
            if(marketDateList[i].diaryDt == day){
                markedDates[""+marketDateList[i].diaryDt+""]= {selected:true, marked: true, selectedColor: 'blue'};
                todayYn = true;
                selectedDiary = marketDateList[i];
            }else{
                markedDates[""+marketDateList[i].diaryDt+""]= {marked: true, selectedColor: 'blue'};
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

    renderNote(){
        const note = [];
        if(!_.isNil(this.state.note)){
            for(let i=0; i<this.state.note.length; i++){
                 note.push(<Picker.Item label={this.state.note[i].noteNm} key={this.state.note[i].noteId} value={this.state.note[i].noteId}/>);
            }
        }
        return note;
    }

    renderDiary(){
        const diary = [];

        if(!_.isNil(this.state.selectedDiary)){
            diary.push(<View style={{
                           marginTop : 10,
                           flexDirection:'column',
                           height : 60,
                           borderWidth: 1,
                           borderColor: '#ebe0eb',
                           justifyContent: "center"
                       }}>
                           <View style={{
                               flexDirection:'row'
                           }}>
                                <IonIcons name="ios-paper" style={{marginLeft: 5 ,fontSize: 30}}/>
                                <View style={{flexDirection:'column', justifyContent: "center", backgroundColor:'red'}}><Text>{this.state.selectedDiary.title}</Text></View>
                           </View>
                       </View>);
        }

        return diary;
    }

    render(){
        return(
            <View style={{backgroundColor:'white', padding:10, margin:15, flex:1}}>
                <NavigationEvents
                    onWillFocus={payload => {
                        this.getNote()
                        console.log("will focus", payload);
                    }}
                />
                { this.state.note == null ? <Text></Text> :
                    <Picker
                        selectedValue={this.state.noteId}
                        style={{height:50, width:200, color:'#000'}}
                        onValueChange={(itemValue, itemIndex) => this.setState({noteId: itemValue})}
                    >
                        {this.renderNote()}
                    </Picker>
                }

                <Calendar
                    style={{
                        borderWidth: 1,
                        borderColor: '#ebe0eb'
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
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {this.getMonthDiary(month.year+'-'+month.month)}}

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
                <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('DiaryDtl', {   type:'UPDATE',
                                                                                                                    diaryId:this.state.selectedDiary.diaryId,
                                                                                                                    noteId:this.state.noteId,
                                                                                                                    refreshFnc:this.getNote.bind(this)})}>
                    <View style={{
                        marginTop : 10,
                        flexDirection:'column',
                        height : 60,
                        borderWidth: 1,
                        borderColor: '#ebe0eb',
                        justifyContent: "center"
                    }}>
                        <View style={{
                            flexDirection:'row'
                        }}>
                             <View style={{flex:1, flexDirection:'row'}}>
                                 <View style={{
                                   flexDirection:'column',
                                   justifyContent: "center",
                                   marginLeft: 5
                                 }}>
                                     <IonIcons name="ios-paper" style={{fontSize: 30}}/>
                                 </View>
                                 <View style={{
                                    flexDirection:'column',
                                    justifyContent: "center",
                                    marginLeft: 10
                                 }}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: "bold"
                                    }}>
                                        {this.state.selectedDiary.title}
                                    </Text>
                                 </View>
                             </View>
                             <View style={{width:60}}>
                                <ImageView fileId={this.state.selectedDiary.fileId} width={60}/>
                             </View>
                        </View>
                    </View>
                </TouchableOpacity>)}
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
