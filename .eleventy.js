module.exports = (config) => {
  config.addPassthroughCopy('./_content/images/')
  config.addPassthroughCopy('./assets/js/')

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      includes: '../_includes/',
      data: '../_data',
      input: '_content',
      output: '_site'
    }
  }
}
