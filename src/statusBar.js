/**
 * Created by Dev on 5/21/17.
 */

import React, { Component } from 'react';
import {
    StatusBar
} from 'react-native';
import Constant from './helper/constant';


export default class AppStatusBar extends Component {
    render() {
        return (
            <StatusBar
                backgroundColor={Constant.COLOR.appColor}
                barStyle="light-content"
            />
        );
    }
}
