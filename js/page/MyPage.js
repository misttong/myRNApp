import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, DeviceInfo, ScrollView } from 'react-native';
import NavigationBar from '../common/NavigationBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MORE_MENU } from '../common/MORE_MENU';
import GlobalStyles from '../res/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ViewUtil from '../util/ViewUtil';
import NavigationUtill from '../navigator/NavigationUtill';
import { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';

const THEME_COLOR = '#678';
export default class MyPage extends Component {
    getItem(menu) {
        return ViewUtil.getMenuItem(
            () => this.onClick(menu), menu, THEME_COLOR);
    }
    onClick(menu) {
        let RouterName, params = {};
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouterName = 'WebViewPage';
                params.title = '教程';
                params.url = 'https://github.com/TheAlgorithms/Java';
                break;
            case MORE_MENU.About:
                RouterName = 'AboutPage';
                break;
            case MORE_MENU.Custom_Key:
            case MORE_MENU.Custom_Language:
            case MORE_MENU.Remove_Key:
                RouterName = 'CustomKeyPage';
                params.isRemoveKey = menu === MORE_MENU.Remove_Key;
                params.flag = menu !== MORE_MENU.Custom_Language ? FLAG_LANGUAGE.flag_key : FLAG_LANGUAGE.flag_language;
                break;
        
            default:
                break;
        }
        if(RouterName) {
            NavigationUtill.goPage(params, RouterName);
        }
    }
    render() {
        console.log(MORE_MENU);
        let navigationBar = <NavigationBar
            title={'我的'}
            style={{ backgroundColor: THEME_COLOR }}
        />
        return (
            <View style={GlobalStyles.root_container}>
                {navigationBar}
                <ScrollView>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => this.onClick(MORE_MENU.About)}
                    >
                        <View style={styles.about_left}>
                            <Ionicons
                                name={MORE_MENU.About.icon}
                                size={40}
                                style={{
                                    marginRight: 10,
                                    color: THEME_COLOR,
                                }}
                            />
                            <Text>迷糊liu</Text>
                        </View>
                        <Ionicons
                            name={'chevron-forward-outline'}
                            size={16}
                            style={{
                                marginRight: 10,
                                alignSelf: 'center',
                                color: THEME_COLOR,
                            }} />
                    </TouchableOpacity>
                    <View style={GlobalStyles.line} />
                    {this.getItem(MORE_MENU.Tutorial)}
                    {/* 趋势管理 */}
                    <Text style={styles.groupTitle}>趋势管理</Text>
                    {/*自定义语言*/}
                    {this.getItem(MORE_MENU.Custom_Language)}
                    {/*语言排序*/}
                    <View style={GlobalStyles.line} />
                    {this.getItem(MORE_MENU.Sort_Language)}

                    {/*最热管理*/}
                    <Text style={styles.groupTitle}>最热管理</Text>
                    {/*自定义标签*/}
                    {this.getItem(MORE_MENU.Custom_Key)}
                    {/*标签排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Key)}
                    {/*标签移除*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Remove_Key)}

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    {this.getItem(MORE_MENU.Custom_Theme)}
                    {/*关于作者*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.About_Author)}
                    <View style={GlobalStyles.line}/>
                    {/*反馈*/}
                    {this.getItem(MORE_MENU.Feedback)}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.CodePush)}
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
    },
    about_left: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    block: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#F5FCFF'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 30,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray',
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }
});