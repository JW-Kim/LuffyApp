import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { CheckBox } from 'react-native-elements'
import ModalHeader from './ModalHeader'
import Icons from 'react-native-vector-icons/FontAwesome';

export default class DiaryDtl extends Component {

  constructor(props) {
    super(props);
    this.state = {
        checked : true,
        feeling : 'good'
    }
  }

  render(){
    return(
        <View style={{flex:1}}>
            <ModalHeader
                title="일기 작성"
            ></ModalHeader>
            <View style={{height:Dimensions.get('window').height-148, marginLeft:18, marginRight:18, marginTop:18, backgroundColor:'white'}}>
                <ScrollView style={{padding : 20}}>
                    <View style={styles.checkContent}>
                        <Text style={{width: 70}}>기분</Text>
                        <CheckBox
                          title='좋음'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='보통'
                           containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='나쁨'
                           containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                    </View>
                    <View style={styles.checkContent}>
                        <Text style={{width: 70}}>건강</Text>
                        <CheckBox
                          title='좋음'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='보통'
                           containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='나쁨'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                    </View>
                    <View style={styles.checkContent}>
                        <Text style={{width: 70}}>열</Text>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <CheckBox
                                  title='좋음'
                                  containerStyle={styles.checkBox}
                                  checked={this.state.checked}
                                />
                                <CheckBox
                                  title='보통'
                                  containerStyle={styles.checkBox}
                                  checked={this.state.checked}
                                />
                                <CheckBox
                                  title='나쁨'
                                  containerStyle={styles.checkBox}
                                  checked={this.state.checked}
                                />
                            </View>
                            <TextInput></TextInput>
                        </View>
                    </View>
                    <View style={styles.checkContent}>
                        <Text style={{width: 70}}>아침식사</Text>
                        <CheckBox
                          title='좋음'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='보통'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='나쁨'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                    </View>
                    <View style={styles.checkContent}>
                        <Text style={{width: 70}}>점심식사</Text>
                        <CheckBox
                          title='좋음'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='보통'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='나쁨'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                    </View>
                    <View style={styles.checkContent}>
                        <Text style={{width: 70}}>저녁식사</Text>
                        <CheckBox
                          title='좋음'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='보통'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='나쁨'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                    </View>
                    <View style={styles.checkContent}>
                        <Text style={{width: 70}}>열</Text>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <CheckBox
                                  title='좋음'
                                  containerStyle={styles.checkBox}
                                  checked={this.state.checked}
                                />
                                <CheckBox
                                  title='보통'
                                  containerStyle={styles.checkBox}
                                  checked={this.state.checked}
                                />
                                <CheckBox
                                  title='나쁨'
                                  containerStyle={styles.checkBox}
                                  checked={this.state.checked}
                                />
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <TextInput style={{flex:0.2, marginRight:3}}></TextInput>
                                <Text style={{width:15, marginRight:10}}>회</Text>
                                <TextInput style={{flex:0.9}}></TextInput>
                            </View>
                        </View>
                    </View>
                    <View style={styles.checkContent}>
                        <Text style={{width: 70}}>수면</Text>
                        <CheckBox
                          title='좋음'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='보통'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                        <CheckBox
                          title='나쁨'
                          containerStyle={styles.checkBox}
                          checked={this.state.checked}
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft:5, marginTop:20}}>
                        <Text style={{width: 70}}>제목</Text>
                        <TextInput style={{flex:1}}>
                        </TextInput>
                    </View>
                    <View style={styles.checkContent}>
                        <Text style={{width: 70}}>내용</Text>
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
        justifyContent: 'space-between'
    },
    
    checkBox : {
        width:70, 
        backgroundColor:'white', 
        margin:0, 
        borderWidth:0
    }
})
