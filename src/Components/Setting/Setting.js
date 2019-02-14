import React, {
    Component
} from 'react';
import {
    View,
    Text,
	StyleSheet
} from 'react-native';

export default class Setting extends Component {

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
				<Text>Setting</Text>
			</View>   
        )
    }
}

const styles = StyleSheet.create({


})