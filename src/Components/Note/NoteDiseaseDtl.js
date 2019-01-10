import React, {
    Component
} from 'react';
import {
    View,
    Text
} from 'react-native';
import ModalHeader from '../ModalHeader.js'

export default class NoteDiseaseDtl extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount () {
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <ModalHeader
                    title="질병 작성"
                    goEvent={this.insertDisease.bind(this)}
                    buttonTitle={'글쓰기'}
                ></ModalHeader>
            </View>
        )
    }
    
    insertDisease(){
    }
}
