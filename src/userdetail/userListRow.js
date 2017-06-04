/**
 * Created by Dev on 5/13/17.
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

import  Rating from './ratingComponet'
export default class DetailComponent extends Component {

    constructor(props){
        super(props);
        
        this.state={
            rowId: props.rowId || 0,
        }
    }

    componentWillReceiveProps(nextProps){
    }
    
    render() {
        return(
            <View style={{backgroundColor: "#FFF", borderRadius:3, flexDirection:'row', borderWidth:1.5, borderColor: Constant.COLOR.boxBorder}} >
                <View style={{flex:0.25,paddingTop:15 }}>
                    <Image source={require('../images/tmpuser.jpeg')}
                           style={{ alignSelf: 'center',
                               height:Constant.SCREEN.width*0.16,
                               width: Constant.SCREEN.width*0.16,
                               borderRadius:(Constant.SCREEN.width*0.16)/2,
                               resizeMode:'cover',
                           }}/>
                </View>

                <View style={{flex:0.75, paddingTop:15, paddingLeft:10, paddingRight:15, paddingBottom:10}}>

                    <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                        <Text style={{ fontSize:15, fontWeight: 'bold', color: Constant.COLOR.appBlack }}>TOM BRADY</Text>
                        <Image source={require('../images/bookmark.png')} style={{resizeMode:'contain'}}/>
                    </View>

                    <View style={{ flexDirection:'row', justifyContent:'space-between', paddingTop:8 }}>
                        <View style={{ padding:5, backgroundColor: 'rgb(157,167,179)', borderRadius: 3}}>
                            <Text style={{ color: '#FFF', fontSize:15}}>Quarterback</Text>
                        </View>
                        <Rating/>
                    </View>

                    <View style={styles.innerRowView}>
                        <Text style={styles.detailText}>
                            Georgia, Milton(Alpharetta) | Senior,2015 </Text>
                    </View>

                    <View style={{ flexDirection:'row', justifyContent:'flex-start' }}>
                        <View style={styles.innerRowView}>
                            <Text style={styles.infoText}>Height :</Text>
                            <Text style={styles.detailText}>6-4</Text>
                        </View>

                        <View style={[styles.innerRowView, { paddingLeft:15}]}>
                            <Text style={styles.infoText}>Weight</Text>
                            <Text style={styles.detailText}> : 225</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection:'row', justifyContent:'space-between', flexWrap: 'wrap' }}>
                        <View style={styles.innerRowView}>
                            <Text style={styles.infoText}>40yd</Text>
                            <Text style={styles.detailText}> : 4.7</Text>
                        </View>

                        <View style={styles.innerRowView}>
                            <Text style={styles.infoText}>VJ</Text>
                            <Text style={styles.detailText}> : 35</Text>
                        </View>

                        <View style={styles.innerRowView}>
                            <Text style={styles.infoText}>SH</Text>
                            <Text style={styles.detailText}> : 3.7</Text>
                        </View>

                        <View style={styles.innerRowView}>
                            <Text style={styles.infoText}>PT</Text>
                            <Text style={styles.detailText}> : {"40'3"}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection:'row', justifyContent:'flex-start', paddingTop:8 }}>
                        <Text style={styles.infoText}>Hudl</Text>
                        <Text style={styles.linkText}> : shvl.com/v/35fg2 </Text>
                    </View>

                    <TouchableHighlight onPress={this.props.onViewProfile} underlayColor={"transparent"}>
                        <View style={{ flexDirection:'row', borderWidth:0.8, borderColor: Constant.COLOR.appColor, borderRadius: 3, width: 120,
                            alignItems: 'center', justifyContent: 'center', padding: 5, marginTop:8}}>
                            <Text style={{color:Constant.COLOR.appColor,fontSize:15, fontWeight:'bold'}}>VIEW PROFILE</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    leftView:{

    },
    rightView:{

    },
    profileIcon:{

    },
    infoText:{
        color: 'rgb(163,172,183)',
        fontSize:15
    },
    detailText:{
        color: Constant.COLOR.appBlack,
        fontSize:15,
    },
    btnProfile:{

    },
    quarterBackBtton:{

    },
    linkText:{
        color: 'rgb(0,102,255)',
    },
    innerRowView:{
        flexDirection: 'row',
        paddingTop:8
    }

});
