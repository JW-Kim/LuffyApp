import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    ButtonGroup
} from 'react-native-elements';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import DiaryDtlBtnGroupGoodIcon from './DiaryDtlBtnGroupGoodIcon'
import DiaryDtlBtnGroupNotBadIcon from './DiaryDtlBtnGroupNotBadIcon'
import DiaryDtlBtnGroupBadIcon from './DiaryDtlBtnGroupBadIcon'

export default class DiaryDtlBtnGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    componentDidMount() {
        const {code} = this.props;

        if(code != null) {
            let selectedIndex = 0;
            let selectedButtonStyle = {backgroundColor: '#33cc33'}

            if(code === 'good') {
                selectedIndex = 0;
                selectedButtonStyle = {backgroundColor: '#33cc33'}
            } else if (code === 'notBad') {
                selectedIndex = 1;
                selectedButtonStyle = {backgroundColor: '#ff8c00'}
            } else if (code === 'bad') {
                selectedIndex = 2;
                selectedButtonStyle = {backgroundColor: '#ff471a'}
            }
            this.setState({selectedIndex, selectedButtonStyle})
        }
    }

    componentWillReceiveProps(nextProps) {
        const {code} = this.props;

        if(nextProps.code != code && nextProps.code != '' && nextProps.code != null) {
            let selectedIndex = 0;
            let selectedButtonStyle = {backgroundColor: '#33cc33'}

            if(nextProps.code === 'good') {
                selectedIndex = 0;
                selectedButtonStyle = {backgroundColor: '#33cc33'}
            } else if (nextProps.code === 'notBad') {
                selectedIndex = 1;
                selectedButtonStyle = {backgroundColor: '#ff8c00'}
            } else if (nextProps.code === 'bad') {
                selectedIndex = 2;
                selectedButtonStyle = {backgroundColor: '#ff471a'}
            }
            this.setState({selectedIndex, selectedButtonStyle})
        }
    }

    updateIndex (selectedIndex) {
        const {setCode} = this.props;

        if(selectedIndex === 0) {
            setCode('good');
        } else if (selectedIndex === 1 ) {
            setCode('notBad');
        } else {
            setCode('bad');
        }
    }

    render() {
        const buttons = [{ element: DiaryDtlBtnGroupGoodIcon }, { element: DiaryDtlBtnGroupNotBadIcon }, { element: DiaryDtlBtnGroupBadIcon }]
        const { selectedIndex, selectedButtonStyle } = this.state
        return (
            <View style={{flex: 1}}>
                <ButtonGroup
                      onPress={this.updateIndex}
                      selectedIndex={selectedIndex}
                      selectedButtonStyle={selectedButtonStyle}
                      buttons={buttons}
                      innerBorderStyle={{width: 0, color: '#fff'}}
                      buttonStyle={{backgroundColor: '#fff'}}
                      containerStyle={{height: 50, borderWidth: 0}}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
