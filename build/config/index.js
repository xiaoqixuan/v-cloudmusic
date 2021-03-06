// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

let rootDir = __dirname.replace(/(.*)\/build\/config$/, '$1');
let projectDir = process.cwd().replace(rootDir, '');
let projectPackage = require(process.cwd() + '/package.json');
let layerArr = [];
layerArr.length = projectDir.split('/').length + 1;

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(process.cwd(), 'dist/index.html'),
        assetsRoot: path.resolve(process.cwd(), 'dist/'),
        assetsSubDirectory: './',
        assetsPublicPath: projectPackage.cdnUrl || './', // 配置资源路径
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: projectPackage.devPort || 8081,
        // automatically open browser, if not set will be false
        autoOpenBrowser: true, 
        assetsSubDirectory: './',
        assetsPublicPath: '',
        proxyTable: {
            '/api': {
                target: 'http://music.163.com',
                changeOrigin: true,
                headers: {
                    Referer: 'http://music.163.com/',
                    Cookie: 'appver=2.0.2',
                }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: true
    },
    rootDir: rootDir,
    projectDir: projectDir,
    projectLayer: layerArr.join('../'),
    package: projectPackage
}