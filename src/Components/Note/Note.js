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
    FlatList,
    BackHandler,
    ToastAndroid
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
import Icons from 'react-native-vector-icons/FontAwesome';
import Constants from '../../Com/Constants.js'
import {getToken} from '../../Com/AuthToken.js';
import ImageView from '../Com/ImageView.js'
import NoteDiary from './NoteDiary.js'
import NoteDisease from './NoteDisease.js'
import Header from '../Frame/Header.js'
import Profile from '../Com/Profile';
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
            fileId: null,
            selectedDay: null,
            calCurrentMonth: null,
            diaryInsertActionYn: true,
            noteCfgList: []
        }

        let openNoteDtl = this.openNoteDtl.bind(this);
        let removeBackEvent = this.removeBackEvent.bind(this);
        let addBackEvent = this.addBackEvent.bind(this);
        let getNote = this.getNote.bind(this);
    }

    componentDidMount() {
        LocaleConfig.locales['kr'] = {
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dayNames: ['일', '월', '화', '수', '목', '금', '토'],
            dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
        };

        LocaleConfig.defaultLocale = 'kr';

        this.addBackEvent();
    }

    componentWillUnMount() {

    }

    addBackEvent() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    removeBackEvent() {
        this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        if (this.exitApp == undefined || !this.exitApp) {
            ToastAndroid.show('If you press back button one more , the app will exit', ToastAndroid.SHORT);
            this.exitApp = true;

            this.timeout = setTimeout(() => {
                this.exitApp = false;
            }, 2000)

        } else {
            clearTimeout(this.timeout);
            BackHandler.exitApp();
        }

        return true;
    }

    async getNote() {
        const cur = this;
        const {noteId} = this.state;

        this.setState({loading: true});

        let today = new Date();
        let dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
        let mm = today.getMonth() < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
        let yyyy = today.getFullYear();
        let month = yyyy + '-' + mm;
        let day = new Date(mm + '/' + dd + '/' + yyyy);
        let diaryDt = yyyy + '-' + mm + '-' + dd;

        if (_.isNil(this.state.noteId)) {
            fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note`, await getToken())
                .then((response) => {
                    if(response.ok) {
                        response.json()
                            .then((res) => {
                	            if (res.data.length !== 0) {
                                    cur.setState({
                                        note: res.data,
                                        noteId: res.data[0].noteId,
                                        fileId: res.data[0].fileId,
                                        selectedDay: day,
                                        calCurrentMonth: day,
                                        diaryDt: diaryDt
                                    }, () => {
                                        cur.getMonthDiary(month);
                                    })

                                    cur.getNoteCfg(res.data[0].noteId);
                                }
                            })
                    } else {
                        ToastAndroid.show('Failed.', ToastAndroid.SHORT);
                        this.props.navigation.navigate('Login')
                    }
                })
                .catch((error) => {
                    ToastAndroid.show('Failed.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                });
        } else {
            cur.getMonthDiary(month);
            cur.getNoteCfg(noteId);
        }
    }

    async getMonthDiary(month) {
        let monthArr = month.split("-");
        this.setState({
            calCurrentMonth: new Date(monthArr[1] + '/' + '01' + '/' + monthArr[0])
        })

        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary/month?noteId=${this.state.noteId}'&diaryMonth=${month}`, await getToken())
            .then((response) => {
                if(response.ok) {
                    response.json()
                        .then((res) => {
            	            if (!(_.isNil(res.data) || res.data == null)) {
                                this.setState({
                                    diary: res.data
                                })
                                this.getMonthDisease(month);
                            } else {
                                this.setState({loading: false});
                            }
                        })
                } else {
                    ToastAndroid.show('Failed.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                ToastAndroid.show('Failed.', ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            });
    }

    async getMonthDisease(month) {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary/diseaseMonth?noteId=${this.state.noteId}&diseaseMonth=${month}`, await getToken())
            .then((response) => {
                if(response.ok) {
                    response.json()
                        .then((res) => {
            	            if (!(_.isNil(res.data) || res.data == null)) {
                                this.setState({
                                    disease: res.data
                                })

                                this.setMarkedDate(this.state.selectedDay)
                            }
                        })
                } else {
                    ToastAndroid.show('Failed.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                ToastAndroid.show('Failed.', ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            });
    }

    async getNoteCfg(noteId) {
        const cur = this;

        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/cfg?noteId=${noteId}`, await getToken())
            .then((response) => {
                if(response.ok) {
                    response.json()
                        .then((res) => {
            	            cur.setState({
                                noteCfgList: res.data
                            })
                        })
                } else {
                    ToastAndroid.show('Failed.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                ToastAndroid.show('Failed.', ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            });
    }

    setMarkedDate(marketDateList, day) {
        let markedDates = new Object();
        let selectedDiary = null;
        let selectedDiseaseList = [];
        let isEmpty = true;
        let diaryInsertActionYn = true;

        const diary = {key: 'diary', color: '#142765'};
        const disease = {key: 'disease', color: '#C2D8E9'};

        for (var i = 0; i < this.state.diary.length; i++) {
            if (this.state.diary[i].diaryDt == day) {
                selectedDiary = this.state.diary[i];
                markedDates["" + this.state.diary[i].diaryDt + ""] = {
                    dots: [diary],
                    selected: true,
                    selectedColor: '#1abc9c'
                };
                isEmpty = false;
                diaryInsertActionYn = false;
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
                        selectedColor: '#1abc9c'
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
            markedDates[day] = {selected: true, selectedColor: '#1abc9c'};
        }

        this.setState({
            markedDates: markedDates,
            selectedDay: day,
            selectedDiary: selectedDiary,
            selectedDiseaseList: selectedDiseaseList,
            diaryDt: day,
            loading: false,
            diaryInsertActionYn
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
        const {noteCfgList} = this.state;

        this.setState({
            selectedDiary: null
        })
        this.props.navigation.navigate('DiaryDtl', {
            type: 'UPDATE',
            diaryId: this.state.selectedDiary.diaryId,
            noteId: this.state.noteId,
            refreshFnc: this.getNote.bind(this),
            noteCfgList: noteCfgList
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
        const {note} = this.state;

        const nt = _.find(note, {noteId});

        this.setState({
            noteId: noteId,
            fileId: nt.fileId
        }, () => {
            this.getNote();
        })
    }

    openNoteDtl() {
        this.props.navigation.navigate('NoteSettingDtl', {
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
        const {note, fileId, diaryInsertActionYn, selectedDay, noteCfgList} = this.state;

        if (_.isNil(note) || note.length == 0) {
            return (
                <View style={{flex: 1, alignItems: 'center', marginTop: 60}}>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.openNoteDtl()}>
                        <View><Icons name="exclamation-triangle" color="#E6ECF0" size={32}/></View>
                        <View style={{height: 60}}><Text style={[styles.rowText, {color: '#E6ECF0'}]}>등록된 일기장이 없습니다. 일기장을 등록하세요</Text></View>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={{flex: 1}}>
                    <View style={{marginTop: 10, marginLeft: 15, height: 50}}>
                        {this.state.note == null ? <Text></Text> :
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{width: 50, alignItems: 'center'}}>
                                    <Profile fileId={fileId} />
                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Picker
                                        mode='dropdown'
                                        selectedValue={this.state.noteId}
                                        style={{height: 50, width: 200, color: '#000'}}
                                        onValueChange={(itemValue, itemIndex) => this.changeNote(itemValue)}
                                    >
                                        {this.renderNoteList()}
                                    </Picker>
                                </View>
                            </View>

                        }
                    </View>
                    <ScrollView
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={() => {
                            this.scrollView.scrollTo({y: 320})
                        }}>
                        <Calendar
                            style={{
                                borderBottomWidth: 1,
                                borderColor: '#E6ECF0',
                                backgroundColor: '#fff'
                            }}
                            theme={{
                                backgroundColor: '#fff',
                                calendarBackground: '#fff',
                                selectedDayBackgroundColor: '#1abc9c',
                                todayTextColor: '#1abc9c',
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 16,
                                arrowColor: '#142765'
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
                        {this.state.selectedDiary == null ? <View style={{height: 0}}></View> :
                            (
                                <View>
                                    <NoteDiary
                                        diaryId={this.state.selectedDiary.diaryId}
                                        noteId={this.state.noteId}
                                        title={this.state.selectedDiary.title}
                                        fileId={this.state.selectedDiary.fileId}
                                        openDiaryDtl={this.openDiaryDtl.bind(this)}
                                        refreshFnc={() => this.getNote()}
                                        noteCfgList={noteCfgList}
                                    ></NoteDiary>
                                </View>)}
                        {this.state.selectedDiseaseList == null ? <View><Text></Text></View> :
                            (<FlatList
                                data={this.state.selectedDiseaseList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) =>
                                    <View>
                                        <NoteDisease
                                            diseaseId={item.diseaseId}
                                            diseaseNm={item.diseaseNm}
                                            symptom={item.symptom}
                                            hospitalNm={item.hospitalNm}
                                            prescription={item.prescription}
                                            openDiseaseDtl={this.openDiseaseDtl.bind(this)}
                                            refreshFnc={() => this.getNote()}
                                        ></NoteDisease>
                                    </View>
                                }

                            />)}

                    </ScrollView>

                    {selectedDay != null &&
                    <ActionButton buttonColor="rgba(231,76,60,1)" offsetY={10} offsetX={10}>
                        <ActionButton.Item buttonColor='#1abc9c' title="질병 기록"
                                           onPress={() => this.props.navigation.navigate('NoteDiseaseDtl', {
                                               type: 'INSERT',
                                               noteId: this.state.noteId,
                                               diseaseDt: this.state.diaryDt,
                                               refreshFnc: this.getNote.bind(this)
                                           })}>
                            <IonIcons name="md-create" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>

                        {diaryInsertActionYn &&
                            <ActionButton.Item buttonColor='#1abc9c' title="일기 작성"
                                           onPress={() => this.props.navigation.navigate('DiaryDtl', {
                                               type: 'INSERT',
                                               noteId: this.state.noteId,
                                               diaryDt: this.state.diaryDt,
                                               refreshFnc: this.getNote.bind(this),
                                               noteCfgList: noteCfgList
                                           })}>
                                <IonIcons name="md-create" style={styles.actionButtonIcon}/>
                            </ActionButton.Item>
                        }
                    </ActionButton>
                    }
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
                            console.log('willFocus', payload)
                            this.addBackEvent();
                            this.getNote()
                        }}
                        onDidFocus={payload => console.log('did focus',payload)}
                        onWillBlur={payload => {
                            console.log('willBlur', payload)
                            this.removeBackEvent();

                            if(payload.action.routeName === "NoteSetting"){
                                this.setState({noteId: null});
                            }
                        }}
                        onDidBlur={payload => console.log('did blur',payload)}
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
