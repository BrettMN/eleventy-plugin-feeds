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
    const feedsPlugin = this.feedsPluginData();

    return feedsPlugin.helper
      .feed(feedsPlugin, data.collections[feedsPlugin.collectionName])
      .rss();
  }
}

module.exports = Rss;
