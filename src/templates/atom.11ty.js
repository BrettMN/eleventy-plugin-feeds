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
    const feeds = data.feedsPlugin.populateFeedList(
      data.feedsPlugin.data,
      data.collections.post
    );

    return feeds.atom();
  }
}

module.exports = Atom;
