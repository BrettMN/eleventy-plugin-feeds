const feedHelper = require('./feeds.helper');

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
    return 'test';
    const feeds = feedHelper(data.collections.post);

    return feeds.rss();
  }
}

module.exports = Rss;
