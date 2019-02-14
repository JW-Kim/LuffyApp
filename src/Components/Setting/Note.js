import React, {
    Component
} from 'react';
import {
    View,
    Text,
	StyleSheet
} from 'react-native';

export default class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount () {
    }

    render(){
        return(
        	<View>
				<Text>NoteSetting</Text>
			</View>   
        )
    }
}

const styles = StyleSheet.create({


})