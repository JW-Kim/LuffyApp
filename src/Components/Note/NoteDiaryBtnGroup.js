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

export default class NoteDiaryBtnGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null
        }
    }

    componentDidMount() {
        const {code} = this.props;

        if(code != null) {
            let selectedIndex = 0;
            let selectedButtonStyle = {backgroundColor: '#4caf50'}

            if(code === 'good') {
                selectedIndex = 0;
                selectedButtonStyle = {backgroundColor: '#4caf50'}
            } else if (code === 'notBad') {
                selectedIndex = 1;
                selectedButtonStyle = {backgroundColor: '#f9a825'}
            } else if (code === 'bad') {
                selectedIndex = 2;
                selectedButtonStyle = {backgroundColor: '#d32f2f'}
            }
            this.setState({selectedIndex, selectedButtonStyle})
        }
    }

    componentWillReceiveProps(nextProps) {
        const {code} = this.props;

        if(nextProps.code != code && nextProps.code != '' && nextProps.code != null) {
            let selectedIndex = 0;
            let selectedButtonStyle = {backgroundColor: '#4caf50'}

            if(nextProps.code === 'good') {
                selectedIndex = 0;
                selectedButtonStyle = {backgroundColor: '#4caf50'}
            } else if (nextProps.code === 'notBad') {
                selectedIndex = 1;
                selectedButtonStyle = {backgroundColor: '#f9a825'}
            } else if (nextProps.code === 'bad') {
                selectedIndex = 2;
                selectedButtonStyle = {backgroundColor: '#d32f2f'}
            }
            this.setState({selectedIndex, selectedButtonStyle})
        }
    }

    render() {
        const {code, title} = this.props;
        const { selectedIndex, selectedButtonStyle } = this.state;
        const buttons = ['', '', ''];
        return (
            <View style={styles.rowView}>
                <View style={styles.rowTitle}><Text style={styles.rowText}>{title}</Text></View>
                <View style={{flex: 1}}>
                    <ButtonGroup
                        disabled={true}
                        selectedIndex={selectedIndex}
                        selectedButtonStyle={selectedButtonStyle}
                        buttons={buttons}
                        innerBorderStyle={{width: 0, color: '#fff'}}
                        buttonStyle={{backgroundColor: '#fff'}}
                        containerStyle={{height: 20, borderWidth: 0, marginLeft: 0, marginRight: 0}}
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
        paddingBottom: 16,
        height: 25
    },
    rowTitle: {
        width: 150
    },
    rowText: {
        fontSize: 14,
        marginRight: 8
    },
})
