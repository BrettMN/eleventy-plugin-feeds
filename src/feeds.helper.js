const Podcast = require('podcast');

module.exports = { feed };

function feed(feedPlugin, collection) {
  const feed = new Podcast(feedPlugin.feedOptions);

  populateFeedList(feedPlugin.feedItemMapper, feed, collection);

  return feed.buildXml();
}

function populateFeedList(feedItemMapper, feed, collection) {
  collection.forEach((post) => {
    feed.addItem(feedItemMapper(post));
  });
}
