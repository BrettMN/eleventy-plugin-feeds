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
    // const feeds = data
    //   .feedsPluginData()
    //   .populateFeedList(
    //     data.feedsPluginData().data,
    //     data.collections[data.feedsPluginData().data.collectionName]
    //   );

    ('return feeds.rss();');
  }
}

module.exports = Rss;
