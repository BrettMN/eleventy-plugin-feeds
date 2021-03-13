// const feedHelper = require('./feeds.helper');

class Atom {
  // or `async data() {`
  // or `get data() {`
  data() {
    return {
      permalink: 'feed.atom',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const feedsPlugin = this.feedsPluginData();

    return feedsPlugin.helper
      .feed(feedsPlugin, data.collections[feedsPlugin.collectionName])
      .atom();
  }
}

module.exports = Atom;
