/**
 * Created by Dev on 5/15/17.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';


export default class CustomSlider extends Component {
    render() {
        return (
            <View>
                <Image source={require('../images/slider_controller.png')}/>
            </View>
        );
    }
}
