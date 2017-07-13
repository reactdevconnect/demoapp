import {CallApi} from './apiCall'
import Constant from './apiConstant'
import { AsyncStorage } from 'react-native'

export const loginUser = (email, password) => {

    return CallApi(Constant.baseUrl+Constant.login,'get',{},{"Auth-User":email,"Auth-Password":password,"Accept":"application/json"})
        .then((response)=>{
            return Promise.resolve(response.token)
        })
        .catch((error)=>{
            return Promise.reject(error);
        })
};