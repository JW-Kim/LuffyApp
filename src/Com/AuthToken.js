import Constants from './Constants.js';
import {
    AsyncStorage
} from 'react-native';

function getToken(){
    return new Promise(resolve => {
         AsyncStorage.getItem('access_token', (err, result) => {
             const FetchOptions = {
                 headers: {
                     'Authorization': `Bearer ${result}`
                  }
             }
            resolve(FetchOptions);
         })
    })
}



export { getToken }
