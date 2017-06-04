/**
 * Created by Dev on 5/4/17.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

import Constant from './helper/constant'

export default class demoApp extends Component {

    constructor(props){
        super(props);
        this.state={
            onlyTitle: props.onlyTitle,
            isLeftIcon: props.isLeftIcon,
            leftIcon: props.leftIcon || require('./images/navigationbar/Menu.png'),
            title: props.title,
            isRightIcon: props.isRightIcon,
            rightIcon: props.rightIcon || require('./images/navigationbar/Search.png'),
        }
    }

    componentWillReceiveProps(nzextProps) {
    }

    render() {
        return (
            <View style={[styles.navigationbar, { justifyContent: 'space-between'}]}>
                <TouchableOpacity onPress={ this.props.onLeftButtonPress }>
                <Image source={ this.state.leftIcon }
                       style={[styles.barIcon, { tintColor: (!this.state.isLeftIcon) ? "transparent" : "#FFF", alignSelf: 'flex-start'}]}/>
                </TouchableOpacity>

                <Image source={require('./images/header_logo.png')} style={{ resizeMode:'contain', }}/>

                <TouchableOpacity onPress={ this.props.onRightButtonPress }>
                    <Image source={ this.state.rightIcon }
                           style={[styles.barIcon, { tintColor: (!this.state.isRightIcon) ? "transparent" : "#FFF", alignSelf: 'flex-end'}]}/>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    navigationbar:{
        // backgroundColor:this.state.barColor,
        height: 64,
        flexDirection: 'row',
        paddingTop:25,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor:Constant.COLOR.appColor,
    },
    title:{
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf:'center',
        color: '#FFF',
    },
    barIcon:{
        alignSelf:'center',
        resizeMode: 'contain',
        height: 30,
        width: 30,
        tintColor: '#FFF',
    }
});