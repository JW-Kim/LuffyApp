import React, {
    Component
} from 'react';
import {
    View,
    Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	ScrollView,
	AsyncStorage
} from 'react-native';
import ModalHeader from '../ModalHeader.js';
import Constants from '../../Com/Constants.js';
import Toast from 'react-native-toast-native';
import Icons from 'react-native-vector-icons/FontAwesome';

export default class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount () {
		this.getMyNoteList();
	
	}

	getMyNoteList() {
		var cur = this;

		AsyncStorage.getItem('access_token', (err, result) => {
                cur.setState({
                    token : result,
                    loading : true
                }, () =>{
                    fetch('http://'+Constants.HOST+':'+Constants.PORT+'/product/note', {
                        headers: {
                            'Authorization': 'Bearer '+cur.state.token
                        }
                    })
                        .then((response) => response.json())
                        .then((res) => {
                            cur.setState({
                                myNoteList : res.data

                            }, ()=>{

                            })
                        })
                        .catch((error) => {
                           Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, toastStyle);
                           this.props.navigation.navigate('Login')
                        });

                })

		})
	}

    render(){
        return(
        	<View style={{flex:1, backgroundColor:'#fff'}}>
				<ModalHeader
					title='My 일기장'
					buttonTitle={'닫기'}
					goEvent={this.closePopup.bind(this)}
				> 
				</ModalHeader>
				<View style={{flex:1, padding:10}}>
					<View style={{flex:0.5}}>
						<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
							<Text style={{fontSize:17}}>내 소유 일기장</Text>
							<TouchableOpacity style={{width:50, right:0, alignItems:'center'}}
								onPress={this.openNoteDtl.bind(this)}
							>
								<Icons name='plus' color='#00cc00' size={17}/>
							</TouchableOpacity>
						</View>
						<ScrollView style={{marginTop:10}}>
							<FlatList
								data={this.state.myNoteList}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({item}) =>
									<TouchableOpacity activeOpacity={0.9}>
										<View style={styles.noteItem}>
											<Text>{item.noteNm}</Text>
										</View>	
									</TouchableOpacity>
								}
							/>
						</ScrollView>
					</View>
					<View style={{flex:0.5}}>
						<Text style={{fontSize:17}}>공유 일기장</Text>
					</View>	
				</View>
			</View>   
        )
    }

	openNoteDtl(){
		this.props.navigation.navigate('NoteSettingDtl',{
			type : 'INSERT',
			refreshFnc : this.getMyNoteList.bind(this)
		})
	}

	closePopup(){
		this.props.navigation.goBack();
	}
}

const styles = StyleSheet.create({
	noteItem : {
		flexDirection : 'row',
		height : 50,
		alignItems: 'center',
		borderLeftWidth: 0.8,
		borderTopWidth: 0.8,
		borderRightWidth : 0.8,
		borderBottomWidth : 0.8,
		borderColor : '#ebe0eb',
		paddingLeft: 20
	}
})