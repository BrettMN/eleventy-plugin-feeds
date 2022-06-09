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
      /* TODO: JSFIX could not patch the breaking change:
      Allow copying broken symlinks 
      Suggested fix: You can use the exists and existsSync functions https://nodejs.org/api/fs.html#fsexistspath-callback from the fs module to check if a symlink is broken. */
      fs.copySync(`${__dirname}/src/templates/`, `${src}/${dirForFeeds}`);
    }
  });
};
