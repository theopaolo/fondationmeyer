module.exports = (config) => {
  config.addWatchTarget("./assets/styles/")

  config.addPassthroughCopy('./_content/images/')
  config.addPassthroughCopy('./assets/js/')

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      includes: '../_includes/',
      data: '../_data',
      input: '_content',
      output: '_site'
    }
  }
}
