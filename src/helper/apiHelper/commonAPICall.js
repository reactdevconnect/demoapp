
import {
    AsyncStorage,
} from 'react-native';

const baseUrl = "http://beta.grtirn.com/" //"http://beta.grtirn.com/api/1.0/athlete/?query=";

function getStorage(key) {
    return AsyncStorage.getItem(key)
        .then(data => JSON.parse(data))
        .catch(error => Promise.reject(error));
}

export function setStorage(key, data) {
    return AsyncStorage.setItem(key, JSON.stringify(data),)
        .then(res => {
            debugger
        })
        .catch(err => {
            debugger;
        });
}

function getToken() {
    return AsyncStorage.getItem('APIToken')
        .then(data => data)
        .catch(error => Promise.reject(error));
}

function getHeaders() {
    const headers = {};
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    return getToken().then(token => {
        headers['Authorization'] = "Bearer " + JSON.parse(token).token;
        return headers;
    });
    return headers;
}

//With token
export function commonAPICall({ url, method = 'GET', body, headers = {} }) {
    debugger;
    return getHeaders()
        .then((requiredHeaders) => {
            const options = {
                headers: Object.assign(headers, requiredHeaders),
                method,
                body: body && JSON.stringify(body) || null,
            };
            return fetch(baseUrl + url, options);
        })
        .then(response => response.json())
        .then(responseData => Promise.resolve(responseData))
        .catch(error => Promise.reject(error));
}

//Without any token
export function authAPICall({ url, method = 'GET', body, headers = {} }) {
    debugger;
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    const options = {
        headers: headers,
        method,
        body: body && JSON.stringify(body) || null,
    };
    return fetch(baseUrl + url, options)
        .then(response => response.json())
        .then(responseData => Promise.resolve(responseData))
        .catch(error => Promise.reject(error));
}

//With only token
export function commonAPIWithToken({ url, method = 'GET', body, headers = {} }) {

    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    return getToken()
        .then(token => {
            headers['Authorization'] = "Bearer " + JSON.parse(token).token;
            const options = {
                headers: headers,
                method,
                body: body && JSON.stringify(body) || null,
            };
            return fetch(baseUrl + url, options)
                .then(response => response.json()   )
                .then(responseData => Promise.resolve(responseData))
                .catch(error => Promise.reject(error));
        }).catch(error => Promise.reject(error));
}