import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage,
    Picker,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
import {
    Calendar,
    CalendarList,
    Agenda,
    LocaleConfig
} from 'react-native-calendars';
import {NavigationEvents} from "react-navigation";
import ActionButton from 'react-native-action-button';
import _ from 'lodash'
import IonIcons from 'react-native-vector-icons/Ionicons';
import Constants from '../../Com/Constants.js'
import {getToken} from '../../Com/AuthToken.js';
import ImageView from '../Com/ImageView.js'
import NoteDiary from './NoteDiary.js'
import NoteDisease from './NoteDisease.js'
import Header from '../Frame/Header.js'

import Toast from 'react-native-toast-native';

export default class Note extends Component {
    static navigationOptions = {
        title: '일기장'
    };

    constructor(props) {
        super(props);
        this.state = {
            note: [],
            noteId: null,
            selectedDay: null,
            calCurrentMonth: null
        }

        let openNoteDtl = this.openNoteDtl.bind(this);
    }

    componentDidMount() {
        LocaleConfig.locales['kr'] = {
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
        };


        LocaleConfig.defaultLocale = 'kr';
    }

    async getNote() {
        var cur = this;
        let today = new Date();
        let dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
        let mm = today.getMonth() < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
        let yyyy = today.getFullYear();
        let month = yyyy + '-' + mm;
        let day = new Date(mm + '/' + dd + '/' + yyyy);
        let diaryDt = yyyy + '-' + mm + '-' + dd;

        if (_.isNil(this.state.noteId)) {
            fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note`, await getToken())
                .then((response) => response.json())
                .then((res) => {
                    if (res.data.length !== 0) {
                        cur.setState({
                            note: res.data,
                            noteId: res.data[0].noteId,
                            selectedDay: day,
                            calCurrentMonth: day,
                            diaryDt: diaryDt
                        }, () => {
                            cur.getMonthDiary(month);
                        })
                    }
                })
                .catch((error) => {
                    Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                    this.props.navigation.navigate('Login')
                });
        } else {
            this.setState({
                loading: true
            })
            this.getMonthDiary(month);
        }
    }

    async getMonthDiary(month) {
        let monthArr = month.split("-");
        this.setState({
            calCurrentMonth: new Date(monthArr[1] + '/' + '01' + '/' + monthArr[0])
        })

        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary/month?noteId=${this.state.noteId}'&diaryMonth=${month}`, await getToken())
            .then((response) => response.json())
            .then((res) => {
                if (!(_.isNil(res.data) || res.data == null)) {
                    this.setState({
                        diary: res.data
                    })
                    this.getMonthDisease(month);
                }
            })
            .catch((error) => {
                Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            });
    }

    async getMonthDisease(month) {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary/diseaseMonth?noteId=${this.state.noteId}&diseaseMonth=${month}`, await getToken())
            .then((response) => response.json())
            .then((res) => {
                if (!(_.isNil(res.data) || res.data == null)) {
                    this.setState({
                        disease: res.data
                    })

                    this.setMarkedDate(this.state.selectedDay)
                }
            })
            .catch((error) => {
                Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            });
    }

    setMarkedDate(marketDateList, day) {
        let markedDates = new Object();
        let selectedDiary = null;
        let selectedDiseaseList = [];
        let isEmpty = true;

        const diary = {key: 'diary', color: '#33d6ff'};
        const disease = {key: 'disease', color: 'blue'};

        for (var i = 0; i < this.state.diary.length; i++) {
            if (this.state.diary[i].diaryDt == day) {
                selectedDiary = this.state.diary[i];
                markedDates["" + this.state.diary[i].diaryDt + ""] = {
                    dots: [diary],
                    selected: true,
                    selectedColor: '#33d6ff'
                };
                isEmpty = false;

            } else {
                markedDates["" + this.state.diary[i].diaryDt + ""] = {dots: [diary]};
            }
        }

        for (var i = 0; i < this.state.disease.length; i++) {
            if (_.isNil(markedDates["" + this.state.disease[i].diseaseDt + ""])) {
                if (this.state.disease[i].diseaseDt == day) {
                    selectedDiseaseList.push(this.state.disease[i]);
                    markedDates["" + this.state.disease[i].diseaseDt + ""] = {
                        dots: [disease],
                        selected: true,
                        selectedColor: '#33d6ff'
                    };
                    isEmpty = false;
                } else {
                    markedDates["" + this.state.disease[i].diseaseDt + ""] = {dots: [disease]};
                }
            } else {
                if (this.state.disease[i].diseaseDt == day) {
                    selectedDiseaseList.push(this.state.disease[i]);
                }

                let diseasePushYn = true;
                for (let j = 0; j < markedDates["" + this.state.disease[i].diseaseDt + ""].dots.length; j++) {
                    if (markedDates["" + this.state.disease[i].diseaseDt + ""].dots[j].key == 'disease') {
                        diseasePushYn = false;
                    }
                }

                if (diseasePushYn) markedDates["" + this.state.disease[i].diseaseDt + ""].dots.push(disease);
            }
        }

        if(isEmpty) {
            markedDates[day] = {selected: true, selectedColor: '#33d6ff'};
        }

        this.setState({
            markedDates: markedDates,
            selectedDay: day,
            selectedDiary: selectedDiary,
            selectedDiseaseList: selectedDiseaseList,
            diaryDt: day,
            loading: false
        })
    }

    getDay(day) {
        var cur = this;
        if (!_.isNil(this.state.markedDates)) {
            cur.setState({
                selectedDiary: null,
                selectedDiseaseList: []

            }, () => {
                cur.setMarkedDate(cur.state.diary, day.dateString)
            })
        }
    }

    openDiaryDtl() {
        this.setState({
            selectedDiary: null
        })
        this.props.navigation.navigate('DiaryDtl', {
            type: 'UPDATE',
            diaryId: this.state.selectedDiary.diaryId,
            noteId: this.state.noteId,
            refreshFnc: this.getNote.bind(this)
        })
    }

    openDiseaseDtl(diseaseId) {
        this.props.navigation.navigate('NoteDiseaseDtl', {
            type: 'UPDATE',
            diseaseId: diseaseId,
            diseaseDt: this.state.diaryDt,
            noteId: this.state.noteId,
            refreshFnc: this.getNote.bind(this)
        })
    }


    changeNote(noteId) {
        this.setState({
            noteId: noteId
        }, () => {
            this.getNote();
        })
    }

    openNoteDtl() {
        this.props.navigate.navigate('NoteSettingDtl', {
            type: 'INSERT',
            refreshFnc: this.getNote.bind(this)
        })
    }

    renderNoteList() {
        const note = [];
        if (!_.isNil(this.state.note)) {
            for (let i = 0; i < this.state.note.length; i++) {
                note.push(<Picker.Item label={this.state.note[i].noteNm} key={this.state.note[i].noteId}
                                       value={this.state.note[i].noteId}/>);
            }
        }
        return note;
    }

    renderNote() {
        const {note} = this.state;

        if (_.isNil(note) || note.length == 0) {
            return (
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => this.openNoteDtl()}>
                        <Text>note insert</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={{flex: 1}}>
                    <View style={{marginTop: 10, marginLeft: 15, height: 50}}>
                        {this.state.note == null ? <Text></Text> :
                            <Picker
                                mode='dropdown'
                                selectedValue={this.state.noteId}
                                style={{height: 50, width: 200, color: '#000'}}
                                onValueChange={(itemValue, itemIndex) => this.changeNote(itemValue)}
                            >
                                {this.renderNoteList()}
                            </Picker>
                        }
                    </View>
                    <ScrollView>
                        <Calendar
                            style={{
                                borderWidth: 1,
                                borderColor: '#ebe0eb',
                                backgroundColor: '#ebe0eb'
                            }}
                            theme={{
                                backgroundColor: '#ebe0eb',
                                calendarBackground: '#ebe0eb',
                                selectedDayBackgroundColor: '#b992b9',
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 16
                            }}
                            // Initially visible month. Default = Date()
                            current={this.state.calCurrentMonth}
                            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                            minDate={'2012-05-10'}
                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                            maxDate={'2022-12-31'}
                            // Handler which gets executed on day press. Default = undefined
                            onDayPress={(day) => {
                                this.getDay(day)
                            }}
                            // Handler which gets executed on day long press. Default = undefined
                            onDayLongPress={(day) => {
                                this.getDay(day)
                            }}
                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                            monthFormat={'yyyy MM'}
                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                            onMonthChange={(month) => {
                                this.getMonthDiary(month.dateString.substring(0, 7))
                            }}

                            hideExtraDays={true}
                            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                            // day from another month that is visible in calendar page. Default = false
                            disableMonthChange={true}

                            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                            onPressArrowLeft={substractMonth => substractMonth()}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                            onPressArrowRight={addMonth => addMonth()}
                            markedDates={this.state.markedDates}
                            markingType={'multi-dot'}
                        />
                        {this.state.selectedDiary == null ? <View><Text></Text></View> :
                            (
                                <View style={{marginTop: 10}}>
                                    <NoteDiary
                                        diaryId={this.state.selectedDiary.diaryId}
                                        noteId={this.state.noteId}
                                        title={this.state.selectedDiary.title}
                                        fileId={this.state.selectedDiary.fileId}
                                        openDiaryDtl={this.openDiaryDtl.bind(this)}
                                    ></NoteDiary>
                                </View>)}
                        {this.state.selectedDiseaseList == null ? <View><Text></Text></View> :
                            (<FlatList
                                data={this.state.selectedDiseaseList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) =>
                                    <View style={{marginTop: 10}}>
                                        <NoteDisease
                                            diseaseId={item.diseaseId}
                                            diseaseNm={item.diseaseNm}
                                            symptom={item.symptom}
                                            hospitalNm={item.hospitalNm}
                                            prescription={item.prescription}
                                            openDiseaseDtl={this.openDiseaseDtl.bind(this)}

                                        ></NoteDisease>
                                    </View>
                                }

                            />)}

                    </ScrollView>

                    <ActionButton buttonColor="rgba(231,76,60,1)" offsetY={40}>
                        <ActionButton.Item buttonColor='#1abc9c' title="질병 작성"
                                           onPress={() => this.props.navigation.navigate('NoteDiseaseDtl', {
                                               type: 'INSERT',
                                               noteId: this.state.noteId,
                                               diseaseDt: this.state.diaryDt,
                                               refreshFnc: this.getNote.bind(this)
                                           })}>
                            <IonIcons name="md-create" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>

                        <ActionButton.Item buttonColor='#1abc9c' title="다이어리 작성"
                                           onPress={() => this.props.navigation.navigate('DiaryDtl', {
                                               type: 'INSERT',
                                               noteId: this.state.noteId,
                                               diaryDt: this.state.diaryDt,
                                               refreshFnc: this.getNote.bind(this)
                                           })}>
                            <IonIcons name="md-create" style={styles.actionButtonIcon}/>
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

    render() {
        return (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <Header navigation={this.props.navigation}>
                </Header>

                <View style={{backgroundColor: 'white', padding: 10, flex: 1}}>
                    <NavigationEvents
                        onWillFocus={payload => {
                            this.getNote()
                        }}
                    />
                    {this.renderNote()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 16,
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
