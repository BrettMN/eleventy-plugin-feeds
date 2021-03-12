const fs = require('fs-extra');
const helper = require('./src/feeds.helper');

// let feed;

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
  let author = helper.makeAuthor(authorName, authorEmail, authorUrl);

  feed = helper.makeFeed(
    siteTitle,
    siteDescription,
    siteUrl,
    language,
    siteImage,
    favicon,
    copyright,
    author
  );

  categories.forEach((c) => feed.addCategory(c));

  feed.addContributor(author);

  eleventyConfig.addGlobalData('feedsPlugin', {
    data: { feed, siteUrl, author, imagePropertyName },
    populateFeedList: helper.populateFeedList,
  });

  eleventyConfig.on('beforeBuild', () => {
    // Run me before the build starts

    if (fs.pathExistsSync(`${src}/${dirForFeeds}`) === false) {
      console.log('copy feeds');
      fs.copySync(`${__dirname}/src/templates/`, `${src}/${dirForFeeds}`);
    }
  });
};
