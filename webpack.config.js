const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const dotenv = require("dotenv");
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const EnvironmentPlugin = require("webpack/lib/EnvironmentPlugin");

const isDevelopment = process.env.NODE_ENV !== "production";

const src = `${__dirname}/src`;
dotenv.config();

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: !isDevelopment ? "hidden-source-map" : "eval",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@hooks": path.resolve(src, "hooks"),
      "@reducer": path.resolve(src, "store/reducer"),
      "@api": path.resolve(src, "api"),
      "@components": path.resolve(src, "components"),
      "@pages": path.resolve(src, "pages"),
      "@utils": path.resolve(src, "utils"),
      "@constants": path.resolve(src, "constants"),
    },
  },
  entry: {
    app: "./src/index.jsx",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["IE 10"] },
                debug: isDevelopment,
              },
            ],
            "@babel/preset-react",
          ],
          env: {
            development: {
              plugins: [require.resolve("react-refresh/babel")],
            },
          },
        },
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [

    new ReactRefreshWebpackPlugin(),
    new LoaderOptionsPlugin({ minimize: true }),

    new DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new EnvironmentPlugin({
      NODE_ENV: isDevelopment ? "development" : "production",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: isDevelopment
        ? {
          collapseWhitespace: true,
          removeComments: true,
        }
        : false,
    }),
    new CleanWebpackPlugin(),
  ],

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]-[hash].js",
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
    open: true,
  },
};
