const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = (config) => {

  const mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const markdownLib = markdownIt(mdOptions)
    .use(markdownItAttrs)
    .disable("code");

  config.setLibrary("md", markdownLib);

  config.addWatchTarget("./assets/styles/")

  config.addPassthroughCopy('./_content/images/')
  config.addPassthroughCopy('./assets/**/*')

  config.addCollection('actions', collection => {
    let ordered = []
    let unordered = []
    const pages = collection.getFilteredByGlob('**/actions/*.md')

    for (let page of pages) {
      if (page.data.order) {
        if (ordered[page.data.order]) {
          ordered.splice(page.data.order, 0, page)
        } else {
          ordered[page.data.order] = page
        }
      } else {
        unordered.push(page)
      }
    }

    return ordered.concat(unordered)
  })

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    // pathPrefix: "/fondationmeyer.test/",
    dir: {
      includes: '../_includes/',
      data: '../_data',
      input: '_content',
      output: '_site'
    }
  }
}
