import React, {
    Component
} from 'react';
import {
    View
} from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

export default class HomeCodeTypeIcon extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {this.props.code == '좋음' && <FontAwesomeIcons name="smile-o" color="#33cc33" />}
                {this.props.code == '보통' && <FontAwesomeIcons name="meh-o" color="#ff8c00" />}
                {this.props.code == '나쁨' && <FontAwesomeIcons name="frown-o" color="#ff471a" />}
            </View>
        )
    }
}
