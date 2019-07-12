import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Picker
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
    }

    render() {
        return (
            <View style={{height: 40, backgroundColor: 'white', marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Text style={{fontSize: 21, fontWeight: 'bold', color: '#000'}}>
                            일기장
                        </Text>
                    </View>
                    <View>
                        <ModalDropdown
                            defaultValue={'My'}
                            textStyle={{fontSize: 21, fontWeight: 'bold', color: '#000'}}
                            dropdownTextStyle={{fontSize: 16, color: '#000', height: 40}}
                            dropdownStyle={{height: 80, width: 100, borderColor: '#C2D8E9'}}
                            options={['일기장', '설정']}
                            showsVerticalScrollIndicator={false}
                            onSelect={(index, value) => this.chgSetting(value)}
                        />
                    </View>
                </View>
            </View>
        )
    }

    chgSetting(value) {
        if (value == '일기장') {
            this.props.navigation.navigate('NoteSetting');

        } else {
            this.props.navigation.navigate('Setting');

        }
        return false;
    }

}

const styles = StyleSheet.create({})