import React, {
    Component
} from 'react';
import {
    View
} from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

export default class CodeTypeIcon extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {(this.props.code == '좋음' || this.props.code == 'good' ) &&
                <FontAwesomeIcons name="smile-o" color="#33cc33"/>}
                {(this.props.code == '보통' || this.props.code == 'notBad' ) &&
                <FontAwesomeIcons name="meh-o" color="#ff8c00"/>}
                {(this.props.code == '나쁨' || this.props.code == 'bad' ) &&
                <FontAwesomeIcons name="frown-o" color="#ff471a"/>}
            </View>
        )
    }
}
