const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require('happypack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// const webpackEnv = process.env.NODE_ENV == "production" ? "production" : "development";

module.exports = {
    entry: ["./src/index.js"],
    output: {
        // 输出目录
        path: path.resolve(__dirname, "../dist"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".json", ".js", ".jsx"],
        alias: {
            "@": path.resolve(__dirname, "../src"),
            pages: path.resolve(__dirname, "../src/pages"),
            router: path.resolve(__dirname, "../src/router")
        }
    },
    module: {
        rules: [
            {
                // cnpm i babel-loader @babel/core @babel/preset-env -D
                test: /\.(jsx?|tsx?)$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    {
                        loader: "happypack/loader?id=happyBabel"
                    }
                ]
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    {
                        loader: "css-loader", // 编译css
                        options: {
                            localIdentName: 'purify_[hash:base64:5]',
                            modules: true,
                        }
                    },     
                    'sass-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                              require('postcss-preset-env')({
                                autoprefixer: {
                                  flexbox: 'no-2009',
                                },
                                stage: 3,
                              })
                            ]
                          },
                    }
                ]   
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "images/[name].[hash:8].[ext]", // 图片输出的路径
                            limit: 10 * 1024
                        }
                    },
                    "image-webpack-loader"
                ]
            },
            {
                test: /\.(eot|woff2?|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'font/[name]-[hash:5].min.[ext]',
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                        }
                    }
              
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html", // 最终创建的文件名
            template: path.resolve(__dirname, '..', "src/template.html"), // 指定模板路径
            minify: {
                collapseWhitespace: true // 去除空白
            }
        }),
        new webpack.ProvidePlugin({ $: 'jquery' }),
        // happypack
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'happyBabel',
            //如何处理  用法和loader 的配置一样
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
            }],
            //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        // css单独提取
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css",
        })
    ],
    performance: false // 关闭性能提示
};
