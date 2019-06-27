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
        const style = {position: 'absolute', right: 20, bottom: Number(-((Number(height) / 2) - 10)), height: Number(height), width: 20}

        if (value === '') {
            return(<View></View>)
        } else {
            return(
                <View style={style}>
                    <TouchableOpacity onPress={() => onChangeText('')}>
                        <Icons name="times-circle" color="gray" size={16} />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        const {style, underlineColorAndroid, placeholder, onChangeText, onFocus, onBlur, value, autoCompleteType, secureTextEntry} = this.props;

        return (
            <View style={{flex: 1}}>
                <TextInput
                    style={style}
                    underlineColorAndroid={underlineColorAndroid}
                    placeholder={placeholder}
                    autoCompleteType={autoCompleteType}
                    secureTextEntry={secureTextEntry}
                    onChangeText={(text) => onChangeText(text)}
                    onFocus={() => onFocus()}
                    onBlur={() => onBlur()}
                    value={values}>
                </TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})