import React, {
    Component
} from 'react';
import {
    View,
    AsyncStorage,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-native';
import ImageView from '../ImageView.js'
import HomeCodeTypeIcon from '../HomeCodeTypeIcon.js'
import Constants from '../../Com/Constants.js'
import {getToken} from '../../Com/AuthToken.js';

const SECTIONS = [
    {
        title: 'First',
        content: 'Lorem ipsum...',
    }
];

export default class NoteDiary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSections: []
        }
    }

    async componentWillMount() {
        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary/${this.props.diaryId}`, await getToken())
            .then((response) => response.json())
            .then((res) => {
                console.log('res', res)
                this.setState({
                    feelingCd: res.data.feelingCd,
                    healthCd: res.data.healthCd,
                    feverCd: res.data.feverCd,
                    breakfastCd: res.data.breakfastCd,
                    lunchCd: res.data.lunchCd,
                    dinnerCd: res.data.dinnerCd,
                    shitCd: res.data.shitCd,
                    shitCnt: res.data.shitCnt,
                    shitDesc: res.data.shitDesc,
                    sleepStartTime: res.data.sleepStartTime,
                    sleepEndTime: res.data.sleepEndTime,
                    title: res.data.title,
                    content: res.data.content,
                    fileId: res.data.fileId,
                    weight: res.data.weight + '',
                    height: res.data.height + ''
                })
            })
            .catch((error) => {
                Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                this.props.navigation.navigate('Login')
            })
    }

    openDiaryDtl() {
        this.props.openDiaryDtl();
    }

    render() {
        return (
            <Accordion
                sections={SECTIONS}
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
            />
        )
    }

    _renderHeader = section => {
        return (
            <View style={styles.header}>
                <View style={{
                    flexDirection: 'column',
                    height: 60,
                    borderWidth: 1,
                    borderColor: '#ebe0eb',
                    justifyContent: "center"
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: "center",
                                marginLeft: 10
                            }}>
                            </View>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: "center",
                                marginLeft: 10,
                                marginRight: 10
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}>
                                    {this.props.title}
                                </Text>
                            </View>
                        </View>
                        <View style={{width: 60}}>
                            <ImageView fileId={this.props.fileId} width={60}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    _renderContent = section => {
        const {fileId} = this.props;
        
        const {
            content,
            height,
            weight,
            feelingCd,
            healthCd,
            feverCd,
            breakfastCd,
            lunchCd,
            dinnerCd,
            shitCd,
            shitCnt,
            shitDesc,
            sleepStartTime,
            sleepEndTime 
        } = this.state;
    
        return (
            <View style={styles.content}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => this.openDiaryDtl()}>
                    <View>
                        <ImageView fileId={fileId} width={Dimensions.get('window').width - 30}/>
                    </View>
                    <Text style={styles.contentText}>
                        {content}
                    </Text>                    
                    <View style={{marginTop: 10, marginLeft:40, marginRight:40}}>
                        {height == null || height == 0 ? <Text></Text> :
                            (<View style={styles.rowView}>
                                <View style={styles.rowTitle}><Text style={styles.rowText}>키</Text></View> <Text style={styles.rowText}>{this.state.height} cm</Text>
                            </View>)}
                        {weight == null || weight == 0 ? <Text></Text> :
                            (<View style={styles.rowView}>
                                <View style={styles.rowTitle}><Text style={styles.rowText}>몸무게</Text></View> <Text style={styles.rowText}>{weight} kg</Text>
                            </View>)}
                        <View style={styles.rowView}>
                            <View style={styles.rowTitle}><Text style={styles.rowText}>기분</Text></View>
                            {feelingCd == 'good' ? <Text style={styles.rowText}>좋음 </Text> : <Text></Text>}
                            {feelingCd == 'notBad' ? <Text style={styles.rowText}>보통 </Text> : <Text></Text>}
                            {feelingCd == 'bad' ? <Text style={styles.rowText}>나쁨 </Text> : <Text></Text>}
                            <HomeCodeTypeIcon code={feelingCd}></HomeCodeTypeIcon>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowTitle}><Text style={styles.rowText}>건강</Text></View>
                            {healthCd == 'good' ? <Text style={styles.rowText}>좋음 </Text> : <Text></Text>}
                            {healthCd == 'notBad' ? <Text style={styles.rowText}>보통 </Text> : <Text></Text>}
                            {healthCd == 'bad' ? <Text style={styles.rowText}>나쁨 </Text> : <Text></Text>}
                            <HomeCodeTypeIcon code={healthCd}></HomeCodeTypeIcon>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowTitle}><Text style={styles.rowText}>열</Text></View>
                            {feverCd == 'good' ? <Text style={styles.rowText}>좋음 </Text> : <Text></Text>}
                            {feverCd == 'notBad' ? <Text style={styles.rowText}>보통 </Text> : <Text></Text>}
                            {feverCd == 'bad' ? <Text style={styles.rowText}>나쁨 </Text> : <Text></Text>}
                            <HomeCodeTypeIcon code={feverCd}></HomeCodeTypeIcon>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowTitle}><Text style={styles.rowText}>아침 식사</Text></View>
                            {breakfastCd == 'good' ? <Text style={styles.rowText}>좋음 </Text> : <Text></Text>}
                            {breakfastCd == 'notBad' ? <Text style={styles.rowText}>보통 </Text> : <Text></Text>}
                            {breakfastCd == 'bad' ? <Text style={styles.rowText}>나쁨 </Text> : <Text></Text>}
                            <HomeCodeTypeIcon code={breakfastCd}></HomeCodeTypeIcon>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowTitle}><Text style={styles.rowText}>점심 식사</Text></View>
                            {lunchCd == 'good' ? <Text style={styles.rowText}>좋음 </Text> : <Text></Text>}
                            {lunchCd == 'notBad' ? <Text style={styles.rowText}>보통 </Text> : <Text></Text>}
                            {lunchCd == 'bad' ? <Text style={styles.rowText}>나쁨 </Text> : <Text></Text>}
                            <HomeCodeTypeIcon code={lunchCd}></HomeCodeTypeIcon>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowTitle}><Text style={styles.rowText}>저녁 식사</Text></View>
                            {dinnerCd == 'good' ? <Text style={styles.rowText}>좋음 </Text> : <Text></Text>}
                            {dinnerCd == 'notBad' ? <Text style={styles.rowText}>보통 </Text> : <Text></Text>}
                            {dinnerCd == 'bad' ? <Text style={styles.rowText}>나쁨 </Text> : <Text></Text>}
                            <HomeCodeTypeIcon code={dinnerCd}></HomeCodeTypeIcon>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowTitle}><Text style={styles.rowText}>배변</Text></View>
                            <Text style={styles.rowText}>{shitCnt}회,
                                {shitCd == 'good' ? <Text style={styles.rowText}>좋음 </Text> : <Text></Text>}
                                {shitCd == 'notBad' ? <Text style={styles.rowText}>보통 </Text> : <Text></Text>}
                                {shitCd == 'bad' ? <Text style={styles.rowText}>나쁨 </Text> : <Text></Text>}
                                ({shitDesc}) </Text>
                            <HomeCodeTypeIcon code={shitCd}></HomeCodeTypeIcon>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 20}}>
                            <View style={styles.rowTitle}><Text style={styles.rowText}>수면</Text></View>
                            <Text style={styles.rowText}>{sleepStartTime}시 ~ {sleepEndTime}시</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({activeSections});
    };
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff'
    },

    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16
    },

    content: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ebe0eb',
    },

    rowTitle: {
        width: 150
    },

    rowText: {
        fontSize: 14,
        marginRight: 8
    },

    title: {
        marginLeft: 15,
        marginTop: 0,
        marginRight: 15,
        marginBottom: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },

    contentText: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 32,
        fontSize: 16
    },
})