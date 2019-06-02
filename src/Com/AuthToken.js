import Constants from './Constants.js';
import {
    AsyncStorage
} from 'react-native';

function getToken(options){
    return new Promise(resolve => {
         AsyncStorage.getItem('access_token', (err, result) => {
             const FetchOptions = {
                 headers: {
                     'Authorization': `Bearer ${result}`
                  }
             }

             if(options !== null && options !== undefined && options.headers !== null && options.headers !== undefined){
                options.headers.Authorization = `Bearer ${result}`;
             }

            resolve(Object.assign(FetchOptions, options));
         })
    })
}



export { getToken }
