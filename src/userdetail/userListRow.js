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
    Alert,
    Linking,
} from 'react-native';
import Constant from '../helper/constant'

import  Rating from './ratingComponet'
export default class DetailComponent extends Component {

    constructor(props){
        super(props);

        this.state={
            rowId: props.rowId || 0,
            rowData: props.rowData || {}
        }
    }

    componentWillReceiveProps(nextProps){
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    render() {
        return(
            <View style={{backgroundColor: "#FFF", borderRadius:3, flexDirection:'row', borderWidth:1.5, borderColor: Constant.COLOR.boxBorder}} >
                <View style={{flex:0.25,paddingTop:15 }}>
                    <Image source={require('../images/userprofile.png')}
                           //source={{uri: this.state.rowData.main_photo || ""}}
                           style={{ alignSelf: 'center',
                               height:Constant.SCREEN.width*0.16,
                               width: Constant.SCREEN.width*0.16,
                               borderRadius:(Constant.SCREEN.width*0.16)/2,
                               resizeMode:'cover',
                           }}/>
                </View>

                <View style={{flex:0.75, paddingTop:15, paddingLeft:10, paddingRight:15, paddingBottom:10}}>

                    <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
                        <Text style={{ fontSize:15, fontWeight: 'bold', color: Constant.COLOR.appBlack }}>
                            { (this.state.rowData.full_name) ?
                                this.capitalizeFirstLetter(this.state.rowData.full_name) : '' }
                        </Text>
                        <Image source={require('../images/bookmark.png')} style={{resizeMode:'contain'}}/>
                    </View>

                    <View style={{ flexDirection:'row', justifyContent:'space-between', paddingTop:8 }}>
                        <View style={{ padding:5, backgroundColor: 'rgb(157,167,179)', borderRadius: 3}}>
                            <Text style={{ color: '#FFF', fontSize:15}}>Quarterback</Text>
                        </View>
                        <Rating rate={ this.state.rowData.rating || 0 } />
                    </View>

                    <View style={styles.innerRowView}>
                        <Text style={styles.detailText}>
                            Georgia, Milton(Alpharetta) | { this.state.rowData.position.name || "null" } ,
                            { (this.state.rowData.graduation_year) ? this.state.rowData.graduation_year.toString() : "null" } </Text>
                    </View>

                    <View style={{ flexDirection:'row', justifyContent:'flex-start' }}>
                        <View style={styles.innerRowView}>
                            <Text style={styles.infoText}>Height :</Text>
                            <Text style={styles.detailText}>{ this.state.rowData.height || "null" }</Text>
                        </View>

                        <View style={[styles.innerRowView, { paddingLeft:15}]}>
                            <Text style={styles.infoText}>Weight</Text>
                            <Text style={styles.detailText}> : { this.state.rowData.weight || "null" }</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection:'row', justifyContent:'space-between', flexWrap: 'wrap' }}>
                        <View style={styles.innerRowView}>
                            <Text style={styles.infoText}>40yd</Text>
                            <Text style={styles.detailText}> : { this.state.rowData.result_40yards || "null"}</Text>
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
                        <TouchableHighlight onPress={ ()=>{
                            if(this.state.rowData.hudl_profile_url){ Linking.openURL(this.state.rowData.hudl_profile_url)}}}
                                            underlayColor={"transparent"}>
                            <Text style={styles.linkText}> :  { this.state.rowData.hudl_profile_url || "null"} </Text>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight onPress={() => this.props.onViewProfile(this.state.rowData.id)}
                                        underlayColor={"transparent"}>
                        <View style={{ flexDirection:'row', borderWidth:0.8,
                            borderColor: Constant.COLOR.appColor, borderRadius: 3,
                            alignItems: 'center', justifyContent: 'center', padding: 5,
                            marginTop:8}}>
                            <Text style={{color:Constant.COLOR.appColor,fontSize:15, fontWeight:'bold',
                                alignSelf:'center'}}>VIEW PROFILE</Text>
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
