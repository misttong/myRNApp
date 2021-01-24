import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import NavigationUtill from '../navigator/NavigationUtill';
import actions from '../action/index';
import PopularItem from '../common/PopularItem'
import NavigationBar from '../common/NavigationBar'
import FavoriteDao from '../expand/dao/FavoriteDao';
import FavoriteUtil from '../util/FavoriteUtil';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
const favoriteDao = new FavoriteDao('popular');
const pageSize = 10;

class PopularPage extends Component {
    constructor(props) {
        super(props);
        const {onLoadLanguage} = this.props;
        onLoadLanguage('language_dao_key');
    }
    _genTabs() {
        const tabs = {};
        const {keys} = this.props;
        keys.forEach((item, index) => {
            if(item.checked) {
                tabs[`tab${index}`] = {
                    screen: props => <PopularTabPage {...props} tabLabel={item} />,
                    navigationOptions: {
                        title: item.name,
                    }
                }
            }
        });
        //console.log(tabs);
        return tabs;
    }
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR
        }
        let navigationBar = <NavigationBar
            title={'最热'}
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
                },
                lazy: true
            }
        ));
        return (
            <View style={styles.container}>
                {navigationBar}
                <TabNavigator />
            </View>
        )
    }
}
const mapPopStateToProps = state => {
    console.log(state);
    return {keys: state.language.keys}
}
const mapPopDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
})
export default connect(mapPopStateToProps,mapPopDispatchToProps)(PopularPage);

class PopularTab extends Component {
    constructor(props) {
        console.log('constructor');
        super(props);
        const { tabLabel } = this.props;
        this.storeName = tabLabel;
    }
    componentDidMount() {
        this.loadData();
    }
    loadData(loadMore) {
        const { onLoadPopularData, onLoadMorePopular } = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callBack => {
                console.log('没有更多了');
            });
        } else {
            onLoadPopularData(this.storeName, url, pageSize, favoriteDao);
        }
    }
    /**
     * 获取与当前页面有关的数据
     */
    _store() {
        const { popular } = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [],//要显示的数据
                hideLoadingMore: false, //默认隐藏加载更多
            }
        }
        return store;
    }
    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }
    renderItem(data) {
        const item = data.item;
        return <PopularItem
            projectModel={item}
            onSelect={() => {
                NavigationUtill.goPage({
                    projectModel: item
                }, 'DetailPage')
            }}
            onFavorite={(item1, isFavorite) => {
                FavoriteUtil.onFavorite(favoriteDao, item1, isFavorite, 'popular')
            }}
        />
    }
    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }
    render() {
        let store = this._store();
        return (
            <View style={styles.container1}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.item.id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true;
                    }}
                />
            </View>
        );
    }
}
const mapStateToProps = state => {
    return ({
        popular: state.popular
    })
};

const mapDispathcToProps = dispatch => {
    return ({
        onLoadPopularData: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onLoadPopularDate(storeName, url, pageSize, favoriteDao)),
        onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack)),
    })
};
const PopularTabPage = connect(mapStateToProps, mapDispathcToProps)(PopularTab)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    container1: {
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    tabStyle: {
        minWidth: 50
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});