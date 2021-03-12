const { Feed } = require('feed');
const { stripHtml } = require('eleventy-plugin-wipdeveloper-tools/src/');

module.exports = { populateFeedList, makeAuthor, makeFeed };

function makeAuthor(name, email, url) {
  return {
    name: name,
    email: email,
    link: url,
  };
}

function makeFeed(
  siteTitle,
  siteDescription,
  siteUrl,
  language,
  siteImage,
  favicon,
  copyright,
  author
) {
  const url = formatUrlBase(siteUrl);
  return new Feed({
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
}

function populateFeedList(
  { feed, siteUrl, author, imagePropertyName },
  collection
) {
  const url = formatUrlBase(siteUrl);
  if (feed.items.length === 0) {
    collection.forEach((post) => {
      let contentToUse = post.templateContent;

      const urlPath = formatUrlPath(post.url);

      let postFeedItem = {
        title: stripHtml(post.data.title).replace('&#58;', ':'),
        id: `${url}${urlPath}`,
        link: `${url}${urlPath}`,
        description: stripHtml(contentToUse).substring(0, 200),
        content: contentToUse,
        author: [author],
        contributor: [],
        date: new Date(post.date),
      };

      if (post.data[imagePropertyName]) {
        postFeedItem.image = `${url}${formatUrlPath(
          post.data[imagePropertyName]
        )}`;
      }

      feed.addItem(postFeedItem);
    });
  }

  return { rss: feed.rss2, atom: feed.atom1, json: feed.json1 };
}

function formatUrlBase(url) {
  return `${url}${url.charAt(url.length) === '/' ? '' : '/'}`;
}

function formatUrlPath(path) {
  return path.charAt(0) === `/` ? path.substring(1) : path;
}
