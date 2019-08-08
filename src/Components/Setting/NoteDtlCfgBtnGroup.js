import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {
    ButtonGroup
} from 'react-native-elements';

export default class NoteDtlCfgBtnGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    componentDidMount() {
        const {noteCfgStatCd} = this.props;

        if(noteCfgStatCd != null) {
            let selectedIndex = 0;

            if(noteCfgStatCd === 'Y') {
                selectedIndex = 0;
            } else {
                selectedIndex = 1;
            }
            this.setState({selectedIndex})
        }
    }
    updateIndex (selectedIndex) {
        const {setNoteCfgStatCd, noteCfgStatCd} = this.props;

        if(selectedIndex === 0) {
            setNoteCfgStatCd('Y');
        } else {
            setNoteCfgStatCd('N');
        }

        this.setState({selectedIndex});
    }

    render() {
        const {setNoteCfgStatCd, title} = this.props;
        const {selectedIndex} = this.state;
        const buttons = ['user', 'unuse']

        return (
            <View style={styles.rowView}>
                <View style={styles.rowTitle}><Text style={styles.rowText}>{title}</Text></View>
                <View style={{flex: 1}}>
                    <ButtonGroup
                      onPress={this.updateIndex}
                      selectedIndex={selectedIndex}
                      selectedButtonStyle={{backgroundColor: '#F0F6FA'}}
                      buttons={buttons}
                      innerBorderStyle={{width: 3, color: '#fff'}}
                      buttonStyle={{backgroundColor: '#fff'}}
                      containerStyle={{height: 20, borderWidth: 0.8, marginLeft: 0, marginRight: 0, borderColor: '#F0F6FA'}}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 25
    },
    rowTitle: {
        width: 150
    },
    rowText: {
        fontSize: 16,
        marginRight: 8
    }
})
