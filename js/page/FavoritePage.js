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

const THEME_COLOR = '#678';

export default class FavoritePage extends Component {
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR
        }
        let navigationBar = <NavigationBar
            title={'收藏'}
            statusBar={statusBar}
            style={{ backgroundColor: THEME_COLOR }}
        />
        let favoritePage = <FavoriteTabPage/>
        return (
            <View style={styles.container}>
                {navigationBar}
                {favoritePage}
            </View>
        )
    }
}

class FavoriteTab extends Component {
    constructor(props) {
        super(props);
        this.storeName = 'popular';
    }
    _store() {
        const {favorite} = this.props;
        let store = favorite[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: []//要显示的数据
            }
        }
        return store;
    }
    renderItem(data) {
        let item = data.item;
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
    loadData(){
        const {onLoadFavoriteData} = this.props;
        onLoadFavoriteData(this.storeName);
    }
    render() {
        let store = this._store();
        return (
            <View style={styles.container1}>
                <FlatList
                    data={store.projectModels}
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
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return ({
        favorite: state.favorite
    })
};
const mapDispathcToProps = dispatch => {
    return ({
        onLoadFavoriteData: (storeName) => dispatch(actions.onLoadFavoriteData(storeName, ''))
    })
};
const FavoriteTabPage = connect(mapStateToProps, mapDispathcToProps)(FavoriteTab);
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