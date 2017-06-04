
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';

import Constant from './helper/constant';

class NavigationBar extends Component{

    constructor(props){
        super(props);
        this.state={
            title: props.title,
            leftItems: props.leftItems || [],
            rightItems: props.rightItems || [],
        }
    }

    componentWillMount(){

    }

    onPressIcon = () =>{
        Alert.alert("press")
    };

    render(){
        return(
            <View style={[styles.topBar, { paddingTop: (Constant.PLATFORM.iOS) ? 20 : 5,}]}>
                <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                    {
                        this.state.leftItems.map((item) =>{
                            return(
                                <TouchableOpacity style={styles.topBarIcon}
                                                  onPress={item.onPress }>
                                    <Image  style={styles.topBarIconImage}
                                            source={ item.icon }/>
                                </TouchableOpacity>
                            )
                        })
                    }
                    {
                        this.state.leftItems.length == 0 &&
                        <Text style={{color: 'transparent'}}>tmp</Text>
                        ||null
                    }
                </View>

                <View style={{justifyContent: 'center', alignItem:'center',flex:1}}>
                    {
                        this.state.title == "shvl" &&
                        <Image source={require('./images/header_logo.png')} style={{ resizeMode:'contain',alignSelf: 'center', }}/>
                        ||
                        <Text numberOfLines={1}
                              style={styles.topBarTitleText}>
                            { this.state.title }</Text>
                    }


                </View>

                <View style={{ flexDirection:'row', justifyContent:'flex-end'}}>
                    {
                        this.state.rightItems.map((item) =>{
                            return(
                                <TouchableOpacity style={styles.topBarIcon}
                                                  onPress={item.onPress }>
                                    <Image  style={styles.topBarIconImage}
                                            source={ item.icon }/>
                                </TouchableOpacity>
                            )
                        })
                    }
                    {
                        this.state.rightItems.length == 0 &&
                        <Text style={{color: 'transparent'}}>tmp</Text>
                        ||null
                    }


                </View>
            </View>);
    }

}

const styles = StyleSheet.create({
    topBar: {
        height: (Constant.PLATFORM.iOS) ? 64 : 54,
        backgroundColor:Constant.COLOR.appColor,
        flexDirection: 'row',
        width:Constant.SCREEN.width,
        alignItems: 'center',
        justifyContent:'space-between'
    },
    topBarIcon: {
        height: 44,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topBarIconImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    topBarTitleText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '800',
        alignSelf: 'center',
    },
});

module.exports = NavigationBar;