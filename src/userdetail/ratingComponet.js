/**
 * Created by Dev on 5/14/17.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableHighlight,
    Alert
} from 'react-native';
import Constant from '../helper/constant'

export default class RatingComponent extends Component {

    constructor(props){
        super(props);
        this.state={
            rate: 0,
            isBigger: props.isBigger
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    onClick = (index) => {
        this.setState({
            rate: index
        })
    };

    render() {
        return(
            <View style={ styles.ratingVW}>
                <TouchableHighlight onPress={ this.onClick.bind(this,1) }  underlayColor={"transparent"}>
                    <Image source={(this.state.rate >= 1) ? require('../images/yellow_star.png') : require('../images/grey_star.png')}
                           style={ this.state.isBigger && styles.sizeLarge || styles.icon}/>
                </TouchableHighlight>

                <TouchableHighlight onPress={ this.onClick.bind(this,2) }  underlayColor={"transparent"}>
                    <Image source={(this.state.rate >= 2) ? require('../images/yellow_star.png') : require('../images/grey_star.png')}
                           style={ this.state.isBigger && styles.sizeLarge || styles.icon}/>
                </TouchableHighlight>

                <TouchableHighlight onPress={ this.onClick.bind(this,3) }  underlayColor={"transparent"}>
                    <Image source={(this.state.rate >= 3) ? require('../images/yellow_star.png') : require('../images/grey_star.png')}
                           style={ this.state.isBigger && styles.sizeLarge || styles.icon}/>
                </TouchableHighlight>

                <TouchableHighlight onPress={ this.onClick.bind(this,4) }  underlayColor={"transparent"}>
                    <Image source={(this.state.rate >= 4) ? require('../images/yellow_star.png') : require('../images/grey_star.png')}
                           style={ this.state.isBigger && styles.sizeLarge || styles.icon}/>
                </TouchableHighlight>

                <TouchableHighlight onPress={ this.onClick.bind(this,5) }  underlayColor={"transparent"}>
                    <Image source={(this.state.rate >= 5) ? require('../images/yellow_star.png') : require('../images/grey_star.png')}
                           style={ this.state.isBigger && styles.sizeLarge || styles.icon}/>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ratingVW:{
        backgroundColor: "#FFF",
        borderRadius:3,
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center'
    },
    icon:{
        resizeMode: 'contain',
        margin:2,
    },
    sizeLarge:{
        width:15,
        height:15,
        resizeMode:'cover',
        margin:3,
    }
});