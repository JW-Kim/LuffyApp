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

    componentWillMount () {
        AsyncStorage.getItem('access_token', (err, result) => {
            this.setState({
                token : result
              }, () =>{
                   fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/diary/'+this.props.diaryId,{
                        headers: {
                            'Authorization': 'Bearer '+this.state.token
                        }
                   })
                        .then((response) => response.json())
                        .then((res) => {
                            console.log('res', res)
                            this.setState({
                                feelingCd: res.data.feelingCd,
                                healthCd: res.data.healthCd,
                                feverCd: res.data.feverCd,
                                breakfastCd : res.data.breakfastCd,
                                lunchCd : res.data.lunchCd,
                                dinnerCd : res.data.dinnerCd,
                                shitCd : res.data.shitCd,
                                shitCnt: res.data.shitCnt,
                                shitDesc : res.data.shitDesc,
                                sleepStartTime : res.data.sleepStartTime,
                                sleepEndTime : res.data.sleepEndTime,
                                title: res.data.title,
                                content: res.data.content,
                                fileId : res.data.fileId,
                                weight : res.data.weight+'',
                                height : res.data.height+''
                            })
                        })
                        .catch((error) => {
                            Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                            this.props.navigation.navigate('Login')
                        })
              })
        })
    }

    openDiaryDtl(){
        this.props.openDiaryDtl();
    }

    render(){
        return(
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
                               marginLeft: 10
                             }}>
                                 <IonIcons name="ios-paper" style={{fontSize: 10, color:'#33d6ff'}}/>
                             </View>
                             <View style={{
                                flexDirection:'column',
                                justifyContent: "center",
                                marginLeft: 10,
                                marginRight: 10
                             }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: "bold"
                                }}>
                                    {this.props.title}
                                </Text>
                             </View>
                         </View>
                         <View style={{width:60}}>
                            <ImageView fileId={this.props.fileId} width={60}/>
                         </View>
                    </View>
                </View>
          </View>
        );
      };

        _renderContent = section => {
            return (
                <View style={styles.content}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.openDiaryDtl()}>
                        <View>
                            <ImageView fileId={this.props.fileId} width={Dimensions.get('window').width-30}/>
                        </View>
                        <View style={{margin: 15}}>
                            {this.state.height == null || this.state.height == 0 ? <Text></Text> :
                            (<View style={{flexDirection:'row', alignItems: 'center'}}>
                                 <Text>키 : {this.state.height} cm</Text>
                             </View>)}
                            {this.state.weight == null || this.state.weight == 0 ? <Text></Text> :
                            (<View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text>몸무게 : {this.state.weight} kg</Text>
                            </View>)}
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text>기분 : </Text>
                                {this.state.feelingCd == 'good' ? <Text>좋음 </Text> : <Text></Text>}
                                {this.state.feelingCd == 'notBad' ? <Text>보통 </Text> : <Text></Text>}
                                {this.state.feelingCd == 'bad' ? <Text>나쁨 </Text> : <Text></Text>}
                                <HomeCodeTypeIcon code={this.state.feelingCd}></HomeCodeTypeIcon>
                            </View>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text>건강 : </Text>
                                {this.state.healthCd == 'good' ? <Text>좋음 </Text> : <Text></Text>}
                                {this.state.healthCd == 'notBad' ? <Text>보통 </Text> : <Text></Text>}
                                {this.state.healthCd == 'bad' ? <Text>나쁨 </Text> : <Text></Text>}
                                <HomeCodeTypeIcon code={this.state.healthCd}></HomeCodeTypeIcon>
                            </View>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text>열 : </Text>
                                {this.state.feverCd == 'good' ? <Text>좋음 </Text> : <Text></Text>}
                                {this.state.feverCd == 'notBad' ? <Text>보통 </Text> : <Text></Text>}
                                {this.state.feverCd == 'bad' ? <Text>나쁨 </Text> : <Text></Text>}
                                <HomeCodeTypeIcon code={this.state.feverCd}></HomeCodeTypeIcon>
                            </View>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text>아침 식사 : </Text>
                                {this.state.breakfastCd == 'good' ? <Text>좋음 </Text> : <Text></Text>}
                                {this.state.breakfastCd == 'notBad' ? <Text>보통 </Text> : <Text></Text>}
                                {this.state.breakfastCd == 'bad' ? <Text>나쁨 </Text> : <Text></Text>}
                                <HomeCodeTypeIcon code={this.state.breakfastCd}></HomeCodeTypeIcon>
                            </View>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text>점심 식사 : </Text>
                                {this.state.lunchCd == 'good' ? <Text>좋음 </Text> : <Text></Text>}
                                {this.state.lunchCd == 'notBad' ? <Text>보통 </Text> : <Text></Text>}
                                {this.state.lunchCd == 'bad' ? <Text>나쁨 </Text> : <Text></Text>}
                                <HomeCodeTypeIcon code={this.state.lunchCd}></HomeCodeTypeIcon>
                            </View>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text>저녁 식사 : </Text>
                                {this.state.dinnerCd == 'good' ? <Text>좋음 </Text> : <Text></Text>}
                                {this.state.dinnerCd == 'notBad' ? <Text>보통 </Text> : <Text></Text>}
                                {this.state.dinnerCd == 'bad' ? <Text>나쁨 </Text> : <Text></Text>}
                                <HomeCodeTypeIcon code={this.state.dinnerCd}></HomeCodeTypeIcon>
                            </View>
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text>배변 : </Text>
                                <Text>{this.state.shitCnt}회,
                                {this.state.shitCd == 'good' ? <Text>좋음 </Text> : <Text></Text>}
                                {this.state.shitCd == 'notBad' ? <Text>보통 </Text> : <Text></Text>}
                                {this.state.shitCd == 'bad' ? <Text>나쁨 </Text> : <Text></Text>}
                                ({this.state.shitDesc}) </Text>
                                <HomeCodeTypeIcon code={this.state.shitCd}></HomeCodeTypeIcon>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text>수면 : </Text>
                                <Text>{this.state.sleepStartTime}시 ~ {this.state.sleepEndTime}시</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>
                            {this.state.title}
                        </Text>
                        <Text style={styles.contentText}>
                            {this.state.content}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        };

      _updateSections = activeSections => {
        this.setState({ activeSections });
      };
}

const styles = StyleSheet.create({
    header : {
        backgroundColor : '#ebe0eb'
    },

    content : {
        backgroundColor : '#fff',
        marginTop : 10,
        borderWidth: 1,
        borderColor: '#ebe0eb',
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
        marginLeft: 15,
        marginRight: 15
    },
})