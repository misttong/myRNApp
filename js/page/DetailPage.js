import React, { Component } from 'react';
import { Text, View, StyleSheet, DeviceInfo } from 'react-native';
import WebView from 'react-native-webview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationUtill from '../navigator/NavigationUtill';

const THEME_COLOR = '#678';
export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const { projectModel } = this.params;
        this.url = projectModel.item.html_url;
        let title = projectModel.item.full_name;
        this.state = {
            title: title,
            url: this.url,
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
    renderRightButton() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {

                    }}
                >
                    <FontAwesome
                        name={'star-o'}
                        size={20}
                        style={{ color: 'white', marginRight: 10 }}
                    />
                </TouchableOpacity>
                {ViewUtil.getShareButton(() => {

                })}
            </View>
        )
    }
    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }
    render() {
        const titleStyle = this.state.title.length > 20 ? {paddingRight : 30} : null;
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            title={this.state.title}
            style={{ backgroundColor: THEME_COLOR }}
            rightButton={this.renderRightButton()}
            titleLayoutStyle={titleStyle}
        />
        const { navigation } = this.props;
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