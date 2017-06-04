/**
 * Created by Dev on 5/4/17.
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
    StatusBar,
    TextInput,
    Slider,
    ScrollView,
    Picker,
    Animated,
    Dimensions,
    Button
} from 'react-native';

import NavigationBar from '../customNavigator';
import Constant from '../helper/constant';
import { NavigationActions } from 'react-navigation';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomSlider from './customMarker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var views = null;

export default class Filter extends Component {

    constructor(props){
        super(props);
        const arr = ["abc","dsf","Sdf","sdfsd"];
        this.state={
            selectedVal: 'dsf',
            items: arr,
            views: [],
            opened: false,
        }

    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    //Selection pickerview
    changeShort = () =>{

    };

    //Navigation bar
    onRightButtonPress = () =>{
        const { navigate } = this.props.navigation;
        navigate('UserList');
    };

    onLeftButtonPress = () =>{
        const backAction = NavigationActions.back({
        });
        this.props.navigation.dispatch(backAction)
    };

    //Picker view

    onPressSelectItem = () =>{
        if (this.state.opened){
            this.setState({opened: false});
            this.setState((state) => ({views: state.views.slice(0, -1)}));
        }else{
            this.setState((state) => ({views: [...state.views, {}]}));
            this.setState({opened: true});
        }
    };

    onPressRemoveView = () => {
        this.setState({opened: false});
        this.setState((state) => ({views: state.views.slice(0, -1)}));
    };

    onValueSelect = (src) => {
        this.setState({
            selectedVal: src
        })
    };

    focusNextField = (strRef) =>{
        this.refs[strRef].focus();
    };

    render() {
        if(Constant.PLATFORM.iOS){
            views = this.state.views.map((view, i) =>
                <View key={i} style={styles.outer}>
                    <View style={styles.inner}>
                        <View style={styles.btnDone}></View>
                        <View style={styles.buttonPicker}>
                            <Button  title="Done" onPress={this.onPressRemoveView} color='black' backgroundColor='black'/>
                        </View>
                        <View style={styles.btnDone}></View>
                    </View>
                    <View>
                        <Picker style={styles.picker}
                                selectedValue={ this.state.selectedVal } onValueChange={this.onValueSelect}>
                            {
                                this.state.items.map(function (src, index) {
                                    return <Picker.Item label={src} value={src}/>
                                })
                            }
                        </Picker>
                    </View>
                </View>)
        }

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Constant.COLOR.appColor}
                />
                <NavigationBar
                    title="filter"
                    leftItems={[{ icon: require('../images/back.png'), onPress:this.onLeftButtonPress  }]}
                    rightItems={[{ icon: require('../images/search.png'), onPress:this.onRightButtonPress  }]}
                />
                <KeyboardAwareScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.formContainer}>
                        {(Constant.PLATFORM.iOS) ?
                            <View style={[styles.textContainer,{ borderBottomWidth:0 }]}>
                                <Text style={styles.textLabel}>SORTING</Text>
                                <TouchableHighlight onPress={ this.onPressSelectItem } underlayColor={"transparent"}>
                                    <View style={ styles.outeriOSPicker }>
                                        <Text style={styles.iOSPickerText}>
                                            {this.state.selectedVal}
                                        </Text>
                                        <Image source={require('../images/drop_dowm_arrow.png')}
                                               style={{flex:0.1, resizeMode:'contain'}}/>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            :
                            <View style={[styles.textContainer,{ borderBottomWidth:0 }]}>
                                <Text style={styles.textLabel}>SORTING</Text>
                                <View style={styles.androidPicker}>
                                    <Picker mode={Picker.MODE_DROPDOWN}
                                            selectedValue={ this.state.selectedVal }
                                            onValueChange={this.onValueSelect}>
                                        {
                                            this.state.items.map(function (src, index) {
                                                return <Picker.Item label={src} value={src}/>
                                            })
                                        }
                                    </Picker>
                                </View></View>
                        }

                        <View style={styles.textContainer}>
                            <Text style={styles.textLabel}>POSITION</Text>
                            <TextInput style={styles.textField}
                                       placeholder="Enter keyword"
                                       underlineColorAndroid={"transparent"}
                                       placeholderTextColor={Constant.COLOR.placeHolderColor}
                                       ref="txtPosition"
                                       returnKeyType={'next'}
                                       blurOnSubmit={false}
                                       onSubmitEditing={() => this.focusNextField('txtState')}
                                       autoCorrect={false}
                            />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textLabel}>STATE</Text>
                            <TextInput style={styles.textField}
                                       placeholder="Enter keyword"
                                       underlineColorAndroid={"transparent"}
                                       placeholderTextColor={Constant.COLOR.placeHolderColor}
                                       ref="txtState"
                                       returnKeyType={'next'}
                                       blurOnSubmit={false}
                                       onSubmitEditing={() => this.focusNextField('txtHighSchool')}
                                       autoCorrect={false}
                            />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textLabel}>HIGH SCHOOL</Text>
                            <TextInput style={styles.textField}
                                       placeholder="Enter keyword"
                                       underlineColorAndroid={"transparent"}
                                       placeholderTextColor={Constant.COLOR.placeHolderColor}
                                       ref="txtHighSchool"
                                       returnKeyType={'next'}
                                       blurOnSubmit={false}
                                       onSubmitEditing={() => this.focusNextField('txtYear')}
                                       autoCorrect={false}
                            />
                        </View>

                        <View style={styles.twoTextFieldView}>
                            <View style={[styles.textContainer,{ width: Constant.SCREEN.width/2-35 }]}>
                                <Text style={styles.textLabel}>YEAR</Text>
                                <TextInput style={styles.textField}
                                           placeholder="Enter keyword"
                                           underlineColorAndroid={"transparent"}
                                           placeholderTextColor={Constant.COLOR.placeHolderColor}
                                           ref="txtYear"
                                           returnKeyType={'next'}
                                           blurOnSubmit={false}
                                           onSubmitEditing={() => this.focusNextField('txtClass')}
                                           autoCorrect={false}
                                />
                            </View>

                            <View style={[styles.textContainer,{ width: Constant.SCREEN.width/2-35 }]}>
                                <Text style={styles.textLabel}>CLASS</Text>
                                <TextInput style={styles.textField}
                                           placeholder="Enter keyword"
                                           underlineColorAndroid={"transparent"}
                                           placeholderTextColor={Constant.COLOR.placeHolderColor}
                                           ref="txtClass"
                                           returnKeyType={'next'}
                                           blurOnSubmit={false}
                                           autoCorrect={false}
                                />
                            </View>
                        </View>

                        <View style={[styles.textContainer,{ borderBottomWidth:0}]}>
                            <Text style={styles.textLabel}>HEIGHT RANGE</Text>
                            <View style={ styles.sliderField}>
                                <Text style={styles.rangeLabel }>{"5 9\""}</Text>
                                <View style={ styles.sliderView}>
                                    <MultiSlider values={[3,7]}
                                                 sliderLength={Constant.SCREEN.width-130}
                                                 selectedStyle={{backgroundColor: Constant.COLOR.appColor}}
                                                 unselectedStyle={{backgroundColor: Constant.COLOR.appGray}}
                                                 containerStyle={{ marginTop:30, height:30}}
                                                 trackStyle={{height:3}}
                                                 customMarker={CustomSlider}
                                    />
                                </View>
                                <Text style={styles.rangeLabel }>{"6 6\""}</Text>
                            </View>
                        </View>

                        <View style={[styles.textContainer,{ borderBottomWidth:0}]}>
                            <Text style={styles.textLabel}>WEIGHT RANGE</Text>
                            <View style={ styles.sliderField}>
                                <Text style={styles.rangeLabel }>172</Text>
                                <View style={ styles.sliderView}>
                                    <MultiSlider values={[3,7]}
                                                 sliderLength={Constant.SCREEN.width-130}
                                                 selectedStyle={{backgroundColor: Constant.COLOR.appColor}}
                                                 unselectedStyle={{backgroundColor: Constant.COLOR.appGray}}
                                                 containerStyle={{ marginTop:30, height:30}}
                                                 trackStyle={{ height:3 }}
                                                 customMarker={CustomSlider}
                                                 onValuesChange={(val) => {
                                                     console.log('change----------------');
                                                     console.log(val);
                                                 }}
                                    />
                                </View>
                                <Text style={styles.rangeLabel }>220</Text>
                            </View>
                        </View>

                        <View style={styles.twoTextFieldView}>
                            <View style={[styles.textContainer,{ width: Constant.SCREEN.width/2-35 }]}>
                                <Text style={styles.textLabel}>40-YARD DASH</Text>
                                <TextInput style={styles.textField}
                                           placeholder="Enter keyword"
                                           underlineColorAndroid={"transparent"}
                                           placeholderTextColor={Constant.COLOR.placeHolderColor}
                                           ref="txtYard"
                                           returnKeyType={'next'}
                                           blurOnSubmit={false}
                                           onSubmitEditing={() => this.focusNextField('txtPower')}
                                           autoCorrect={false}
                                />
                            </View>

                            <View style={[styles.textContainer,{ width: Constant.SCREEN.width/2-35 }]}>
                                <Text style={styles.textLabel}>POWER TOSS</Text>
                                <TextInput style={styles.textField}
                                           placeholder="Enter keyword"
                                           underlineColorAndroid={"transparent"}
                                           placeholderTextColor={Constant.COLOR.placeHolderColor}
                                           ref="txtPower"
                                           returnKeyType={'next'}
                                           blurOnSubmit={false}
                                           onSubmitEditing={() => this.focusNextField('txtShuttle')}
                                           autoCorrect={false}
                                />
                            </View>
                        </View>

                        <View style={styles.twoTextFieldView}>
                            <View style={[styles.textContainer,{ width: Constant.SCREEN.width/2-35 }]}>
                                <Text style={styles.textLabel}>SHUTTLE</Text>
                                <TextInput style={styles.textField}
                                           placeholder="Enter keyword"
                                           underlineColorAndroid={"transparent"}
                                           placeholderTextColor={Constant.COLOR.placeHolderColor}
                                           ref="txtShuttle"
                                           returnKeyType={'next'}
                                           blurOnSubmit={false}
                                           onSubmitEditing={() => this.focusNextField('txtJump')}
                                           autoCorrect={false}
                                />
                            </View>

                            <View style={[styles.textContainer,{ width: Constant.SCREEN.width/2-35 }]}>
                                <Text style={styles.textLabel}>JUMP</Text>
                                <TextInput style={styles.textField}
                                           placeholder="Enter keyword"
                                           underlineColorAndroid={"transparent"}
                                           placeholderTextColor={Constant.COLOR.placeHolderColor}
                                           ref="txtJump"
                                           returnKeyType={'done'}
                                           autoCorrect={false}
                                />
                            </View>
                        </View>
                    </View>

                </KeyboardAwareScrollView>

                {(Constant.PLATFORM.iOS)?
                    <View style={styles.viewContainer}>
                        {views}
                    </View>
                    :
                    null
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
    },
    formContainer:{
        padding: 15,
        margin: 10,
        flex:1,
        flexDirection: 'column',
        backgroundColor:"#FFF",
        borderRadius:3
    },
    textLabel:{
        color: Constant.COLOR.titleFont,
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf:'flex-start',
    },
    outeriOSPicker:{
        marginTop:5,
        borderWidth:1,
        borderColor:Constant.COLOR.appGray,
        height:40, flex:1,
        flexDirection:'row',
        borderRadius:3,
        alignItems:'center',
        paddingLeft: 5
    },
    iOSPickerText:{
        flex:0.9,
        color: Constant.COLOR.appBlack,
        fontSize: 15,
        fontWeight:"400",
    },
    androidPicker:{
        marginTop:5,
        borderWidth:1.5,
        borderColor:Constant.COLOR.appGray,
        borderRadius:3,
        height:40,
        justifyContent:'center'
    },
    btnDone:{
        height: 0.8,
        backgroundColor:Constant.COLOR.appGray
    },
    textField:{
        color: Constant.COLOR.appBlack,
        fontSize: 15,
        fontWeight:"400",
        height:35,
        backgroundColor:"#FFF",
        paddingBottom: 3,
        marginBottom:0,
        paddingLeft:0,
    },
    textContainer:{
        borderBottomColor: Constant.COLOR.appGray,
        borderBottomWidth: 1.8,
        marginBottom:20,
        paddingBottom: 0
    },
    twoTextFieldView:{
        flex:1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    sliderField:{
        flex:1,
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center'
    },
    rangeLabel:{
        fontSize:16,
        color: Constant.COLOR.appBlack
    },
    sliderView:{
        width: Constant.SCREEN.width-150,
        justifyContent:'center',
        alignItems:'center',
        alignSelf :'center'
    },
    outer:{
        flex:1,
        flexDirection:'column',
        marginBottom:10,
        justifyContent: 'flex-end'

    },
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        marginTop: Constant.SCREEN.height-230,
        backgroundColor: 'white',
    },

    inner:{
        flexDirection:'column'
    },
    buttonPicker:{
        width:Constant.SCREEN.width,
    },
    picker:{
        marginBottom:0,
    },

});