import React, {Component} from 'react';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import NavigationUtill from '../navigator/NavigationUtill';


export default class HomePage extends Component {
    
    render() {
        //FIX DynamicTabNavigator中的页面无法跳转到外层导航器页面的问题
        NavigationUtill.navigation = this.props.navigation;
        return <DynamicTabNavigator />;
    }
}