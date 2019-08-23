import React, {
    Component
} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';

export default class Edit extends Component {
    constructor(props) {
        super(props);

    }

    renderInputValClear() {
        const {value, onChangeText, height} = this.props;
        const style = {position: 'absolute', right: 0, alignItems: 'center', justifyContent: 'center', height: Number(height), width: 40}

        if (value === '') {
            return(<View></View>)
        } else {
            return(
                <TouchableOpacity onPress={() => onChangeText('')} style={style}>
                    <Icons name="times-circle" color="gray" size={21} />
                </TouchableOpacity>
            )
        }
    }

    render() {
        const {style, underlineColorAndroid, placeholder, onChangeText, onFocus, onBlur, value, autoCompleteType, secureTextEntry, onRef} = this.props;

        return (
            <View style={{flex: 1}}>
                <TextInput
                    ref={(input) => onRef(input)}
                    style={style}
                    underlineColorAndroid={underlineColorAndroid}
                    placeholder={placeholder}
                    autoCompleteType={autoCompleteType}
                    secureTextEntry={secureTextEntry}
                    onChangeText={(text) => onChangeText(text)}
                    onFocus={() => onFocus()}
                    onBlur={() => onBlur()}
                    value={value}>
                </TextInput>
                {this.renderInputValClear()}
            </View>
        )
    }
}

const styles = StyleSheet.create({

})