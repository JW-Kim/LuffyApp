import React, {
    Component
} from 'react';
import {
    View,
    Text,
	KeyboardAvoidingView,
	ScrollView,
	TextInput,
	StyleSheet,
	Dimensions,
	AsyncStorage
} from 'react-native';
import ModalHeader from '../ModalHeader.js'
import Toast from 'react-native-toast-native';
import Constants from '../../Com/Constants.js'

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

export default class NoteDiseaseDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {
		 	type : this.props.navigation.getParam('type'),
		 	noteId: this.props.navigation.getParam('noteId'),
            diseaseDt: this.props.navigation.getParam('diseaseDt'),
        }
    }

    componentWillMount () {
		AsyncStorage.getItem('access_token', (err, result) => {
            this.setState({
                token : result
              }, () =>{
                if(this.state.type == 'UPDATE'){
                   /* fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/diary/'+this.state.diaryId,{
                        headers: {
                            'Authorization': 'Bearer '+this.state.token
                        }
                   })
                        .then((response) => response.json())
                        .then((res) => {
                            console.log('res', res)
                            this.setState({
                                diseaseNm: res.data.diseaseNm,
                                symptom: res.data.symptom,
             						hospitalNm : res.data.hospitalNm,
									prescription : res.data.prescription
  					        })
                        })
                        .catch((error) => {
                            Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                            this.props.navigation.navigate('Login')
                        }); */
              		}
              }) 
        })    
	}

    render(){
        return(
           <View style={{flex:1, backgroundColor:'white'}}>
           	<ModalHeader
                    title="질병 작성"
                    goEvent={this.setDisease.bind(this)}
                    buttonTitle={'글쓰기'}
              ></ModalHeader>
              <View style={{height:Dimensions.get('window').height-148}}>
                  <KeyboardAvoidingView  behavior="padding" keyboardVerticalOffset={100}enabled>
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
							<View style={[styles.checkContent, {borderColor: '#ebe0eb', borderBottomWidth:0.8, height:200}]}>
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
    
    setDisease(){
   		var cur = this;
		
		if(this.state.type == 'INSERT'){
			cur.insertDisease();

		}else if(this.state.type == 'UPDATE'){
			cur.updateDisease();
		
		}
	}

	insertDisease(){
		fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/diary/disease',{
           method : 'POST',
           headers:{
               'Content-Type': 'application/json',
               'Authorization': 'Bearer '+this.state.token
           },
           body: JSON.stringify({
               noteId : this.state.noteId == null ? '' : this.state.noteId,
               diseaseDt : this.state.diseaseDt == null ? '' : this.state.diseaseDt,
               diseaseNm : this.state.diseaseNm == null ? '' : this.state.diseaseNm,
               symptom : this.state.symptom == null ? '' : this.state.symptom,
               hospitalNm : this.state.hospitalNm == null ? '' : this.state.hospitalNm,
               prescription : this.state.prescription == null ? '' : this.state.prescription,
            
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
               Toast.show('정보 저장을 실패하였습니다.', Toast.SHORT, Toast.TOP, toastStyle);
               this.props.navigation.navigate('Login')
           });
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
})
