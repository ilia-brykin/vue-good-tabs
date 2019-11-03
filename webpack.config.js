var path = require("path");
var webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/main.js",
  output: {
    // specify your output directory...
    path: path.resolve(__dirname, "./dist"),
    // and filename
    filename: "vue-good-tabs.js"
  },
  // default for pretty much every project
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader?sourceMap"
          },
          {
            loader: "sass-loader?sourceMap"
          }
        ],
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};



if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map;";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
