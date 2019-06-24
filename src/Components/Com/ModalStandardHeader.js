import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';

export default class ModalStandardHeader extends Component {
    constructor(props) {
        super(props);

        let close = this.close.bind(this);
    }

    close() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.sideView}>
                    <TouchableOpacity onPress={() => this.close()}>
                        <Icons name="times" color="#000" size={21}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.sideView}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        height: 60,
        backgroundColor: '#ebe0eb',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20
    },

    sideView: {
        width: 80
    },

    titleText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 21
    }
})