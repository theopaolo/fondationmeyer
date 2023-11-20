const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const { outdent } = require("outdent");

module.exports = (config) => {
  // Existing markdown-it options
  const mdOptions = {
    html: true,
    breaks: false,
    linkify: true,
  };

  // Set up markdown-it with existing options and plugins
  const markdownLib = markdownIt(mdOptions)
    .use(markdownItAttrs)
    .disable("code")
    .use(function(md) {
      // Custom rule for bold text
      md.renderer.rules.strong_open = () => '<span class="bold">';
      md.renderer.rules.strong_close = () => '</span>';
  });

  // Set Eleventy to use the customized markdown-it library
  config.setLibrary("md", markdownLib)

  // watching styles folder to gen sass
  config.addWatchTarget("./assets/styles/")

  // Passthrough for images & Assets
  config.addPassthroughCopy('./_content/images/')
  config.addPassthroughCopy('./assets/**/*')

  // Aside shortcode
  config.addPairedNunjucksShortcode("Aside", function (content, classes) {
    const md = outdent`${markdownLib.render(content)}`
    return `<aside ${classes ? `class="${classes}"` : ''}>${md}</aside>`
  })

  // Actions Collection
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

  // News Collection
  config.addCollection('news', collection => {
    let ordered = []
    let unordered = []
    const pages = collection.getFilteredByGlob('**/actualites/*.md')

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
    dir: {
      includes: '../_includes/',
      data: '../_data',
      input: '_content',
      output: '_site'
    }
  };
};
