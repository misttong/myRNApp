import Types from '../types';
import DataStore from '../../expand/dao/DataStore';
import favoriteDao from '../../expand/dao/FavoriteDao';
import ProjectModel from '../../model/ProjectModel';
import Utils from '../../util/Utils';

export function onLoadPopularDate(storeName, url, pageSize, favoriteDao) {
    return dispatch => {
        dispatch({ type: Types.POPULAR_REFRESH, storeName: storeName });
        let dataStore = new DataStore();
        dataStore.fetchNetData(url)//异步action与数据流
            .then(data => {
                handleData(dispatch, storeName, data, pageSize, favoriteDao);
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.POPULAR_REFRESH_FAIL,
                    storeName: storeName,
                    error: error,
                })
            })
    }
}

/**
 * 加载更多
 * @param {*} storeName 
 * @param {*} pageIndex 第几页
 * @param {*} pageSize 每页展示条数
 * @param {*} dataArray 原始数据
 * @param {*} callBack 回调函数，可通过回调函数向调用页面通信，比如异常信息的展示
 */
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) {
    console.log('da', pageIndex);
    return dispatch => {
        setTimeout(() => { //模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) { //已加载全部数据
                if (typeof callBack === 'function') {
                    callBack('no more');
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            } else {
                //本次和载入的最大数量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max),
                })
            }
        }, 500);
    }
}

function handleData(dispatch, storeName, data, pageSize, favoriteDao) {
    let fixItems = [];
    if (data) {
        fixItems = data.items;
    }
    //第一次要加载的数据
    let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize);
    _projectModels(showItems, favoriteDao, projectModels => {
        dispatch({
            type: Types.POPULAR_REFRESH_SUCCESS,
            //items: data && data.items,
            items: fixItems,
            projectModes: projectModels,
            storeName,
            pageIndex: 1,
        })
    }); 
}

/**
 * 通过收藏状态包装item
 * @param {*} showItems 
 * @param {*} favoriteDao 
 * @param {*} callback 
 */
export async function _projectModels(showItems, favoriteDao, callback) {
    let keys = [];
    try {
        keys = await favoriteDao.getFavoriteKeys();
    } catch (error) {
        
    }
    let projectModels = [];
    for (let i = 0, len = showItems.length; i < len; i++) {
        projectModels.push(new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)));
    }
    if(typeof callback === 'function') {
        callback(projectModels);
    }
    console.log(projectModels);
}