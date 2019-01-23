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
import HomeCodeTypeIcon from '../HomeCodeTypeIcon.js'
import Constants from '../../Com/Constants.js'

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  }
];

export default class NoteDisease extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSections: []
        }
    }

	openDiseaseDtl(){
        this.props.openDiseaseDtl(this.props.diseaseId);
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
                                    {this.props.diseaseNm}
                                </Text>
                             </View>
                         </View>                        
                    </View>
                </View>
          </View>
        );
      };

        _renderContent = section => {
            return (
                <View style={styles.content}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.openDiseaseDtl()}>
                        <View style={{margin:15}}>
							   <View style={{flexDirection:'row'}}>
                                <Text>병명 : </Text>
                                <Text>{this.props.diseaseNm}</Text>
                            </View>
							   <View style={{flexDirection:'row'}}>
                                <Text>증상 : </Text>
                                <Text>{this.props.symptom}</Text>
                            </View>
							   <View style={{flexDirection:'row'}}>
                                <Text>병원명 : </Text>
                                <Text>{this.props.hospitalNm}</Text>
                            </View>
							   <View style={{flexDirection:'row'}}>
                                <Text>처방 : </Text>
                                <Text>{this.props.prescription}</Text>
                            </View>
                        </View>
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
        backgroundColor : '#00BFFF'
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