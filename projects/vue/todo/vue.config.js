module.exports = {
  productionSourceMap: false,
  parallel: false,
  configureWebpack: {
    optimization: {
      minimize: false
    }
  },
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/projects/todo/"
      : "/"
};
