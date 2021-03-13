const { Feed } = require('feed');
const { stripHtml } = require('eleventy-plugin-wipdeveloper-tools/src/');

module.exports = { feed };

function feed(feedPlugin, collection) {
  const feed = makeFeed(feedPlugin.feedInfo, feedPlugin.author);

  return populateFeedList(feedPlugin, feed, collection);
}

function makeFeed(
  {
    siteTitle,
    siteDescription,
    siteUrl,
    language,
    siteImage,
    favicon,
    copyright,
    categories,
  },
  author
) {
  const url = formatUrlBase(siteUrl);
  const feed = new Feed({
    title: siteTitle,
    description: siteDescription,
    id: url,
    link: siteUrl,
    language,
    image: siteImage,
    favicon: favicon,
    copyright: copyright,
    // updated: new Date(2013, 6, 14), // optional, default = today
    generator: '11ty-plugin-feeds with Feed for Node.js',
    feedLinks: {
      rss: `${url}feed.rss`,
      json: `${url}feed.json`,
      atom: `${url}feed.atom`,
    },
    author: author,
  });

  categories.forEach((c) => feed.addCategory(c));

  return feed;
}

function populateFeedList(
  { siteUrl, author, imagePropertyName },
  feed,
  collection
) {
  const url = formatUrlBase(siteUrl);
  if (feed.items.length === 0) {
    collection.forEach((post) => {
      let postFeedItem = makeFeedItem(post, url, author, imagePropertyName);

      feed.addItem(postFeedItem);
    });
  }

  return { rss: feed.rss2, atom: feed.atom1, json: feed.json1 };
}

function makeFeedItem(post, url, author, imagePropertyName) {
  let contentToUse = post.templateContent;

  const urlPath = formatUrlPath(post.url);

  let postFeedItem = {
    title: stripHtml(post.data.title).replace('&#58;', ':'),
    id: `${url}${urlPath}`,
    link: `${url}${urlPath}`,
    description: stripHtml(contentToUse).substring(0, 200),
    content: contentToUse.replace(/src="\//g, `src="${url}`),
    author: [author],
    contributor: [],
    date: new Date(post.date),
  };

  if (post.data[imagePropertyName]) {
    postFeedItem.image = `${url}${formatUrlPath(post.data[imagePropertyName])}`;
  }
  return postFeedItem;
}

function formatUrlBase(url) {
  return `${url}${url.charAt(url.length) === '/' ? '' : '/'}`;
}

function formatUrlPath(path) {
  return path.charAt(0) === `/` ? path.substring(1) : path;
}
