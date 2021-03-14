// const feedHelper = require('./feeds.helper');

class Json {
  // or `async data() {`
  // or `get data() {`
  data() {
    return {
      permalink: 'feed.json',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const feedsPlugin = this.feedsPluginData();

    return feedsPlugin.helper
      .feed(feedsPlugin, data.collections[feedsPlugin.collectionName])
      .json();
  }
}

module.exports = Json;
