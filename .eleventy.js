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
      md.renderer.rules.strong_open = () => '<span class="custom-bold">';
      md.renderer.rules.strong_close = () => '</span>';
    });

  // Set Eleventy to use the customized markdown-it library
  config.setLibrary("md", markdownLib);

  // ... Rest of your existing Eleventy config ...

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
