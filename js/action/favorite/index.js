import FavoriteDao from '../../expand/dao/FavoriteDao';
import ProjectModel from '../../model/ProjectModel';
import Types from '../types';

export function onLoadFavoriteData(flag, isShowLoading) {
    return dispatch => {
        dispatch({ type: Types.FAVORITE_LOAD_DATA, storeName: flag });
        new FavoriteDao(flag).getAllItems()
            .then(items => {
                let resuletData = [];
                for (let i = 0, len = items.length; i < len; i++) {
                    resuletData.push(new ProjectModel(items[i], true));
                }
                dispatch({ type: Types.FAVORITE_LOAD_SUCCESS, projectModels: resuletData, storeName: flag });
            })
            .catch(e => {
                console.log(e);
                dispatch({type: Types.FAVORITE_LOAD_FAIL, error: e, storeName: flag});
            })
    }
}