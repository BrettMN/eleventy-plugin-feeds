# eleventy-plugin-feeds

An Eleventy plugin to generate feeds.

Works with 11ty version 0.11.1

Works for 1 author sites currently.

## Set Up

**`feedOptions`** is a pass through object to create a feed with Podcast see a complete description at https://www.npmjs.com/package/podcast#feedoptions

**`feedItemMapper`** creates the the object that is passed into `addFeedItem` from the Podcast package. See a complete description at https://www.npmjs.com/package/podcast#itemoptions

```js
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
```

## Built With

[Podcast](https://www.npmjs.com/package/podcast)

## How to Upgrade

Delete the `dirForFeeds` directory after updates to get the latest changes in your site.
