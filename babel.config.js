module.exports = {
    //项目发布阶段需要用到的babel插件

    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ],
        //配置路由懒加载插件
        "@babel/plugin-syntax-dynamic-import"
    ],


}