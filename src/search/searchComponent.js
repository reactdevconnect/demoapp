0/**
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
    TextInput
} from 'react-native';

import NavigationBar from '../customNavigator'
import Constant from '../helper/constant'
import RowComponent from './searchRowComponent'
import StatusBar from '../statusBar';
import { NavigationActions } from 'react-navigation';

export default class Search extends Component {

    constructor(props){
        super(props);
        this.state={
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            arrList: []
        }
    }

    componentWillMount(){
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.getData()),
            arrList: this.getData(),
        })
    }

    componentDidMount(){

    }

    getData(){
        let searchData = require('./search.json');
        let json = JSON.stringify(searchData);
        let obj = JSON.parse(json);
        return obj.SearchData;
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
            <RowComponent isSelected={rowData.isSelected}
                             rowId={rowId-1}
                             rowData={rowData}
                             onSectionClick={this.onSectionClick}
            />

        )
    };

    renderSeparator = () =>{
        return(
            <View style={{ height: 10, backgroundColor: Constant.COLOR.background}}></View>
        )
    };


    //Navigation bar
    onRightButtonPress = () =>{
        const { navigate } = this.props.navigation;
        navigate('Filter');
    };

    onLeftButtonPress = () =>{
        const backAction = NavigationActions.back({
        });
        this.props.navigation.dispatch(backAction)
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar/>
                <NavigationBar
                    title="shvl"
                    leftItems={[{ icon: require('../images/cancel.png'), onPress:this.onLeftButtonPress  }]}
                    rightItems={[{ icon: require('../images/small_mic@1x.png'), onPress:this.onRightButtonPress  }]}
                />
                <View style={{backgroundColor: "#FFF", height: 60}}>
                    <TextInput
                        style={{height: 60, paddingLeft:15, fontSize:15, color: Constant.COLOR.appBlack}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        placeholder={"Search here"}
                        underlineColorAndroid="transparent"
                        enablesReturnKeyAutomatically={true}
                        placeholderTextColor={Constant.COLOR.placeHolderColor}
                    />
                </View>

                <View style={{ flexDirection: 'column', flex:1, padding: 10 }}>
                    <ListView dataSource={this.state.dataSource} ref="listView"
                              renderRow={this.renderRow}
                              renderSeparator={this.renderSeparator}
                              removeClippedSubviews={false}
                              showsVerticalScrollIndicator={false}
                    />
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
    }
});