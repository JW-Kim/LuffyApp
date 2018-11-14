import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import {
    CheckBox
} from 'react-native-elements'
import Toast from 'react-native-toast-native';
import ModalHeader from './ModalHeader'
import Icons from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-scalable-image';
import PhotoUpload from 'react-native-photo-upload'
import ImagePicker from 'react-native-image-picker'
import NativeModules from 'NativeModules'
import _ from 'lodash'
import DiaryDtlCheckBox from './DiaryDtlCheckBox.js'
import Constants from '../Com/Constants.js'

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

export default class DiaryDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            feelingCd: null,
            healthCd: null,
            feverCd: null,
            breakfastCd : null,
            lunchCd : null,
            dinnerCd : null,
            shitCd : null,
            shitCnt: '0',
            shitDesc : '',
            sleepStartTime : '',
            sleepEndTime : '',
            title:'',
            content:'',
            avatarSource: null,
            base64:'',
            type : this.props.navigation.getParam('type'),
            diaryId: this.props.navigation.getParam('diaryId')
        }

        let setFeelingCd = this.setFeelingCd.bind(this);
        let setHealthCd = this.setHealthCd.bind(this);
        let setFeverCd = this.setFeverCd.bind(this);
        let setBreakfastCd = this.setBreakfastCd.bind(this);
        let setLunchCd = this.setLunchCd.bind(this);
        let setDinnerCd = this.setDinnerCd.bind(this);
        let setShitCd = this.setShitCd.bind(this);
        let insertDiary = this.insertDiary.bind(this);

    }

    componentDidMount() {
        if(this.state.type == 'UPDATE'){
//            fetch('http://58.141.217.15:8080/product/diary/'+this.state.diaryId)
           fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/diary/'+this.state.diaryId)
                .then((response) => response.json())
                .then((res) => {
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
                        content: res.data.content
                    })
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    insertDiaryInfo(fileId){
       //2.파일 정보
//       fetch('http://58.141.217.15:8080/product/diary',{
       fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/diary',{
           method : 'POST',
           headers:{
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               feelingCd : this.state.feelingCd == null ? '' : this.state.feelingCd,
               healthCd: this.state.healthCd == null ? '' : this.state.healthCd,
               feverCd: this.state.feverCd == null ? '' : this.state.feverCd,
               breakfastCd : this.state.breakfastCd == null ? '' : this.state.breakfastCd,
               lunchCd : this.state.lunchCd == null ? '' : this.state.lunchCd,
               dinnerCd : this.state.dinnerCd == null ? '' : this.state.dinnerCd,
               shitCd : this.state.shitCd == null ? '' : this.state.shitCd,
               shitCnt: this.state.shitCnt == null ? '0' : this.state.shitCnt,
               shitDesc : this.state.shitDesc == null ? '' : this.state.shitDesc,
               sleepStartTime : this.state.sleepStartTime == null ? '' : this.state.sleepStartTime,
               sleepEndTime : this.state.sleepEndTime == null ? '' : this.state.sleepEndTime,
               title: this.state.title == null ? '' : this.state.title,
               content: this.state.content == null ? '' : this.state.content,
               fileId : fileId == null ? '' : fileId
           })
       })
           .then((response) => response.json())
           .then((responseJson) => {
               Toast.show('저장되었습니다.', Toast.SHORT, Toast.TOP, toastStyle);
               let refreshFnc = this.props.navigation.getParam('refreshFnc');
               refreshFnc();
               this.props.navigation.goBack();
               console.log(responseJson)
           })
           .catch((error) => {
               console.error(error);
           });
    }

    insertDiary() {
        var cur = this;
        if(this.state.type == 'INSERT'){
            //1.파일 업로드
            if(!_.isNil(cur.state.avatarSource)){
                NativeModules.FileUpload.upload({
//                    uploadUrl : 'http://58.141.217.15:8080/product/file/upload',
                    uploadUrl : 'http://'+Constants.HOST+':'+Constants.PORT+'/product/file/upload',
                    method : 'POST',
                    headers: {
                        'Accept' : 'application/json'
                    },
                    fields : {
                        'hello' : 'world'
                    },
                    files : [{
                        name : 'image',
                        filename : 'file',
                        filepath : cur.state.avatarSource.uri,
                        filetype : 'image/jpeg'
                    }]

                }, function(err, result){
                      cur.insertDiaryInfo(JSON.parse(result.data).data.fileId);
                })
            }else{
                cur.insertDiaryInfo();
            }
        }else if(this.state.type == 'UPDATE'){
//            fetch('http://58.141.217.15:8080/product/diary/'+this.state.diaryId ,{
            fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/diary/'+this.state.diaryId ,{
                method : 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    feelingCd : this.state.feelingCd == null ? '' : this.state.feelingCd,
                    healthCd: this.state.healthCd == null ? '' : this.state.healthCd,
                    feverCd: this.state.feverCd == null ? '' : this.state.feverCd,
                    breakfastCd : this.state.breakfastCd == null ? '' : this.state.breakfastCd,
                    lunchCd : this.state.lunchCd == null ? '' : this.state.lunchCd,
                    dinnerCd : this.state.dinnerCd == null ? '' : this.state.dinnerCd,
                    shitCd : this.state.shitCd == null ? '' : this.state.shitCd,
                    shitCnt: this.state.shitCnt == null ? '0' : this.state.shitCnt,
                    shitDesc : this.state.shitDesc == null ? '' : this.state.shitDesc,
                    sleepStartTime : this.state.sleepStartTime == null ? '' : this.state.sleepStartTime,
                    sleepEndTime : this.state.sleepEndTime == null ? '' : this.state.sleepEndTime,
                    title: this.state.title == null ? '' : this.state.title,
                    content: this.state.content == null ? '' : this.state.content
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    Toast.show('저장되었습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                    let refreshFnc = this.props.navigation.getParam('refreshFnc');
                    refreshFnc();
                    this.props.navigation.goBack();
                    console.log(responseJson)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
/*                let source = {
                    uri: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
                };*/

                this.setState({
                    avatarSource: source,
                    base64 : response.data
                });
            }
        });
    }

    setFeelingCd(type) {
       this.setState({
           feelingCd : type
       })

    }

    setHealthCd(type) {
        this.setState({
            healthCd : type
        })
    }

    setFeverCd(type) {
        this.setState({
            feverCd : type
        })
    }

    setBreakfastCd(type) {
        this.setState({
            breakfastCd : type
        })
    }

    setLunchCd(type) {
        this.setState({
            lunchCd : type
        })
    }

    setDinnerCd(type) {
        this.setState({
            dinnerCd : type
        })
    }

    setShitCd(type) {
        this.setState({
            shitCd : type
        })
    }

    render(){
        return(
            <View style={{flex:1}}>
                <ModalHeader
                    title="일기 작성"
                    goEvent={this.insertDiary.bind(this)}
                    buttonTitle={'글쓰기'}
                ></ModalHeader>
                <View style={{height:Dimensions.get('window').height-148, marginLeft:18, marginRight:18, marginTop:18, backgroundColor:'white'}}>
                    <KeyboardAvoidingView  behavior="padding" keyboardVerticalOffset={100}enabled>
                    <ScrollView style={{padding : 20}}>
                        <View style={{marginBottom:20}}>
                            { this.state.avatarSource === null ? <Text></Text> :
                                <Image width={Dimensions.get('window').width} source={this.state.avatarSource} />
                            }
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>기분</Text>
                            <DiaryDtlCheckBox code={this.state.feelingCd} setCode={this.setFeelingCd.bind(this)}></DiaryDtlCheckBox>
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>건강</Text>
                            <DiaryDtlCheckBox code={this.state.healthCd} setCode={this.setHealthCd.bind(this)}></DiaryDtlCheckBox>
                        </View>
                        <View style={styles.checkContent}>
                            <View style={{width:70, alignItems:'flex-start'}}>
                                 <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>열</Text>
                            </View>
                            <View>
                                <DiaryDtlCheckBox code={this.state.feverCd} setCode={this.setFeverCd.bind(this)}></DiaryDtlCheckBox>
                                <View style={{paddingLeft:10, paddingRight:20}}>
                                    <TextInput></TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>아침식사</Text>
                            <DiaryDtlCheckBox code={this.state.breakfastCd} setCode={this.setBreakfastCd.bind(this)}></DiaryDtlCheckBox>
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>점심식사</Text>
                            <DiaryDtlCheckBox code={this.state.lunchCd} setCode={this.setLunchCd.bind(this)}></DiaryDtlCheckBox>
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>저녁식사</Text>
                            <DiaryDtlCheckBox code={this.state.dinnerCd} setCode={this.setDinnerCd.bind(this)}></DiaryDtlCheckBox>
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>배변</Text>
                            <View>
                                <DiaryDtlCheckBox code={this.state.shitCd} setCode={this.setShitCd.bind(this)}></DiaryDtlCheckBox>
                                <View style={{flexDirection:'row', alignItems:'center', paddingLeft:10, paddingRight:20}}>
                                    <TextInput style={{flex:0.2, marginRight:3}}
                                        onChangeText={(shitCnt) => this.setState({shitCnt})}
                                        value={this.state.shitCnt}
                                    ></TextInput>
                                    <Text style={{width:15, marginRight:10}}>회</Text>
                                    <TextInput style={{flex:0.9}}
                                        onChangeText={(shitDesc) => this.setState({shitDesc})}
                                        value={this.state.shitDesc}
                                    ></TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>수면</Text>
                            <View style={{flex:0.4, flexDirection:'row', alignItems:'center'}}>
                                <TextInput
                                    style={{width:40}}
                                    onChangeText={(sleepStartTime) => this.setState({sleepStartTime})}
                                    value={this.state.sleepStartTime}
                                >
                                </TextInput>
                                <Text>시</Text>
                            </View>
                            <Text style={{flex:0.2}}>~</Text>
                            <View style={{flex:0.4, flexDirection:'row', alignItems:'center'}}>
                                <TextInput
                                    style={{width:40}}
                                    onChangeText={(sleepEndTime) => this.setState({sleepEndTime})}
                                    value={this.state.sleepEndTime}
                                >
                                </TextInput>
                                <Text>시</Text>
                            </View>
                        </View>
                        <View style={styles.title}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>제목</Text>
                            <TextInput style={{flex:1}}
                               onChangeText={(title) => this.setState({title})}
                               value={this.state.title}
                            >
                            </TextInput>
                        </View>
                        <View style={[styles.checkContent,{marginBottom:40, borderBottomWidth: 1}]}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>내용</Text>
                            <TextInput style={{flex:1}}
                                numberOfLines={10}
                                multiline={true}
                                onChangeText={(content) => this.setState({content})}
                                value={this.state.content}
                            >
                            </TextInput>
                        </View>
                    </ScrollView>
                    </KeyboardAvoidingView>
                </View>
                <TouchableOpacity style={styles.eventIcons} onPress={this.selectPhotoTapped.bind(this)}>
                    <Icons name="image" color="#00cc00" size={30}/>
                    <Text style={{marginLeft:5}}> 사진 </Text>
                </TouchableOpacity>
            </View>
        )

    }

}


const styles = StyleSheet.create({
    eventIcons : {
        flexDirection:'row',
        height:50,
        alignItems : 'center',
        borderColor: 'gray',
        borderWidth: 1,
        padding : 10,
        marginTop : 18,
        backgroundColor:'#d9e6f2'
    },

    checkContent : {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:5,
        paddingRight:10,
        justifyContent: 'space-between',
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: '#cccccc'
    },

    checkBox : {
        width:69,
        alignItems : 'center',
        backgroundColor:'white',
        margin:0,
        borderWidth:0
    },

    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    },

    avatarContainer: {
        borderColor: '#9B9B9B',
        justifyContent: 'center',
        alignItems: 'center'
    },

    title : {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:5,
        paddingRight:20,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: '#cccccc'
    }
})
