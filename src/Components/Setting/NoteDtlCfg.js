import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ToastAndroid,
    FlatList
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import NoteDtlCfgBtnGroup from './NoteDtlCfgBtnGroup';
import Icons from 'react-native-vector-icons/FontAwesome';
import Constants from '../../Com/Constants.js'
import {getToken} from '../../Com/AuthToken.js';
import _ from 'lodash';

const SECTIONS = [
    {
        title: 'First',
        content: 'Lorem ipsum...',
    }
];

export default class NoteDtlCfg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSections: [],
            noteCfgList: []
        }

        let setNoteCfgStatCd = this.setNoteCfgStatCd.bind(this);
    }

    componentDidMount() {
        this.getNoteCfg();
    }

    async getNoteCfg() {
        const cur = this;
        const {type, noteId, setNoteCfgList} = this.props;

        let tempNoteId = '';

        if(type === 'UPDATE') {
            tempNoteId = noteId;
        }

        fetch(`http://${Constants.HOST}:${Constants.PORT}/product/note/cfg?noteId=${tempNoteId}`, await getToken())
            .then((response) => {
                if(response.ok) {
                    response.json()
                        .then((res) => {
            	    cur.setState({
                                noteCfgList: res.data
                            })
                            setNoteCfgList(res.data, false)
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

    setNoteCfgStatCd(index, noteCfgStatCd) {
        const {setNoteCfgList} = this.props;
        const {noteCfgList} = this.state;

        let tmpNoteCfgList = _.clone(noteCfgList);
        tmpNoteCfgList[index].noteCfgStatCd = noteCfgStatCd;

        this.setState({noteCfgList: tmpNoteCfgList});
        setNoteCfgList(tmpNoteCfgList, true);
    }

    renderHeader = section => {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 32}}>
                <View style={{marginLeft: 20}}>
                    <Text style={styles.rowTitle}>노트 설정</Text>
                </View>
                <View style={{alignItems: 'center', marginRight: 20}}>
                    <Icons name="angle-down" color="#000" size={24}/>
                </View>
            </View>
        )
    }

    renderContent = section => {
        const {noteCfgList} = this.state;

        return (
            <View style={{marginLeft: 28, marginRight: 20, marginTop: 8}}>
                <FlatList
                    data={noteCfgList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) =>
                        <NoteDtlCfgBtnGroup title={item.noteCfgCdVal} noteCfgStatCd={item.noteCfgStatCd} setNoteCfgStatCd={(noteCfgStatCd) => this.setNoteCfgStatCd(index, noteCfgStatCd)} />
                    }
                />
            </View>
        )
    }

    updateSections = activeSections => {
        this.setState({activeSections});
    }

    render() {
        const {activeSections} = this.state;

        return (
            <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                onChange={this.updateSections} />
        )
    }
}

const styles = StyleSheet.create({
    rowTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
