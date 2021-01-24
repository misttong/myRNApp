import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import WebViewPage from '../page/WebViewPage';
import AboutPage from '../page/about/AboutPage';
import CustomKeyPage from '../page/CustomKeyPage';

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        }
    }
});
const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,
        }
    },
    DetailPage:{
        screen: DetailPage,
        navigationOptions: {
            header: null,
        }
    },
    WebViewPage:{
        screen: WebViewPage,
        navigationOptions: {
            header: null,
        }
    },
    AboutPage:{
        screen: AboutPage,
        navigationOptions: {
            header: null,
        }
    },
    CustomKeyPage:{
        screen: CustomKeyPage,
        navigationOptions: {
            header: null,
        }
    }
});
export default createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        header: null,
    },
}));