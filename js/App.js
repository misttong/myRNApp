import React, {Component} from 'react';
import { Provider } from 'react-redux';
import AppNavigators from './navigator/AppNavigators';
import store from './store';

/**
 * Provider这个组件能使整个app获取到store中的数据
 */
export default class App extends Component {
    render() {
        /**
         * 3、将store传递给app框架
         */
        return <Provider store={store}>
            <AppNavigators />
        </Provider>;
    }
}