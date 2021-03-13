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
    // const feeds = this.feedsPluginData().populateFeedList(
    //   data.feedsPluginData().data,
    //   data.collections[data.feedsPluginData().data.collectionName]
    // );

    return 'feeds.json();';
  }
}

module.exports = Json;
