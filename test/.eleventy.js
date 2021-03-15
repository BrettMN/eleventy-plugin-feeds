// Import plugin
const feedsPlugin = require('../.eleventy.js');

const { stripHtml } = require('eleventy-plugin-wipdeveloper-tools/src/');

module.exports = function (eleventyConfig) {
  /*
    ## Set up example
    Copy bellow 
  */
  eleventyConfig.addPlugin(feedsPlugin, {
    // source directory for your project.  Used to copy template into the `dirForFeeds`
    src: __dirname + `/src/`,
    // Name of collection to add to feed
    collectionName: 'post',

    feedOptions: {
      // directory that will hold the templates for the feeds.
      dirForFeeds: 'feeds-plugin-test',
      // Full site url without a trailing slash.
      siteUrl: `https://test.com`,
      // Site title
      title: 'Test Site',
      // Site description
      description: 'Fake site description for test rss ',
      // Language
      language: 'en',
      // Full Url to site image
      imageUrl: `https://test.com/full/path/to/image.png`,
      // Full Favicon path
      favicon: 'https://test.com/favicon.ico',
      // Copyright info
      copyright: `All rights reserved ${new Date().getFullYear()}, Tester McTesterson`,
      // Categories
      categories: ['test', 'this'],
      // Author Name
      authorName: 'Tester McTesterson',
      // Author Email
      authorEmail: 'Tester@McTesterson.co',
      // Author URl
      authorUrl: `https://test.com/me`,
      // Featured image meta tag from each post
      imagePropertyName: 'featuredImage',
    },
    feedItemMapper: function (itemFromCollection) {
      return {
        title: itemFromCollection.data.title,
        description: stripHtml(itemFromCollection.templateContent).substring(
          0,
          200
        ),
        url: `https://test.com${itemFromCollection.url}`, // link to the item
        categories: itemFromCollection.data.tags, // optional - array of item categories
        date: itemFromCollection.data.date, // any format that js Date can parse.
        content: itemFromCollection.templateContent, // optional string Long html content for the episode
      };
    },
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
