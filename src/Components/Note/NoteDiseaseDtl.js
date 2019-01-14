import React, {
    Component
} from 'react';
import {
    View,
    Text,
	KeybordAvoidingView,
	ScrollView,
	TextInput,
	StyleSheet,
	Dimensions
} from 'react-native';
import ModalHeader from '../ModalHeader.js'


export default class NoteDiseaseDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount () {
    }

    render(){
        return(
           <View style={{flex:1, backgroundColor:'white'}}>
           	<ModalHeader
                    title="질병 작성"
                    goEvent={this.insertDisease.bind(this)}
                    buttonTitle={'글쓰기'}
              ></ModalHeader>
              <View style={{height:Dimensions.get('window').height-148}}>
                  <KeyboardAvoidingView  behavior="padding" keyboardVerticalOffset={300}enabled>
              	  		<ScrollView style={{padding : 10}}>
                    		<View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>병명</Text>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:50, paddingRight:20}}>
                                <TextInput
                                    style={{flex:1}}
                                    onChangeText={(diseaseNm) => this.setState({diseaseNm})}
                                    value={this.state.diseaseNm}
                                ></TextInput>                             
                            </View>
                         </View>
							<View style={[styles.checkContent, {height:200}]}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>증상</Text>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:50, paddingRight:20}}>
                                <TextInput
                                    style={{flex:1}}
                                    onChangeText={(symptom) => this.setState({symptom})}
                                    value={this.state.symptom}
                                ></TextInput>                             
                            </View>
                        	</View> 
							<View style={styles.checkContent}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>병원명</Text>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:50, paddingRight:20}}>
                                <TextInput
                                    style={{flex:1}}
                                    onChangeText={(hospitalNm) => this.setState({hospitalNm})}
                                    value={this.state.hospitalNm}
                                ></TextInput>                             
                            </View>
                        	</View> 
							<View style={[styles.checkContent, borderColor: '#ebe0eb', borderBottomWidth:0.8, height:200]}>
                            <Text style={{width: 70, fontSize: 15, fontWeight:'800'}}>처방</Text>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:50, paddingRight:20}}>
                                <TextInput
                                    style={{flex:1}}
                                    onChangeText={(prescription) => this.setState({prescription})}
                                    value={this.state.prescription}
                                ></TextInput>                             
                            </View>
                        	</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</View>
			</View>
        )
    }
    
    insertDisease(){
    }
}

const styles = StyleSheet.create({
   checkContent : {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:5,
        paddingRight:10,
        justifyContent: 'space-between',
        borderLeftWidth: 0.8,
        borderTopWidth: 0.8,
        borderRightWidth: 0.8,
        borderColor: '#ebe0eb'
    }
}
