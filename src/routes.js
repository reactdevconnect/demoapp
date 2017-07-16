/**
 * Created by Dev on 5/7/17.
 */
import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';
import HomePage from './homepage/homepageDetail'
import Recorder from './recorder'
import Search from './search/searchComponent'
import Filter from './filter/filterComponent'
import UserList from './userdetail/userList'
import UserInDetail from './userInDetails/userInDetail';
import Player from './video/tmp';

const SHVLApp = StackNavigator({
    // UserList: { screen: UserList },
    HomePage: { screen: HomePage},
    // HomePage: { screen: Player},
    Recorder: { screen: Recorder },
    Search: { screen: Search },
    Filter: { screen: Filter },
    UserList: { screen: UserList },
    UserDetail: { screen: UserInDetail }
}, {mode: 'modal',headerMode: 'none' });

module.exports = SHVLApp;