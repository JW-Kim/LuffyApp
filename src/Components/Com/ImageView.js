import React, {
    Component
} from 'react';
import {
    View,
    Dimensions,
    AsyncStorage,
    Image
} from 'react-native';
import ScalableImage from 'react-native-scalable-image';
import RNFetchBlob from 'react-native-fetch-blob';
import Constants from '../../Com/Constants.js';

export default class ImageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            base64Str: null
        }
    }

    componentWillMount() {

        var cur = this;
        AsyncStorage.getItem('access_token', (err, result) => {
            RNFetchBlob.config({
                trusty: true
            })
            .fetch('GET', `${Constants.DOMAIN}/product/file/download?fileId=${this.props.fileId}`, {
                'Authorization': 'Bearer ' + result
            })
            // when response status code is 200
                .then((res) => {
                    let base64Str = res.base64();
                    let imageBase64 = 'data:image/jpeg;base64,' + base64Str;
                    cur.setState({
                        base64Str: imageBase64
                    })
                })
                // Status code is not 200
                .catch((errorMessage, statusCode) => {
                    // error handling
                })

        })
    }

    render() {
        const { type, style } = this.props;

        if(type === 'unScalable') {
            return (
                <Image style={style} source={{uri: this.state.base64Str}}/>
            )
        }

        return (
            <ScalableImage width={this.props.width} source={{uri: this.state.base64Str}}/>
        )
    }
}
