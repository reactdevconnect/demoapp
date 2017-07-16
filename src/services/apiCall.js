import ApiConstant from './apiConstant'
import axios from 'axios'
import {Alert} from 'react-native'

export function CallApi(url,type='get',data={},header=[]) {
    return axios.get(url,{headers: header})
        .then((response) => {
            return Promise.resolve(response.data.data)
        })
       .catch((err) => {
           switch (err.response.data.status_code){
              case 401:
              {
                  return Promise.reject(err.response.data.data)
              }
               default:{
                   return Promise.reject(err);
               }
          }
    });
}

export function showAlert(alertText) {
    Alert.alert("SHVL",
        alertText,
        [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
    )
}