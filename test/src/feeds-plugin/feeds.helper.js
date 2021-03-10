let { Feed } = require('feed');

module.exports = populateFeedList;

// function () {
//   return { populateFeedList: populateFeedList };
// };

const brett = {
  name: 'Brett M. Nelson',
  email: 'Brett@wipdeveloper.com',
  link: 'https://wipeveloper.com/about',
};

let feed = new Feed({
  title: 'WIPDeveloper.com',
  description: 'Web development, usually with Salesforce. Sometimes not.',
  id: 'https://wipdeveloper.com/',
  link: 'https://wipdeveloper.com/',
  language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image:
    'https://wipdeveloper.com/images/logos/wipdeveloper.com-logo-black-with-white-background.png',
  favicon: 'https://wipdeveloper.com/favicon.ico',
  copyright: 'All rights reserved 2020, Brett M. Nelson',
  // updated: new Date(2013, 6, 14), // optional, default = today
  generator: '11ty with Feed for Node.js', // optional, default = 'Feed for Node.js'
  feedLinks: {
    rss: 'https://wipdeveloper.com/feed.rss',
    json: 'https://wipdeveloper.com/feed.json',
    atom: 'https://wipdeveloper.com/feed.atom',
  },
  author: brett,
});

feed.addCategory('Web Development');
feed.addCategory('Javascript');
feed.addCategory('Salesforce');

feed.addContributor(brett);

function populateFeedList(postsList) {
  if (feed.items.length === 0) {
    postsList.forEach((post) => {
      let contentToUse = post.data.premium
        ? post.data.transcription
        : post.templateContent;

      let postFeedItem = {
        title: stripHtml(post.data.title).replace('&#58;', ':'),
        id: `https://wipdeveloper.com${post.data.permalink}`,
        link: `https://wipdeveloper.com${post.data.permalink}`,
        description: stripHtml(contentToUse).substring(0, 200),
        content: post.content,
        author: [brett],
        contributor: [],
        date: new Date(post.date),
      };

      if (post.coverImage) {
        postFeedItem.image = post.coverImage;
      }

      feed.addItem(postFeedItem);
    });
  }

  return { rss: feed.rss2, atom: feed.atom1, json: feed.json1 };
}

function stripHtml(html) {
  if (html) {
    return html.replace(/(<([^>]+)>)/gi, '');
  }
}
