// const feedHelper = require('./feeds.helper');

class Rss {
  // or `async data() {`
  // or `get data() {`
  data() {
    return {
      permalink: 'rss.xml',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const feedsPlugin = this.feedsPluginData();

    const maxItems = feedsPlugin.feedOptions.maxItems || 10;

    const items = data.collections[feedsPlugin.collectionName]
      .reverse()
      .slice(0, maxItems);

    return feedsPlugin.helper.feed(feedsPlugin, items);
  }
}

module.exports = Rss;
