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

export default class DiaryDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            feeling: 'good',
            avatarSource: null

        }
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

    render(){
        return(
            <View style={{flex:1}}>
                <ModalHeader
                    title="일기 작성"
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
                            <CheckBox
                              title='좋음'
                              size={20}
                              checkedColor={'#33cc33'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='보통'
                              size={20}
                              checkedColor={'#ff8c00'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='나쁨'
                              size={20}
                              checkedColor={'#ff471a'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>건강</Text>
                            <CheckBox
                              title='좋음'
                              size={20}
                              checkedColor={'#33cc33'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='보통'
                              size={20}
                              checkedColor={'#ff8c00'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='나쁨'
                              size={20}
                              checkedColor={'#ff471a'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                        </View>
                        <View style={styles.checkContent}>
                            <View style={{width:70, alignItems:'flex-start'}}>
                                 <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>열</Text>
                            </View>
                            <View>
                                <View style={{flexDirection:'row'}}>
                                    <CheckBox
                                      title='좋음'
                                      size={20}
                                      checkedColor={'#33cc33'}
                                      containerStyle={styles.checkBox}
                                      checked={this.state.checked}
                                      textStyle={{fontSize: 15, fontWeight:'100'}}
                                    />
                                    <CheckBox
                                      title='보통'
                                      size={20}
                                      checkedColor={'#ff8c00'}
                                      containerStyle={styles.checkBox}
                                      checked={this.state.checked}
                                      textStyle={{fontSize: 15, fontWeight:'100'}}
                                    />
                                    <CheckBox
                                      title='나쁨'
                                      size={20}
                                      checkedColor={'#ff471a'}
                                      containerStyle={styles.checkBox}
                                      checked={this.state.checked}
                                      textStyle={{fontSize: 15, fontWeight:'100'}}
                                    />
                                </View>
                                <View style={{paddingLeft:10, paddingRight:20}}>
                                    <TextInput></TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>아침식사</Text>
                            <CheckBox
                              title='좋음'
                              size={20}
                              checkedColor={'#33cc33'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='보통'
                              size={20}
                              checkedColor={'#ff8c00'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='나쁨'
                              size={20}
                              checkedColor={'#ff471a'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>점심식사</Text>
                            <CheckBox
                              title='좋음'
                              size={20}
                              checkedColor={'#33cc33'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='보통'
                              size={20}
                              checkedColor={'#ff8c00'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='나쁨'
                              size={20}
                              checkedColor={'#ff471a'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>저녁식사</Text>
                            <CheckBox
                              title='좋음'
                              size={20}
                              checkedColor={'#33cc33'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='보통'
                              size={20}
                              checkedColor={'#ff8c00'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='나쁨'
                              size={20}
                              checkedColor={'#ff471a'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>배변</Text>
                            <View>
                                <View style={{flexDirection:'row'}}>
                                    <CheckBox
                                      title='좋음'
                                      size={20}
                                      checkedColor={'#33cc33'}
                                      containerStyle={styles.checkBox}
                                      checked={this.state.checked}
                                      textStyle={{fontSize: 15, fontWeight:'100'}}
                                    />
                                    <CheckBox
                                      title='보통'
                                      size={20}
                                      checkedColor={'#ff8c00'}
                                      containerStyle={styles.checkBox}
                                      checked={this.state.checked}
                                      textStyle={{fontSize: 15, fontWeight:'100'}}
                                    />
                                    <CheckBox
                                      title='나쁨'
                                      size={20}
                                      checkedColor={'#ff471a'}
                                      containerStyle={styles.checkBox}
                                      checked={this.state.checked}
                                      textStyle={{fontSize: 15, fontWeight:'100'}}
                                    />
                                </View>
                                <View style={{flexDirection:'row', alignItems:'center', paddingLeft:10, paddingRight:20}}>
                                    <TextInput style={{flex:0.2, marginRight:3}}></TextInput>
                                    <Text style={{width:15, marginRight:10}}>회</Text>
                                    <TextInput style={{flex:0.9}}></TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>수면</Text>
                            <CheckBox
                              title='좋음'
                              size={20}
                              checkedColor={'#33cc33'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='보통'
                              size={20}
                              checkedColor={'#ff8c00'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                            <CheckBox
                              title='나쁨'
                              size={20}
                              checkedColor={'#ff471a'}
                              containerStyle={styles.checkBox}
                              checked={this.state.checked}
                              textStyle={{fontSize: 15, fontWeight:'100'}}
                            />
                        </View>
                        <View style={styles.title}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>제목</Text>
                            <TextInput style={{flex:1}}>
                            </TextInput>
                        </View>
                        <View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>내용</Text>
                            <TextInput style={{flex:1}}
                                numberOfLines={10}
                                multiline={true}
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
            width:68,
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
            borderLeftWidth: 1,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderColor: '#cccccc'
        }
    })
