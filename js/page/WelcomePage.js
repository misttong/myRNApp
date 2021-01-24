import React, {Component} from 'react';
import {StyleSheet, View,Text} from 'react-native';
import NavigationUtill from '../navigator/NavigationUtill';

export default class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            //跳转到首页
            NavigationUtill.resetToHomePage(this.props);
        }, 2000);
    }

    componentWillUnmount() {
        //页面销毁时，清空计时器
        this.timer && clearImmediate(this.timer);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Weclome
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

