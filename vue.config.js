module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // 服务器
                // target: 'http://39.96.175.246:8051',
                target: 'http://localhost:8081',
                // 樊华
                // target: 'http://n2900b3853.imdo.co/',
                // 朱胤璘
                // target: 'http://u40025z183.zicp.vip/',
                // 赵玉淋
                // target: 'http://4y0034s928.wicp.vip/',
                ws: false,
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        externals: {
          'BMap': 'BMap'
        }
    },
    // APP打包时使用下述三个配置，移动端的路径设置和pc端是有差别的
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
}