import React, {Component} from 'react';
import MyPage from "../page/MyPage";
import FavoritePage from "../page/FavoritePage";
import PopularPage from "../page/PopularPage";
import TrendingPage from "../page/TrendingPage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import { connect } from 'react-redux';

const TABS = { //在这里配置页面的路由
    PopularPage:{
        screen:PopularPage,
        navigationOptions:{
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor,focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    TrendingPage:{
        screen:TrendingPage,
        navigationOptions:{
            tabBarLabel:"趋势",
            tabBarIcon:({tintColor,focused}) => (
                <MaterialIcons
                    name={'show-chart'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    FavoritePage:{
        screen:FavoritePage,
        navigationOptions:{
            tabBarLabel:"收藏",
            tabBarIcon:({tintColor,focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    MyPage:{
        screen:MyPage,
        navigationOptions:{
            tabBarLabel:"我的",
            tabBarIcon:({tintColor,focused}) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
};
class DynamicTabNavigator extends React.Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true; //关闭黄色警告
    }

    _tabNavigator() {
        if (this.TABS){
            return this.TABS;
        }
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
        PopularPage.navigationOptions.tabBarLabel = '最热'; //动态修改TAB属性
        return this.TABS = createAppContainer(createBottomTabNavigator(
            tabs,{
                tabBarComponent:props=>{
                    console.log('1');
                    console.log(this.props.theme);
                    return <TabBarComponent theme={this.props.theme}{...props}/>;
                }
            }
        ));
    }

    render() {
        const Tab = this._tabNavigator();
        return <Tab/>;
    }
}

class TabBarComponent extends React.Component{
    render(){
        return <BottomTabBar
            {...this.props}
            activeTintColor = {this.props.theme}
        />
    }
}

const mapStateToProps = state => ({
    theme:state.theme.theme
});
export default connect(mapStateToProps)(DynamicTabNavigator);