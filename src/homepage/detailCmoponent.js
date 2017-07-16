/**
 * Created by Dev on 5/4/17.
 */
/**
 *0 Sample React Native App
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
import Constant from '../helper/constant';

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
        this.setState({
            isSelected: !this.state.isSelected
        });
        this.props.onSectionClick(rowId, true);
    };

    render() {
        return(
            <View style={styles.rowView}>
                <TouchableHighlight onPress={ this.onSectionClick.bind(this,this.state.rowId) }
                                    underlayColor={"transparent"}>
                    <View style={styles.mainView}>
                        <View style={styles.imgOuter}>
                            <Image source={ this.state.rowData.icon }
                                   style={styles.sectionIcon}/>
                        </View>
                        <View style={{ flex:0.78 }}>
                            <Text style={styles.sectionTitle}>
                                {this.state.rowData.title.toUpperCase() }</Text>
                            <Text style={styles.sectionDetail}>
                                This is static details. This is static details.
                                This is static details
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                {!(this.state.isSelected) ? null :
                    (this.state.rowData.details.length == 0) ?
                        null
                        :
                        <View style={{ paddingBottom: 15}}>
                            <View style={styles.separator}></View>
                            {
                                this.state.rowData.details.map(function (item) {
                                    return(
                                        <View1 style={styles.rowMainView}>
                                            <View style={styles.rowIconView}>
                                                <Image source={require('../images/bullet.png')}
                                                       style={styles.indexIcon}/>
                                            </View>
                                            <View style={{ flex:0.78 }}>
                                                <Text style={styles.rowText}>
                                                    250 lb linebacker that runs 4.8 40 yd dash
                                                </Text>
                                            </View>
                                        </View1>
                                    )
                                })
                            }
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgb(238,238,238)'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    rowView:{backgroundColor: "#FFF",
        borderRadius:3,
        borderWidth:1.5,
        borderColor: Constant.COLOR.boxBorder
    },
    mainView:{ flexDirection: 'row',
        padding:15,
        paddingLeft:0
    },
    imgOuter:{
        flex:0.22,
        alignContent: 'center',
        justifyContent:'flex-start'
    },
    sectionIcon:{
        height: Constant.SCREEN.width * 0.1,
        width: Constant.SCREEN.width * 0.1-10,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    sectionTitle:{
        marginBottom:10,
        fontSize:15,
        fontWeight:'bold',
        color: Constant.COLOR.titleFont
    },sectionDetail:{
        fontSize: 15,
        color: 'rgb(133,133,133)',
        marginBottom:0,
        lineHeight: 22
    },
    separator:{
        height: 2,
        backgroundColor: Constant.COLOR.background,
        marginLeft: 15
    },
    rowIconView:{
        flex:0.22,
        alignContent: 'center',
        justifyContent:'flex-start'
    },
    rowMainView:{
        flexDirection: 'row',
        paddingTop: 15,
        paddingRight: 15
    },
    indexIcon:{
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    rowText:{
        color: Constant.COLOR.appBlack,
        fontSize: 15,
        lineHeight: 22
    },
});