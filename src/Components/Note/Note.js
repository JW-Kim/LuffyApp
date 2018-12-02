import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage,
    Picker
} from 'react-native';
import {
    Calendar,
    CalendarList,
    Agenda,
    LocaleConfig
} from 'react-native-calendars';
import _ from 'lodash'
import IonIcons from 'react-native-vector-icons/Ionicons';
import Constants from '../../Com/Constants.js'

export default class Note extends Component {
    static navigationOptions = {
        title: '일기장',
    };

    constructor(props) {
        super(props);
        this.state = {
            noteId : null,
            selectedDay : null
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

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        let month = yyyy + '-' + mm;
        let day = yyyy + '-' + mm + '-' + dd;

        AsyncStorage.getItem('access_token', (err, result) => {
            var cur = this;
            cur.setState({
                token : result
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
                            calCurrentMonth : day
                        }, ()=>{
                            cur.getMonthDiary(month);
                        })
                    })

                    .catch((error) => {
                        console.error(error);
                    });

            })
        })
    }

    getMonthDiary(month){
        console.log('getMonthDiary' , month)
        this.setState({
            calCurrentMonth : month
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
            selectedDiary : selectedDiary
        })
    }

    getDay(day){
        if(!_.isNil(this.state.markedDates)){
            this.setMarkedDate(this.state.diary, day.dateString)
        }
    }

    renderNote(){
        const note = [];
        if(!_.isNil(this.state.note)){
            for(let i=0; i<this.state.note.length; i++){
                 note.push(<Picker.Item label={this.state.note[i].noteNm} key={this.state.note[i].noteId} value={this.state.note[i].noteId}/>);
            }
        }
        console.log('note', note)
        return note;
    }

    render(){
        return(
            <View style={{backgroundColor:'white', padding:10, margin:15}}>
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
                <View style={{
                    flexDirection:'row',
                    height : 100
                }}>
                    {this.state.selectedDiary == null ? <Text></Text> :
                         <IonIcons name="ios-paper"/>
                    }
                    {this.state.selectedDiary == null ? <Text></Text> :
                        <Text>{this.state.selectedDiary.title}</Text>
                    }
                    {this.state.selectedDiary == null ? <Text></Text> :
                        <Text>{this.state.selectedDiary.content}</Text>
                    }
                    {this.state.selectedDiary == null ? <Text></Text> :
                        <Text>{this.state.selectedDiary.content}</Text>
                    }
                </View>
            </View>
        )
    }
}
