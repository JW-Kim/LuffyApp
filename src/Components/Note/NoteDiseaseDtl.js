import React, {
    Component
} from 'react';
import {
    View,
    Text
} from 'react-native';
import ModalHeader from '../ModalHeader.js'

export default class NoteStatics extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount () {
    }

    render(){    
        <View>
            <ModalHeader
                title=“질병 작성”
                goEvent={this.insertDisease.bind(this)}
            ></ModlHeader
        </View>
    }
    
    insertDisease(){
    }
}
