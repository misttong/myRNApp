import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import actions from '../action';
import NavigationBar from '../common/NavigationBar';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import LtDialog from '../common/LtDialog';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

const THEME_COLOR = '#678';
class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.tabNames = ['课程', '训练营', '名师讲堂'];
    }
    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item,index) => {
            tabs[`tab${index}`]={
                screen: props => <TabPage {...props}/>,
                navigationOptions: {
                    title: item,
                }
            }
        })
        return tabs;
    }
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR
        }
        let navigationBar = <NavigationBar
            title={'趋势'}
            statusBar={statusBar}
            style={{ backgroundColor: THEME_COLOR }}
        />
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),
            {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: THEME_COLOR
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle
                }
            }
        ))
        return (
            // <View style={styles.container}>
            //     <TabNavigator/>
            // </View>
            <SafeAreaViewPlus
                topColor={THEME_COLOR}
            >
                <TabNavigator/>
            </SafeAreaViewPlus>
        )
    }
}
class TabPage extends Component {
    onSelectTab() {
        this.dialog.dismiss();
    }
    renderTrendingDialog() {
        return <LtDialog
            ref={dialog => this.dialog=dialog}
            onSelect={tab=>this.onSelectTab(tab)}
        />
    }
    render() {
        return (
            <View>
                {this.renderTrendingDialog()}
                <View style={styles.content}>
                    <Text style={styles.welcome}>
                        TrendingPage
                    </Text>
                    <Button
                        title={'修改主题'}
                        onPress={() => {
                            // this.props.onThemeChange('blue');
                            this.dialog.show();
                        }}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    tabStyle: {
        minWidth: 25
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
export default connect(null, mapDispatchToProps)(TrendingPage);