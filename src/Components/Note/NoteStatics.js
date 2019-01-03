import React, {
    Component
} from 'react';
import {
    View,
    WebView
} from 'react-native';

export default class NoteStatics extends Component {
    static navigationOptions = {
        title: '통계'
    };

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount () {
    }

    render(){
        return(
            <WebView
                source={{uri:'http://58.141.217.15:8000/#/noteStatics'}}
            />
        )
    }
}
