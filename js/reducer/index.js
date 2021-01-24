import {combineReducers} from 'redux';
import theme from './theme'
import popular from './popular'
import language from './language'
import favorite from './favorite'

/**
 * 1、合并reducer
 */
const index = combineReducers({
    theme: theme,
    popular: popular,
    language: language,
    favorite: favorite
});
export default index;