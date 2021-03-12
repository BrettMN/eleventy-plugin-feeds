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
    const feeds = data.feedsPlugin.populateFeedList(
      data.feedsPlugin.data,
      data.collections[data.feedsPlugin.data.collectionName]
    );

    return feeds.json();
  }
}

module.exports = Json;
