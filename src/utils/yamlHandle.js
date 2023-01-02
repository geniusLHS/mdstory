const YAML = require('yaml');

function isYAMLExist(content) {
  // 가장 앞은 ---로 시작해야 한다.
  let isFirstTriplebarExist = content.startsWith('---');

  let isSecondTriplebarExist = content.match(/\n---/m) != null;

  return isFirstTriplebarExist && isSecondTriplebarExist;
}

function getYAML(content) {
  let rawYAMLContent;
  let YAMLContent;
  try {
    rawYAMLContent = content.split('---')[1].split(/\n---/m)[0];
    YAMLContent = YAML.parse(rawYAMLContent);
  } catch (error) {
    console.error(`getYAML error: ${error.message}`);
  }

  return YAMLContent;
}

exports.isYAMLExist = isYAMLExist;
exports.getYAML = getYAML;
