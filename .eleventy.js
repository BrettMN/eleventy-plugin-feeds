const fs = require('fs-extra');

module.exports = function (
  eleventyConfig,
  { src, dir: dirForFeeds = 'feeds-plugin' }
) {
  eleventyConfig.on('beforeBuild', () => {
    // Run me before the build starts

    if (fs.pathExistsSync(`${src}/${dirForFeeds}`) === false) {
      console.log('copy feeds');
      fs.copySync(`${__dirname}/src/`, `${src}/${dirForFeeds}`);
    }
  });
};
