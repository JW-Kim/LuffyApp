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
import ImageView from '../Com/ImageView.js'
import CodeTypeIcon from '../Com/CodeTypeIcon.js'
import Constants from '../../Com/Constants.js'
import {getToken} from '../../Com/AuthToken.js';
import NoteDiaryBtnGroup from './NoteDiaryBtnGroup';

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
            activeSections: [],
            height: 0,
            weight: 0
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

    _updateSections = activeSections => {
        this.setState({activeSections});
    };

    _renderHeader = section => {
        return (
            <View style={styles.header}>
                <View style={{
                    flexDirection: 'column',
                    height: 60,
                    borderBottomWidth: 1,
                    borderColor: '#E6ECF0',
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
                                <View style={styles.rowIcon}></View>
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
                    <View style={{marginTop: 24, marginLeft:40, marginRight:20}}>
                        {this.renderHeight()}
                        {this.renderWeight()}
                        <NoteDiaryBtnGroup title="기분" code={feelingCd} />
                        <NoteDiaryBtnGroup title="건강" code={healthCd} />
                        <NoteDiaryBtnGroup title="열" code={feverCd} />
                        <NoteDiaryBtnGroup title="아침식사" code={breakfastCd} />
                        <NoteDiaryBtnGroup title="점심식사" code={lunchCd} />
                        <NoteDiaryBtnGroup title="저녁식사" code={dinnerCd} />
                        {this.renderShit()}
                        {this.renderSleep()}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    renderHeight() {
        const {height} = this.state;

        if(height == null || height == 0) {
            return;
        }

        return(
            <View style={styles.rowView}>
                <View style={styles.rowTitle}>
                    <View style={{flex: 1}}><Text style={styles.rowText}>키</Text></View>
                </View>
                <Text style={styles.rowText}>{height} cm</Text>
            </View>
        )
    }

    renderWeight() {
        const {weight} = this.state;

        if(weight == null || weight == 0) {
            return;
        }

        return(
            <View style={styles.rowView}>
                <View style={styles.rowTitle}>
                    <View style={{flex: 1}}><Text style={styles.rowText}>몸무게</Text></View>
                </View>
                <Text style={styles.rowText}>{weight} kg</Text>
            </View>
        )
    }

    renderShit() {
        const {shitCd, shitDesc, shitCnt} = this.state;

        if(shitCd == 0) {
            return (
                <View style={styles.rowView}>
                    <View style={styles.rowTitle}><Text style={styles.rowText}>배변</Text></View>
                    <View style={{flex: 1}}><Text style={styles.rowText}>{shitCnt}회</Text></View>
                </View>
            )
        }

        return (
            <View style={{flex: 1, marginTop: 16, marginBottom: 16}}>
                <View style={styles.rowView}>
                    <View style={styles.rowTitle}><Text style={styles.rowText}></Text></View>
                    <View style={{flex: 1}}><Text style={styles.rowText}>{shitCnt}회</Text></View>
                </View>
                <NoteDiaryBtnGroup title="배변" code={shitCd} />
                 <View style={styles.rowView}>
                    <View style={styles.rowTitle}><Text style={styles.rowText}></Text></View>
                    <View style={{flex: 1}}><Text style={styles.rowText}>{shitDesc}</Text></View>
                </View>
            </View>
        )
    }

    renderSleep() {
        const {sleepStartTime, sleepEndTime} = this.state;

        if(sleepStartTime == '' || sleepStartTime == null || sleepEndTime == '' || sleepEndTime == null) {
            return;
        }

        return (
            <View style={styles.rowView}>
                <View style={styles.rowTitle}><Text style={styles.rowText}>수면</Text></View>
                <View style={{flex: 1}}><Text style={styles.rowText}>{sleepStartTime} ~ {sleepEndTime}시</Text></View>
            </View>
        )
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
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff'
    },

    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
        height: 25
    },

    content: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#E6ECF0',
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
    rowIcon: {
        width: 8,
        height: 8,
        borderRadius: 100 / 2,
        borderWidth: 0.5,
        backgroundColor: '#142765'
    }
})