/**
 * Created by Dev on 5/4/17.
 */
import React, { Component } from 'react';
import {
    Dimensions,
    Platform
} from 'react-native';

module.exports = {

    SCREEN:{
      width:Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },

    PLATFORM:{
        iOS: Platform.OS == 'ios',
        android: Platform.OS == 'android'
    },

    VIEWS:{
        homePage : "homePage",
        detailHomePage: "detailHomePage",
    },

    COLOR:{
        appColor: "rgb(62,176,105)",
        appColorA: "rgba(73,186,111,0.4)",
        titleFont: "rgb(140,152,167)",
        background: "rgb(242,242,242)",
        appBlack:"rgb(18,18,18)",

        blue: 'rgb(33,150,242)0',
        grayBack: 'rgb(238,238,238)',
        grayFont: 'rgb(133,133,133)',
        grayBorder: 'rgb(213,213,213)',
        appGray: 'rgb(239,241,243)',
        placeHolderColor: 'rgb(205,211,218)',
        boxBorder: 'rgb(235,235,235)',

    }

};