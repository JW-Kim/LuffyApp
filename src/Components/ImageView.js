import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Dimensions,
    AsyncStorage
} from 'react-native';
import Image from 'react-native-scalable-image';
import RNFetchBlob from 'react-native-fetch-blob';
import Constants from '../Com/Constants.js';
import _ from 'lodash'

export default class ImageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            base64Str : null
        }
    }

    componentWillMount () {

        var cur = this;
        if(!_.isNil(this.props.fileId)){
            AsyncStorage.getItem('access_token', (err, result) => {
                RNFetchBlob.fetch('GET', 'http://'+Constants.HOST+':'+Constants.PORT+'/product/file/download?fileId='+this.props.fileId,{
                    'Authorization': 'Bearer '+result
                })
                  // when response status code is 200
                    .then((res) => {
                        let base64Str = res.base64();
                        let imageBase64 = 'data:image/jpeg;base64,'+base64Str;
                        cur.setState({
                            base64Str : imageBase64
                        })
                  })
                  // Status code is not 200
                  .catch((errorMessage, statusCode) => {
                    // error handling
                  })

            })
        }

    }

    render(){
        return(
            <View>
            { this.props.fileId == null ? <Text></Text> :
                <Image width={Dimensions.get('window').width} source={{uri :this.state.base64Str}} />
            }
            </View>
        )
    }
}
