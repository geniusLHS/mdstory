const Showdown = require('showdown');
const marked = require('marked');

function getMD(content) {
  let MDContent;
  try {
    MDContent = content.split(/\n---/m)[1];
  } catch (error) {
    console.error(`getMD error: ${error.message}`);
  }

  return MDContent;
}

function parseMD(content) {
  //   let converter = new Showdown.Converter();
  //   let html = converter.makeHtml(content);
  marked.setOptions({
    gfm: true,
  });
  let html = marked.parse(content);

  return html;
}

exports.getMD = getMD;
exports.parseMD = parseMD;
