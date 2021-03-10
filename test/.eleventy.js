const feedsPlugin = require('../.eleventy.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(feedsPlugin, { src: __dirname + '/src/' });
  // You can return your Config object (optional).
  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
