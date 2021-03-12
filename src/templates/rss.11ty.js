// const feedHelper = require('./feeds.helper');

class Rss {
  // or `async data() {`
  // or `get data() {`
  data() {
    return {
      permalink: 'feed.rss',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const feeds = data.feedsPlugin.populateFeedList(
      data.feedsPlugin.data,
      data.collections[data.feedsPlugin.data.collectionName]
    );

    return feeds.rss();
  }
}

module.exports = Rss;
