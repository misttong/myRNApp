export default class NavigationUtill {
    /**
     * 跳转到指定页面
     * @param {}} params 
     * @param {*} page 
     */
    static goPage(params, page) {
        const navigation = NavigationUtill.navigation;
        if (navigation) {
            console.log();
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }

    /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation) {
        navigation.goBack();
    }

    /**
     * 重置到首页
     * @param {*} params 
     */
    static resetToHomePage(params) {
        const { navigation } = params;
        navigation.navigate('Main');
    }
}