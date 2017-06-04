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
    TouchableOpacity,
    ToastAndroid
} from 'react-native';

import NavigationBar from '../customNavigator';
import Constant from '../helper/constant';
import DetailComponent from './detailCmoponent';
import StatusBar from '../statusBar';
import { NavigationActions } from 'react-navigation';

//For android only
import SpeechAndroid from 'react-native-android-voice';

export default class UserDetail extends Component {

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            arrList: []
        }
    }

    componentWillMount() {
        const data = this.getData();

        data.map((item, index) => {
            if (item.title === "Height") {
                item.icon = require('../images/height.png')
            } else if (item.title === "Weight") {
                item.icon = require('../images/weight.png')
            } else if (item.title === "Position") {
                item.icon = require('../images/position.png')
            } else if (item.title === "Class") {
                item.icon = require('../images/class.png')
            } else if (item.title === "State") {
                item.icon = require('../images/map.png')
            } else if (item.title === "High School") {
                item.icon = require('../images/highschool.png')
            } else
                item.icon = require('../images/results.png')
        });
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(data),
            arrList: data,
        });
    }

    componentDidMount(){

    }

    //Navigation bar
    onRightButtonPress = () =>{

    };

    onLeftButtonPress = () =>{
        const backAction = NavigationActions.back({
        });
        this.props.navigation.dispatch(backAction)
    };

    getData(){
        let homePageData = require('./homepage.json');
        let json = JSON.stringify(homePageData);
        let obj = JSON.parse(json);
        let homeData = obj.data;
        homeData.map((obj)=>{
            obj.isSelected = false
        });

        return homeData;
    }

    onSectionClick = (rowId, isSelected) =>{
        this.state.arrList.map((obj, index, arrr)=>{
            obj.isSelected = (index == parseInt(rowId)) ? isSelected : false
        });
        
        this.setState((prevState,props) =>{
            return {
                dataSource: this.state.dataSource.cloneWithRows(this.state.arrList),
            }
        })
    };

    renderRow = (rowData, sectionId, rowId) =>{
        return(
            <DetailComponent isSelected={rowData.isSelected}
                             rowId={rowId-1}
                             rowData={rowData}
                             onSectionClick={this.onSectionClick}
            />
        )
    };

    renderSeparator = () =>{
        return(
            <View style={{ height: 10, backgroundColor: Constant.COLOR.background}}/>
        )
    };

    onPressMicrophone = () =>{
        if(Constant.PLATFORM.android){
            this.spechRecAndroid();
        }else{
            const { navigate } = this.props.navigation;
            navigate('Recorder');
        }
    };

    //For Speech recognition
    async spechRecAndroid(){
        try{
            //More Locales will be available upon release.
            var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.ENGLISH);
            ToastAndroid.show(spokenText , ToastAndroid.LONG);
        }catch(error){
            switch(error){
                case SpeechAndroid.E_VOICE_CANCELLED:
                    ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                    break;
                case SpeechAndroid.E_NO_MATCH:
                    ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                    break;
                case SpeechAndroid.E_SERVER_ERROR:
                    ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                    break;
                /*And more errors that will be documented on Docs upon release*/
            }
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar/>
                <NavigationBar
                    title="shvl"
                    leftItems={[{ icon: require('../images/menu.png'), onPress:this.onLeftButtonPress  }]}
                    rightItems={[{ icon: require('../images/search.png'), onPress:this.onRightButtonPress  }]}
                />
                <View style={{ flexDirection: 'column', flex:1, padding: 10 }}>
                    <ListView dataSource={this.state.dataSource} ref="listView"
                              renderRow={this.renderRow}
                              renderSeparator={this.renderSeparator}
                              removeClippedSubviews={false}
                              showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={{position:'absolute',
                height: 120, width:120, alignSelf: 'center', justifyContent:'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={ this.onPressMicrophone }>
                        <Image source={require('../images/record.png')}
                               style={{ height: 80, width:80,justifyContent:'center', alignItems: 'center', resizeMod: 'contain'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:Constant.COLOR.background,
        justifyContent:'flex-end',
    }
});