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
    TouchableOpacity,
    TextInput
} from 'react-native';

import NavigationBar from '../customNavigator';
import Constant from '../helper/constant';
import RowComponent from './userListRow';
import StatusBar from '../statusBar';
import { NavigationActions } from 'react-navigation';
import { authAPICall } from '../helper/apiHelper/commonAPICall';
import ApConstant from '../helper/apiHelper/apiConstant';

export default class Search extends Component {

    constructor(props){
        super(props);
        this.state={
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            arrList: [],
            meta: {},
            isLoading: false
        }
    }

    componentWillMount(){
        this.getAthleteDetails();
    }

    componentDidMount(){
    }

    //API call
    getAthleteDetails() {

        this.setIsLoading(true);
        var url = ApConstant.athlete;
        if(this.state.meta.next != null){
            url = this.state.meta.next;
        }

        authAPICall({url: url}).then(res => {
            let athletes = this.state.arrList;
            athletes.push.apply(athletes, res.objects);

            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(athletes),
                arrList: athletes,
                meta: res.meta,
            });
            this.setIsLoading(false);
        }).catch(err => {
            debugger;
        });
    }

    setIsLoading = (flag) =>{
        this.setState({
            isLoading: flag,
        });
    }

    onViewProfile = (id) => {
        // const { navigate } = this.props.navigation;
        // navigate('UserDetail');

        const goToProfile = NavigationActions.navigate({
            routeName: 'UserDetail',
            params: {
                athleteId: id
            }
        });
        this.props.navigation.dispatch(goToProfile);

    };

    renderRow = (rowData, sectionId, rowId) => {
        return(
            <RowComponent rowId={rowId}
                          rowData={rowData}
                          onViewProfile={this.onViewProfile}
            />
        )
    };

    renderSeparator = () => {
        return(
            <View style={{ height: 10, backgroundColor: Constant.COLOR.background}}></View>
        )
    };

    //Navigation bar
    onRightButtonPress = () =>{
    };

    onLeftButtonPress = () =>{
        const backAction = NavigationActions.back({
        });
        this.props.navigation.dispatch(backAction)
    };

    //onLast cell
    onLastRow = () => {
        this.getAthleteDetails();
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar/>
                <NavigationBar
                    title="shvl"
                    leftItems={[{ icon: require('../images/menu.png'), onPress:this.onLeftButtonPress  }]}
                    rightItems={[{ icon: require('../images/setting.png'), onPress:this.onRightButtonPress  }]}
                />

                <View style={{backgroundColor: "#FFF", height: 60, flexDirection:'row', padding:10,
                    alignItem:'center', justifyContent:'center', alignContent: 'center'}}>

                    <TextInput
                        style={{ paddingLeft: 10,fontSize:15, color: Constant.COLOR.appColor,
                            placeholderTextColor: Constant.COLOR.grayFont, flex:0.9}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholder={"Search here"}
                        underlineColorAndroid="transparent"
                        enablesReturnKeyAutomatically={true}
                    />
                    <Image source={require('../images/compose.png')} style={{flex: 0.1, resizeMode:'contain', alignSelf:'center'}}/>

                </View>

                <View style={{backgroundColor: "#FFF", height: 60, margin:10,marginBottom:0, borderRadius: 3,
                    flexDirection:'row', flexWrap:'wrap', alignItem:'flex-start', justifyContent:'center', paddingLeft:10, paddingRight:10,
                    borderWidth:1.5, borderColor: Constant.COLOR.boxBorder}} >
                    <Text style={{fontSize: 15, color: Constant.COLOR.titleFont, alignSelf: 'center' }}>Showing search result for
                        {" \"High school football players in georgia\""}</Text>
                </View>

                <View style={{ flexDirection: 'column', flex:1, padding: 10 }}>

                    <ListView dataSource={this.state.dataSource}
                              onEndReachedThreshold={100}
                              ref="listView"
                              renderRow={this.renderRow}
                              renderSeparator={this.renderSeparator}
                              removeClippedSubviews={false}
                              showsVerticalScrollIndicator={false}
                              onEndReached={() =>  this.onLastRow() }
                              enableEmptySections={ true }
                    />

                </View>
                { (this.state.isLoading) &&
                <View style={{backgroundColor: '#FFF', height: 50, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{ fontSize:15, fontWeight: '600'}}>Loading....</Text>
                </View>
                || null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:Constant.COLOR.background,
    }
});