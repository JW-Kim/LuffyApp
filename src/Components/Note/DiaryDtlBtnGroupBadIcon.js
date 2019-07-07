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

export default class DiaryDtlBtnGroupGoodIcon extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
             <FontAwesomeIcons name="frown-o" color="#000"/>
        )
    }
}

const styles = StyleSheet.create({

})
