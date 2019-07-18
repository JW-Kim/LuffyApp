import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native';
import {
     Button,
     SearchBar
} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome';
import Constants from '../../Com/Constants.js';
import { getToken } from '../../Com/AuthToken.js';
import Toast from 'react-native-toast-native';
import Profile from '../Com/Profile';

export default class SearchUser extends Component {
     constructor(props) {
          super(props);
          this.state = {
               searchVal: '',
               userList: [],
               showLoading: false
          }

          let searchUser = this.searchUser.bind(this);
          let selectedUser = this.selectedUser.bind(this);
          let close = this.close.bind(this);
     }

     async searchUser(searchVal) {

          if(searchVal === '') {
              const userList = [];
              this.setState({searchVal, userList});
              return;
          }

          this.setState({searchVal, showLoading: true});

          fetch(`http://${Constants.HOST}:${Constants.PORT}/product/user/search?searchVal=${searchVal}`, await getToken())
               .then((response) => response.json())
               .then((res) => {
                    this.setState({
                         userList: res.data,
                         showLoading: false
                    })
               })
               .catch((error) => {
                    Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                    this.props.navigation.navigate('Login')
               })
     }

     close() {
         this.props.navigation.goBack();
     }

     selectedUser(userId) {
          let insertShareUser = this.props.navigation.getParam('insertShareUser');
          insertShareUser(userId);
          this.props.navigation.goBack();
     }

     render() {
          const { searchVal, userList, showLoading } = this.state;

          return (
               <View style={{ flex: 1, backgroundColor: '#fff'}}>
                    <View style={{height: 60, flexDirection: 'row', backgroundColor: '#C2D8E9'}}>
                        <View style={{ width: 60, alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => this.close()}>
                                 <Icons name="arrow-left" color="#142765" size={21} />
                             </TouchableOpacity>
                        </View>
                        <View style={{flex:1}}>
                            <SearchBar
                                placeholder="type here"
                                containerStyle={{backgroundColor: '#C2D8E9', height: 60, borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                                inputStyle={{fontSize: 21, backgroundColor: '#C2D8E9', color: '#142765', height: 60, marginTop: 0, marginBottom: 0, paddingLeft: 40}}
                                icon={{name: 'search', style:{height: 60, width: 30, fontSize: 21, marginRight: 10, color: '#142765'}}}
                                clearIcon={{name: 'clear', style:{height: 60, width: 30, fontSize: 21, color: '#142765'}}}
                                showLoadingIcon={showLoading}
                                onChangeText={(searchVal) => this.searchUser(searchVal) }
                                onClear={() => this.searchUser('')}
                                value={searchVal}
                            />
                        </View>
                    </View>
                    <ScrollView>
                        <FlatList
                             data={userList}
                             keyExtractor={(item, index) => index.toString()}
                             renderItem={({item, index}) =>
                                  <TouchableOpacity onPress={() => this.selectedUser(item.userId)}>
                                       <View style={[styles.noteItem}, index === 0 && {borderTopWidth: 0.8, borderColor: '#E6ECF0'}]>
                                            <View style={{ flex: 0.2 }}>
                                                 <Profile fileId={item.fileId} />
                                            </View>
                                            <View style={{ flex: 0.6 }}>
                                                 <Text style={styles.rowText}>{item.userNm}</Text>
                                            </View>
                                            <View style={{
                                                 width: 50,
                                                 flexDirection: 'row',
                                                 justifyContent: 'space-between',
                                                 marginRight: 15
                                            }}>
                                            </View>
                                       </View>
                                  </TouchableOpacity>
                             }
                        />
                    </ScrollView>
               </View>
          )
     }
}


const styles = StyleSheet.create({
    noteItem: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.8,
        borderColor: '#E6ECF0',
        paddingLeft: 20
    },
    rowText: {
        fontSize: 16
    }
})