/* eslint-env node */

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const { EnvironmentPlugin } = require("webpack");

const sharedConfig = {
  mode: "production",
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
  },
  devtool: false,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        loader: "babel-loader",
      },
      // {
      //   test: /\.scss$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      // },
    ],
  },
  // plugins: [
  //   new MiniCssExtractPlugin(),
  //   new EnvironmentPlugin({ GITHUB_SHA: "CustomBuild", GITHUB_REPOSITORY: "CustomBuild" }),
  // ],
  externals: {
    "canadv.ash": "commonjs canadv.ash",
    kolmafia: "commonjs kolmafia",
  },
};

// handle the file creating the locket UI html file
const otherRelayConfig = merge(
  {
    entry: "./src/locket.ts",
    output: {
      path: path.resolve(__dirname, "KoLmafia", "relay"),
      filename: "choice.1463.js",
      libraryTarget: "commonjs",
    },
    module: {
      rules: [
        {
          // Include ts, tsx, js, and jsx files.
          test: /\.(ts|js)x?$/,
          loader: "babel-loader",
        },
      ],
    },
  },
  sharedConfig
);

// handle the react files used in the locket html file
const relayConfig = merge(
  {
    entry: "./src/relay/index.tsx",
    output: {
      path: path.resolve(__dirname, "KoLmafia", "relay", "locket"),
      filename: "locket-ui.js",
      libraryTarget: "commonjs",
    },
    module: {
      rules: [
        {
          // Include ts, tsx, js, and jsx files.
          test: /\.(ts|js)x?$/,
          loader: "babel-loader",
          options: { presets: ["@babel/env", "@babel/preset-react"] },
        },
      ],
    },
  },
  sharedConfig
);

module.exports = [relayConfig, otherRelayConfig];
