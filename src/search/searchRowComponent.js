/**
 * Created by Dev on 5/4/17.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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

export default class DetailComponent extends Component {

    constructor(props){
        super(props);
        this.state={
            rowId: props.rowId || 0,
            isSelected: props.isSelected || false,
            rowData: props.rowData
        }
    }

    componentWillReceiveProps(nextProps){
    }

    onSectionClick = (rowId) => {
    };

    render() {

        return(
            <View style={{backgroundColor: "#FFF", borderRadius:3, borderWidth:1.5, borderColor: Constant.COLOR.boxBorder}} >
                <TouchableHighlight onPress={ this.onSectionClick.bind(this,this.state.rowId) } underlayColor={"transparent"}>
                    <View style={{ flexDirection: 'row', paddingLeft:15, paddingTop:15, paddingBottom: 15,
                     }}>
                        <View style={{ flex:0.85 }}>
                            <Text style={{ color: Constant.COLOR.appBlack, fontSize: 15,lineHeight: 22, marginLeft:10, marginRight:10}}>
                                This is static details. This is static details.
                                This is static details
                                This is static details. This is static details.
                            </Text>
                        </View>
                        <View style={{ width:1, backgroundColor:Constant.COLOR.grayBorder }}></View>
                        <View style={{ flex:0.15, alignContent: 'center', justifyContent:'center', alignItems:'center' }}>
                            <Image source={require('../images/up_cross_arrow.png')}
                                   style={{ height: Constant.SCREEN.width * 0.04,
                                    width: Constant.SCREEN.width * 0.04,
                                   resizeMode: 'contain'}}/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(238,238,238)'
    }
});