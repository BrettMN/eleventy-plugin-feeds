const feedHelper = require('./feeds.helper');

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
    const feeds = feedHelper(data.collections.post);

    return feeds.json();
  }
}

module.exports = Json;
