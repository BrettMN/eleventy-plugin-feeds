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

    const items = data.collections[feedsPlugin.collectionName].slice(
      0,
      feedsPlugin.feedOptions.maxItems
    );

    console.log({ items });

    return feedsPlugin.helper.feed(feedsPlugin, items);
  }
}

module.exports = Rss;
