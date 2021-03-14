const Podcast = require('podcast');
const { stripHtml } = require('eleventy-plugin-wipdeveloper-tools/src/');

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
