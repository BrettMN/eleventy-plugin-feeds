const fs = require('fs-extra');
const helper = require('./src/feeds.helper');

module.exports = function (
  eleventyConfig,
  {
    src = '',
    collectionName = 'post',
    dirForFeeds = 'feeds-plugin',
    siteUrl = '',
    siteTitle = '',
    siteDescription = '',
    language = 'en',
    siteImage = '',
    favicon = '',
    copyright = '',
    categories = [''],
    authorName = '',
    authorEmail = '',
    authorUrl = '',
    imagePropertyName = '',
  }
) {
  let author = { name: authorName, email: authorEmail, link: authorUrl };

  const feedInfo = {
    siteTitle,
    siteDescription,
    siteUrl,
    language,
    siteImage,
    favicon,
    copyright,
    categories,
    author,
  };

  eleventyConfig.addShortcode('feedsPluginData', function (...what) {
    console.log(...what);

    return {
      collectionName,
      feedInfo,
      siteUrl,
      author,
      imagePropertyName,
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
