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
    TouchableOpacity
} from 'react-native';
import {
    CheckBox
} from 'react-native-elements'
import ModalHeader from './ModalHeader'
import Icons from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-scalable-image';
import PhotoUpload from 'react-native-photo-upload'
import ImagePicker from 'react-native-image-picker'
import DiaryDtlCheckBox from './DiaryDtlCheckBox.js'

export default class DiaryDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            feelingCd: 'good',
            healthCd: 'notBad',
            feverCd: 'bad',
            breakfastCd : 'good',
            lunchCd : null,
            dinnerCd : null,
            shitCd : null,
            shitCnt: 0,
            shitDesc : '',
            sleepStartTime : '',
            sleepEndTime : '',
            title:'',
            content:'',
            avatarSource: null
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
        fetch('http://70.30.207.203:8006/product/diary')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    insertDiary() {
        fetch('http://70.30.207.203:8006/product/diary',{
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
                shitCnt: this.state.shitCnt == null ? 0 : this.state.shitCnt,
                shitDesc : this.state.shitDesc == null ? '' : this.state.shitDesc,
                sleepStartTime : this.state.sleepStartTime == null ? '' : this.state.sleepStartTime,
                sleepEndTime : this.state.sleepEndTime == null ? '' : this.state.sleepEndTime,
                title: this.state.title == null ? '' : this.state.title,
                content: this.state.content == null ? '' : this.state.content
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
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
                //let source = { uri: response.uri };
                let source = {
                    uri: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
                };

                this.setState({
                    avatarSource: source
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
                    <ScrollView style={{padding : 20}}>
                        <View style={{marginBottom:20}}>
                            <Image width={Dimensions.get('window').width}
                                source={require('../../assets/images/B612_20180814_195816_395.jpg')}
                            />
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
                            <TextInput
                               onChangeText={(sleepStartTime) => this.setState({sleepStartTime})}
                               value={this.state.sleepStartTime}
                            >
                            </TextInput>
                            <Text>~</Text>
                            <TextInput
                               onChangeText={(sleepEndTime) => this.setState({sleepEndTime})}
                               value={this.state.sleepEndTime}
                            >
                            </TextInput>
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
                </View>
                <View style={styles.eventIcons}>
                    <Icons name="image" color="#00cc00" size={30}/>
                    <Text style={{marginLeft:5}}> 사진 </Text>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                            <Image style={styles.avatar} source={this.state.avatarSource} />
                          }
                        </View>
                    </TouchableOpacity>
                </View>
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
