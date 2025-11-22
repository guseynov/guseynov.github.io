module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/projects/vue/hot_or_not/dist/"
      : "/"
};
