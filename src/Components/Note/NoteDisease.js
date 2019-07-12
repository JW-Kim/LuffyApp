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
import CodeTypeIcon from '../Com/CodeTypeIcon.js'
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

    openDiseaseDtl() {
        this.props.openDiseaseDtl(this.props.diseaseId);
    }

    render() {
        return (
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
                    flexDirection: 'column',
                    height: 60,
                    borderBottomWidth: 1,
                    borderColor: '#E6ECF0',
                    justifyContent: "center"
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: "center",
                                marginLeft: 10
                            }}>
                                <View style={styles.rowIcon}></View>
                            </View>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: "center",
                                marginLeft: 10,
                                marginRight: 10
                            }}>
                                <Text style={{
                                    fontSize: 18,
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
                    <View style={{margin: 20}}>
                        <View style={styles.rowView}>
                            <View style={styles.rowTitle}><Text style={styles.rowText}>증상</Text></View>
                            <View style={{flex: 1}}><Text style={styles.rowText}>{this.props.symptom}</Text></View>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowTitle}><Text style={styles.rowText}>병원명</Text></View>
                            <View style={{flex: 1}}><Text style={styles.rowText}>{this.props.hospitalNm}</Text></View>
                        </View>
                        <View style={styles.rowView}>
                            <View style={styles.rowTitle}><Text style={styles.rowText}>처방</Text></View>
                            <View style={{flex: 1}}><Text style={styles.rowText}>{this.props.prescription}</Text></View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({activeSections});
    };
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff'
    },

    content: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#E6ECF0',
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

    rowText: {
        fontSize: 14,
        marginRight: 8
    },

    rowTitle: {
        width: 150
    },

    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16
    },
    rowIcon: {
        width: 8,
        height: 8,
        borderRadius: 100 / 2,
        backgroundColor: '#C2D8E9'
    }
})