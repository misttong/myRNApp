import React, { Component } from 'react';
import { Text, View, StyleSheet, DeviceInfo } from 'react-native';
import WebView from 'react-native-webview';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import NavigationUtill from '../navigator/NavigationUtill';

const THEME_COLOR = '#678';
export default class WebViewPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const { title, url } = this.params;
        this.state = {
            title: title,
            url: url,
            canGoBack: false
        }
    }
    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtill.goBack(this.props.navigation);
        }
    }
    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }
    render() {
        let navigationBar = <NavigationBar
            title={this.state.title}
            style={{ backgroundColor: THEME_COLOR }}
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        />
        return (
            <View style={styles.container}>
                {navigationBar}
                <WebView
                    ref={webView => this.webView = webView}
                    strartInLoadingState={true}
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{ uri: this.state.url }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});