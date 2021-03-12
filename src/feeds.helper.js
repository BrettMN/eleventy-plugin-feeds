const { Feed } = require('feed');
const { stripHtml } = require('eleventy-plugin-wipdeveloper-tools/src/');

module.exports = { populateFeedList, makeAuthor, makeFeed };

// function () {
//   return { populateFeedList: populateFeedList };
// };

// const brett = {
//   name: 'Brett M. Nelson',
//   email: 'Brett@wipdeveloper.com',
//   link: 'https://wipeveloper.com/about',
// };

// let feed = new Feed({
//   title: 'WIPDeveloper.com',
//   description: 'Web development, usually with Salesforce. Sometimes not.',
//   id: 'https://wipdeveloper.com/',
//   link: 'https://wipdeveloper.com/',
//   language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
//   image:
//     'https://wipdeveloper.com/images/logos/wipdeveloper.com-logo-black-with-white-background.png',
//   favicon: 'https://wipdeveloper.com/favicon.ico',
//   copyright: 'All rights reserved 2020, Brett M. Nelson',
//   // updated: new Date(2013, 6, 14), // optional, default = today
//   generator: '11ty with Feed for Node.js', // optional, default = 'Feed for Node.js'
//   feedLinks: {
//     rss: 'https://wipdeveloper.com/feed.rss',
//     json: 'https://wipdeveloper.com/feed.json',
//     atom: 'https://wipdeveloper.com/feed.atom',
//   },
//   author: brett,
// });

// feed.addCategory('Web Development');
// feed.addCategory('Javascript');
// feed.addCategory('Salesforce');

// feed.addContributor(brett);

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
  return new Feed({
    title: siteTitle,
    description: siteDescription,
    id: siteUrl + '/',
    link: siteUrl,
    language,
    image: siteImage,
    favicon: favicon,
    copyright: copyright,
    // updated: new Date(2013, 6, 14), // optional, default = today
    generator: '11ty-plugin-feeds with Feed for Node.js',
    feedLinks: {
      rss: `${siteUrl}/feed.rss`,
      json: `${siteUrl}/feed.json`,
      atom: `${siteUrl}/feed.atom`,
    },
    author: author,
  });
}

function populateFeedList(
  { collectionName, feed, siteUrl, author, imagePropertyName },
  collection
) {
  if (feed.items.length === 0) {
    collection.forEach((post) => {
      let contentToUse = post.templateContent;

      let postFeedItem = {
        title: stripHtml(post.data.title).replace('&#58;', ':'),
        id: `${siteUrl}${post.url}`,
        link: `${siteUrl}${post.url}`,
        description: stripHtml(contentToUse).substring(0, 200),
        content: post.content,
        author: [author],
        contributor: [],
        date: new Date(post.date),
      };

      if (post.data[imagePropertyName]) {
        postFeedItem.image = `${siteUrl}/${post.data[imagePropertyName]}`;
      }

      feed.addItem(postFeedItem);
    });
  }

  return { rss: feed.rss2, atom: feed.atom1, json: feed.json1 };
}
