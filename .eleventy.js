const fs = require('fs-extra');
const helper = require('./src/feeds.helper');

module.exports = function (
  eleventyConfig,
  {
    src,
    collectionName = 'post',
    dirForFeeds = 'feeds-plugin',
    feedOptions,
    feedItemMapper,
  }
) {
  eleventyConfig.addShortcode('feedsPluginData', function () {
    return {
      collectionName,
      feedOptions,
      feedItemMapper,
      helper,
    };
  });

  eleventyConfig.on('beforeBuild', () => {
    // Run me before the build starts
    if (fs.pathExistsSync(`${src}/${dirForFeeds}`) === false) {
      fs.copySync(`${__dirname}/src/templates/`, `${src}/${dirForFeeds}`);
    }
  });
};
