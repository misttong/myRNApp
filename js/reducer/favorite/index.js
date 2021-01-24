import Types from '../../action/types';

const defaultState = {}
/**
 * favorite:{
 *      popular:{
 *          projectModels:[],
 *          isLoading: false
 *      },
 *      trending:{
 *          projectModels:[],
 *          isLoading: false
 *      },
 * }
 * 0.state树，横向扩展
 * 1.如何动态的设置store，和动态获取store（难点：storekey不固定）
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.FAVORITE_LOAD_DATA: //获取数据
            try {
                let prop = {
                    ...state,
                    [action.storeName]: {
                        ...state[action.storeName],
                        isLoading: true
                    }
                }
                return prop;
            } catch (error) {
                console.log(error);
            }
            
        case Types.FAVORITE_LOAD_SUCCESS://下拉获取数据成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                    projectModels: action.projectModels,
                }
            }
        case Types.FAVORITE_LOAD_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: false,
                }
            }
        default:
            return state;
    }
}