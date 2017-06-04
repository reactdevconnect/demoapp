
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableHighlight,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Constant from './helper/constant'
import { NavigationActions } from 'react-navigation'

export default class Recorder extends Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){
    }

    componentDidMount(){
    }

    onCancel = () =>{
        const backAction = NavigationActions.back({
        });
        this.props.navigation.dispatch(backAction)
    };

    onWebClick = () =>{
        const { navigate } = this.props.navigation;
        navigate('Search');
    };

    render() {
        return (
            <View style={styles.container}>
                {
                    Constant.PLATFORM.iOS &&
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={Constant.COLOR.background}
                    />
                    || null
                }
                <View style={{flex:1, height: Constant.SCREEN.height-100,width: Constant.SCREEN.width,backgroundColor:"transparent"}}>
                    <Text style={{ marginBottom:10, fontSize:17, fontWeight:'bold', color: Constant.COLOR.titleFont, marginLeft:25  }}>
                        I'm listening...
                    </Text>
                </View>
                <View style={{ height: 100, width: Constant.SCREEN.width, backgroundColor:"transparent",
                 alignItems: 'center', justifyContent:'space-between',
                 flexDirection:'row', paddingLeft:25, paddingRight:25}}>
                    <TouchableHighlight underlayColor="transparent" onPress={ this.onCancel }>
                        <Image source={require('./images/close.png')}
                               style={{ height: 50,
                                    width: 50,
                                   resizeMode: 'contain',
                           }}/>
                    </TouchableHighlight>

                    <Image source={require('./images/loading2.gif')}
                           style={{ height: 50,
                                    width: Constant.SCREEN.width-200}}/>
                    <TouchableHighlight underlayColor="transparent"
                                        onPress={ this.onWebClick}>
                        <Image source={require('./images/globe.png')}
                               style={{ height: 50,
                                    width: 50,
                                   resizeMode: 'contain',
                           }}/>
                    </TouchableHighlight>
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
        paddingTop: 65
    },
});