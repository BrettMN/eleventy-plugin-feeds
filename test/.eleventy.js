const feedsPlugin = require('../src/feeds.helper');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(feedsPlugin);
  // You can return your Config object (optional).
  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
