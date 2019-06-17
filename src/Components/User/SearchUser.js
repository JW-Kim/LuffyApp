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
     Button
} from 'react-native-elements';
import Icons from 'react-native-vector-icons/FontAwesome';
import Constants from '../../Com/Constants.js';
import { getToken } from '../../Com/AuthToken.js';
import Toast from 'react-native-toast-native';

export default class SearchUser extends Component {
     constructor(props) {
          super(props);
          this.state = {
               searchVal: '',
               userList: []
          }

          let searchUser = this.searchUser.bind(this);
          let selectedUser = this.selectedUser.bind(this);
     }

     async searchUser() {
          const { searchVal } = this.props;

          fetch(`http://${Constants.HOST}:${Constants.PORT}/product/user/search?searchVal=${searchVal}`, await getToken())
               .then((response) => response.json())
               .then((res) => {
                    this.setState({
                         shareList: res.data
                    })
               })
               .catch((error) => {
                    Toast.show('정보 조회를 실패하였습니다.', Toast.SHORT, Toast.TOP, Constants.TOAST_STYLE);
                    this.props.navigation.navigate('Login')
               })
     }

     selectedUser(userId) {
          let insertShareUser = this.props.navigation.getParam('insertShareUser');
          insertShareUser(userId);
          this.props.navigation.goBack();
     }

     render() {
          const { searchVal, userList } = this.state;

          return (
               <View style={{ flex: 1}}>
                    <View style={{ height: 60, flexDirection: 'row'}}>
                         <Text>pre</Text>
                         <TextInput
                              style={{ flex: 0.8}}
                              onChangeText={searchVal => this.setState({ searchVal })}
                              value={searchVal}
                         >
                         </TextInput>
                         <Button
                              buttonStyle={{ width: 70, backgroundColor: '#fff', height: 40 }}
                              textStyle={{ color: '#000' }}
                              onPress={() => this.searchUser()}
                              title="search"
                         />
                    </View>
                    <ScrollView>
                        <FlatList
                             data={userList}
                             keyExtractor={(item, index) => index.toString()}
                             renderItem={({item}) =>
                                  <TouchableOpacity onPress{() => this.selectedUser(item.userId)}>
                                       <View style={styles.noteItem}>
                                            <View style={{ flex: 0.2 }}>
                                                 <Text>profile</Text>
                                            </View>
                                            <View style={{ flex: 0.6 }}>
                                                 <Text>{item.userNm}</Text>
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
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeftWidth: 0.8,
        borderTopWidth: 0.8,
        borderRightWidth: 0.8,
        borderBottomWidth: 0.8,
        borderColor: '#ebe0eb',
        paddingLeft: 20
    }
})