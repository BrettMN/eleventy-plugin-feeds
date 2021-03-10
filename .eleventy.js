const fs = require('fs');

module.exports = function (eleventyConfig, options = {}) {
  eleventyConfig.on('beforeBuild', () => {
    // Run me before the build starts
    fs.copyFileSync('./src/**.*', eleventyConfig.dir.input);
  });

  return {
    dir: { input: 'src' },
  };
};
