import React, {
    Component
} from 'react';
import {
    View,
    AsyncStorage,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    ToastAndroid
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-native';
import CodeTypeIcon from '../Com/CodeTypeIcon.js'
import Constants from '../../Com/Constants.js';
import {getToken} from '../../Com/AuthToken.js';
import Menu, { MenuItem, MenuDivider  } from 'react-native-material-menu';
import Icons from 'react-native-vector-icons/FontAwesome';

const SECTIONS = [
    {
        title: 'First',
        content: 'Lorem ipsum...',
    }
];

export default class NoteDisease extends Component {
    _menu = null;

    constructor(props) {
        super(props);
        this.state = {
            activeSections: []
        }

        let openDiseaseDtl = this.openDiseaseDtl.bind(this);
        let deleteDisease = this.deleteDisease.bind(this);
    }

    openDiseaseDtl() {
        this.hideMenu();
        this.props.openDiseaseDtl(this.props.diseaseId);
    }

    async deleteDisease() {
        const {diseaseId, refreshFnc} = this.props;

        this.hideMenu();

        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/diary/disease/${diseaseId}`, await getToken({
            method: 'DELETE'
        }))
            .then((response) => {
                if(response.ok) {
                    response.json()
                        .then((res) => {
                            ToastAndroid.show('질병기록을 삭제하였습니다.', ToastAndroid.SHORT);
                            refreshFnc();
                        })
                } else {
                    ToastAndroid.show('Failed.', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                ToastAndroid.show('Failed.', ToastAndroid.SHORT);
                this.props.navigation.navigate('Login')
            });
    }

    setMenuRef = ref => {
        this._menu = ref;
    }

    hideMenu = () => {
        this._menu.hide();
    }

    showMenu = () => {
        this._menu.show();
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
                    <View style={{flexDirection: 'row', height: 24, justifyContent: 'flex-end', paddingRight: 20, marginTop: 20}}>
                        <Menu
                            ref={this.setMenuRef}
                            button={<Text onPress={this.showMenu}>     <Icons name="ellipsis-h" color="#142765" size={24}/></Text>}
                        >
                            <MenuItem onPress={() => this.openDiseaseDtl()}>수정하기</MenuItem>
                            <MenuItem onPress={() => this.deleteDisease()}>삭제하기</MenuItem>
                        </Menu>
                    </View>
                    <View style={{marginRight: 20, marginLeft: 20, marginBottom: 20, marginTop: 16}}>
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