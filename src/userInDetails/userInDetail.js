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
    StatusBar,
    TextInput,
    ScrollView,
    FlatList,
    Linking,
} from 'react-native';

import NavigationBar from '../customNavigator';
import Constant from '../helper/constant';
import  Rating from '../userdetail/ratingComponet'
import { NavigationActions } from 'react-navigation';
// import VideoPlayer from 'react-native-video-player';
import { authAPICall } from '../helper/apiHelper/commonAPICall';
import ApConstant from '../helper/apiHelper/apiConstant';

export default class Search extends Component {

    constructor(props){
        super(props);
        this.state={
            athleteId: props.navigation.state.params.athleteId || 0,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            arrList: [],
            userDetail: {},
        }
    }

    componentWillMount(){
        if(this.state.athleteId != 0){
            this.getAthleteById();
        }
    }

    componentDidMount(){
        debugger;
        console.log(this.state.userDetail);
    }


    //API call
    getAthleteById() {
        var url = ApConstant.athlete + this.state.athleteId;
        authAPICall({url: url}).then(res => {
            this.setState({
                userDetail: res
            });
            debugger;

        }).catch(err => {
            debugger;
        });
    }

    //Navigation bar
    onRightButtonPress = () =>{
    };

    onLeftButtonPress = () =>{
        const backAction = NavigationActions.back({
        });
        this.props.navigation.dispatch(backAction)
    };

    //Video gallery
    renderVideoList = (item) => {
        return(
            <View style={{ flex:1,width:Constant.SCREEN.width/2, backgroundColor:'#FFF', marginRight:10,
            padding:5, borderWidth:2, borderRadius:3, borderColor:Constant.COLOR.boxBorder}}>
                <Image source={require('../images/videoPlaceholder.jpg')} style={{height: Constant.SCREEN.width/3.5,
                    width:Constant.SCREEN.width/2-14,
                    resizeMode:'cover'}}/>
                <Text style={{color: 'rgb(163,172,183)',
                    fontSize:15,
                    fontWeight:'500',
                    marginTop:10
                }}>dfdg</Text>

                <Text style={{color: '#FFF',
                    fontSize:14,
                    fontWeight:'500',
                    backgroundColor:'rgba(0,0,0,0.5)',
                    position:'absolute',
                    padding:2,
                    marginTop:Constant.SCREEN.width/3.5-25,
                    marginLeft: Constant.SCREEN.width/2-60,
                    numberOfLines: 1
                }} >02:30</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <NavigationBar
                    title="shvl"
                    leftItems={[{ icon: require('../images/back.png'), onPress:this.onLeftButtonPress  }]}
                    rightItems={[{ icon: require('../images/more.png'), onPress:this.onRightButtonPress  }]}
                />
                <ScrollView style={{flex:1}}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                >
                    <View style={{flex:1, margin:15, backgroundColor:'#FFF',
                        borderRadius:3, padding:20, borderWidth:1.5,
                        borderColor: Constant.COLOR.boxBorder,
                        alignItem: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image defaultSource={require('../images/userprofile.png')}
                               source={{uri: this.state.userDetail.main_photo || ""}}
                               style={{ alignSelf: 'center',
                                   height:Constant.SCREEN.width/3,
                                   width: Constant.SCREEN.width/3,
                                   borderRadius:Constant.SCREEN.width/6,
                                   resizeMode:'cover',
                                   marginBottom:10,
                               }}/>
                        <Text style={{marginBottom:10, alignSelf: 'center', fontSize:15, fontWeight: 'bold',
                            color: Constant.COLOR.appBlack }}>
                            { (this.state.userDetail.full_name) ? this.state.userDetail.full_name.toString().toUpperCase() : 'null'
                                }</Text>
                        <View style={{marginBottom:10, alignSelf: 'center', backgroundColor: 'rgb(157,167,179)', borderRadius: 3,
                            justifyContent:'center', width: 105}}>
                            <Text style={{color: '#FFF', fontSize:15, alignSelf:'center', padding: 8}}>Quarterback</Text>
                        </View>
                        <Rating isBigger={true} />
                        <Text style={styles.detailText}>
                            Georgia, Milton(Alpharetta) |
                            { "null" } ,
                            { (this.state.userDetail.graduation_year) ?
                                this.state.userDetail.graduation_year.toString() : "null" } </Text>
                        <View style={{ height:2, backgroundColor: Constant.COLOR.boxBorder, marginBottom:15, marginTop:15}}/>

                        <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between',marginBottom:20 }}>
                            <View>
                                <Text style={styles.infoText}>HEIGHT</Text>
                                <Text style={styles.detailText}>{ this.state.userDetail.height || 'nill' }</Text>
                            </View>

                            <View>
                                <Text style={styles.infoText}>WEIGHT</Text>
                                <Text style={styles.detailText}>{ this.state.userDetail.weight || 'nill' }</Text>
                            </View>

                            <View>
                                <Text style={styles.infoText}>40 YD TIME</Text>
                                <Text style={styles.detailText}> { this.state.userDetail.result_40yards || "null"}</Text>
                            </View>
                        </View>

                        <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between',marginBottom:20 }}>
                            <View>
                                <Text style={styles.infoText}>VERTICAL</Text>
                                <Text style={styles.detailText}>6-4</Text>
                            </View>

                            <View>
                                <Text style={styles.infoText}>POWER TOSS</Text>
                                <Text style={styles.detailText}>225</Text>
                            </View>

                            <View>
                                <Text style={styles.infoText}>SHUTTLE</Text>
                                <Text style={styles.detailText}> 4.7</Text>
                            </View>

                        </View>

                        <View style={{ justifyContent:'flex-start', paddingTop:8 }}>
                            <Text style={[styles.infoText,{alignSelf:'flex-start'}]}>HUDL</Text>
                            <TouchableHighlight onPress={ ()=>{
                                if(this.state.userDetail.hudl_profile_url){ Linking.openURL(this.state.userDetail.hudl_profile_url)}}}
                                                underlayColor={"transparent"}>
                                <Text style={styles.linkText}> { this.state.userDetail.hudl_profile_url || "null"} </Text>
                            </TouchableHighlight>


                        </View>
                        <View style={{ height:2, backgroundColor: Constant.COLOR.boxBorder, marginBottom:15, marginTop:15}}/>

                        <Text style={{color: 'rgb(163,172,183)',
                            fontSize:15,
                            fontWeight:'bold',
                            marginBottom:10
                        }}>VIDEO</Text>
                        <View style={{height:Constant.SCREEN.width/2.5 + 10}}>
                            <FlatList
                                data={["23423","34234","344","343"]}
                                renderItem={this.renderVideoList}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            />

                        </View>
                    </View></ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:Constant.COLOR.background,
    },

    infoText:{
        color: 'rgb(163,172,183)',
        fontSize:15,
        fontWeight:'bold',
        alignSelf:'center',
    },
    detailText:{
        color: Constant.COLOR.appBlack,
        fontSize:15,
        alignSelf:'center',
        marginTop:5,
    },
    linkText:{
        color: 'rgb(0,102,255)',
        fontSize:15,
        marginTop:5,
    },

});