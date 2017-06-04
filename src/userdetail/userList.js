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

export default class Search extends Component {

    constructor(props){
        super(props);
        this.state={
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            arrList: []
        }
    }

    componentWillMount(){
    }

    componentDidMount(){
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.getData()),
            arrList: this.getData(),
        });
    }

    getData(){
        let searchData = require('./userlist.json');
        let json = JSON.stringify(searchData);
        let obj = JSON.parse(json);
        return obj.SearchData;
    }

    onViewProfile = () => {
        const { navigate } = this.props.navigation;
        navigate('UserDetail');
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