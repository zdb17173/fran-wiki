const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        "tree": "./src/tree.js",
        "bootstrap": "./src/bootstrap.js",
        "editor": "./src/editor.js"
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, '../static')
    },
    module: {
        rules: [
            { test: /\.css$/, use:['style-loader', 'css-loader']},
            { test:/\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(less)|(ttf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit:50000,   //小于50K的 都打包
                            name:"[hash:8].[name].[ext]",
                            // publicPath:"img/",	//替换CSS引用的图片路径 可以替换成爱拍云上的路径
                            // outputPath:"../img/"		//生成之后存放的路径
                        }
                    }
                ]},
            { test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader', // inject CSS to page
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    },
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]}
        ]
    },
    devtool: 'inline-source-map',//开发定位何处报错
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        //防止依赖jquery报错，加入$ 及jQuery到全局变量中
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery'
        }),
    ],
    //当多个模块引用相同js时会报错，通过配置可以自动抽取相同部分
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
};