import React, {
    Component
} from 'react';
import {
    View,
    Dimensions,
    AsyncStorage,
    Image
} from 'react-native';
import { Avatar } from 'react-native-elements';
import ScalableImage from 'react-native-scalable-image';
import RNFetchBlob from 'react-native-fetch-blob';
import Constants from '../../Com/Constants.js';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            base64Str: null
        }
    }

    componentWillMount() {
        var cur = this;

        const {fileId} = this.props;

        AsyncStorage.getItem('access_token', (err, result) => {
            RNFetchBlob.fetch('GET', 'http://' + Constants.HOST + ':' + Constants.PORT + '/product/file/download?fileId=' + fileId, {
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
                .catch((errorMessage, statusCode) => {

                })

        })
    }

    componentWillReceiveProps(nextProps) {
        var cur = this;

        const {fileId} = this.props;

        if(nextProps.fileId != fileId) {
            AsyncStorage.getItem('access_token', (err, result) => {
                RNFetchBlob.fetch('GET', 'http://' + Constants.HOST + ':' + Constants.PORT + '/product/file/download?fileId=' + nextProps.fileId, {
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
                    .catch((errorMessage, statusCode) => {

                    })

            })
        }

    }

    render() {
        const { fileId } = this.props;
        const {base64Str} = this.state;

        if(fileId === null || fileId === '') {
            return (
                <Avatar small rounded icon={{name: 'user', type: 'font-awesome'}} />
            )
        }

        return (
            <Avatar small rounded source={{uri: base64Str}} />
        )
    }
}
