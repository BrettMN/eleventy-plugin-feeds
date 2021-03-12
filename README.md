# eleventy-plugin-feeds

An Eleventy plugin to generate feeds.

Works for 1 author sites currently.

## Set Up

```js
/*
    ## Set up example
    Copy bellow 
  */
eleventyConfig.addPlugin(feedsPlugin, {
  // source directory for your project.  Used to copy template into the `dirForFeeds`
  src: __dirname + `/src/`,
  // directory that will hold the templates for the feeds.
  dirForFeeds: 'feeds-plugin-test',
  // Full site url without a trailing slash.
  siteUrl: `https://test.com`,
  // Site title
  siteTitle: 'Test Site',
  // Site description
  siteDescription: 'Fake site description for test rss ',
  // Language
  language: 'en',
  // Full Url to site image
  siteImage: `https://test.com/full/path/to/image.png`,
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
});
```

##

Build with [Feed](https://www.npmjs.com/package/feed)
