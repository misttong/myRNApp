import Types from '../types';
import DataStore from '../../expand/dao/DataStore';
import LanguageDao from '../../expand/dao/LanguageDao';

/**
 * 加载标签
 * @param {*} flagKey 
 */
export function onLoadLanguage(flagKey) {
    return async dispatch => {
        try {
            let languages = await new LanguageDao(flagKey).fetch();
            dispatch({
                type: Types.LANGUAGE_LOAD_SUCCESS,
                languages: languages,
                flag: flagKey
            })
        } catch (error) {
            console.log(error);
        }
    }
}

