import React, { Component } from 'react';
import { TextInput } from 'react-native';

export default class basicComponentsTextInput extends Component {
    constructor(props){
        super(props)
        this.state = {text: 'basicComponentsTextInput'}
    }

    render() {
        return (
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
            />
        )
    }
}

