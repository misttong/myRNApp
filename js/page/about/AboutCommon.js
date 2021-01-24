import React, { Component } from 'react';
import BackPressComponent from '../../common/BackPressComponent';
import NavigationUtill from '../../navigator/NavigationUtill';
import config from '../../res/data/config.json';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from '../../res/GlobalStyles';
import { Text, View, StyleSheet, Image, DeviceInfo, Dimensions, Platform } from 'react-native';
import ViewUtil from '../../util/ViewUtil';

const THEME_COLOR = '#678';
export const FlAG_ABOUT = { flag_about: 'about', flag_about_me: 'about_me' };
export default class AboutCommon {
    constructor(props, updateState) {
        this.props = props;
        this.updateState = updateState;
        this.backPress = new BackPressComponent({ backPress: () => this.onBackPress() });
        // this.updateState({
        //     config
        // })
    }

    onBackPress() {
        NavigationUtill.goBack(this.props.navigation);
        return true;
    }
    componentDidMount() {
        this.backPress.componentDidMount();
        //https://www.devio.org/io/GitHubPopular/json/github_app_config.json
        let url = 'https://www.devio.org/io/GitHubPopular/json/github_app_config.json';
        fetch(url).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network Error!');
        })
            .then(config => {
                if (config) {
                    this.updateState({
                        data: config
                    })
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }
    onShare() {

    }
    getParallaxRenderConfig(params) {
        let config = {};
        //let avatar = typeof (params.avatar) === 'string' ? { uri: params.avatar } : params.avatar;
        config.renderBackground = () => {
            return <View key="background">
                <Image source={{
                    uri: 'https://i.ytimg.com/vi/P-NZei5ANaQ/maxresdefault.jpg',
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }}
                />
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}
                />
            </View>
        };
        config.renderForeground = () => {
            return <View key="parallax-header" style={styles.parallaxHeader}>
                <Image style={styles.avatar} source={{
                    uri: 'https://i.ytimg.com/vi/P-NZei5ANaQ/maxresdefault.jpg',
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }} />
                <Text style={styles.sectionSpeakerText}>
                    迷糊liu
                </Text>
            </View>
        };
        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>迷糊liu</Text>
            </View>
        );
        config.renderFixedHeader = () => {
            return <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtil.getLeftBackButton(() => NavigationUtill.goBack(this.props.navigation))}
                {ViewUtil.getShareButton(() => this.onShare())}
            </View>
        };
        return config;
    }
    render(contentView, params) {
        const renderConfig = this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView
                backgroundColor={THEME_COLOR}
                contentBackgroundColor={GlobalStyles.backgroundColor}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                backgroundScrollSpeed={10}
                {...renderConfig}
            >
                {contentView}
            </ParallaxScrollView>
        )
    }
}
const window = Dimensions.get('window');
const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 270;
const TOP = (Platform.OS === 'ios') ? 0 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 0;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + TOP : GlobalStyles.nav_bar_height_android;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: 300,
        justifyContent: 'flex-end'
    },
    stickySectionText: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
        marginLeft: 45,
    },
    fixedSection: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingRight: 8,
        //paddingTop: (Platform.os === 'ios') ? 20 : 0,
        paddingTop:DeviceInfo.isIPhoneX_deprecated ? 30 : 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 5
    }
});