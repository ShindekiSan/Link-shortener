const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // entry: {
    //     main: "./src/index.js",
    //     app: "./src/components/App.js",
    //     LogIn: "./src/components/AuthPage/LogIn.jsx",
    //     SignUp: "./src/components/AuthPage/SignUp.jsx",
    //     MainPage: "./src/components/MainPage/MainPage.jsx",
    //     Profile: "./src/components/ProfilePage/Profile.jsx",
    //     LinkDetails: "./src/components/ProfilePage/LinkDetails.jsx",
    //     ShortenerPage: "./src/components/ShortenerPage/ShortenerPage.jsx",
    //     Search: "./src/components/SearchLinksPage/SearchLinksPage.jsx",
    //     SearchedLinkDetails: "./src/components/SearchLinksPage/SearchedLinkDetails.jsx",
    // },
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, "..", "/dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
        }
    }
};