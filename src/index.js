const { isFileExist, readFile, makeNewFile, setFile } = require('./utils/fileHandle.js');
const { openBrowser } = require('./utils/openBrowser.js');
const { getRequest, postRequest } = require('./utils/request.js');
const { isYAMLExist, getYAML } = require('./utils/yamlHandle.js');
const { getMD, parseMD } = require('./utils/mdHandle.js');

function init() {
  let configFileName = 'mdstory.config.json';

  if (isFileExist(configFileName)) {
    console.log('mdstory.config.json exists');
  } else {
    let defaultConfig = `{\n    "blogName": "[xxx in xxx.tistory.com]",\n    "appID": "App ID",\n    "secretKey": "Secret Key"\n}`;
    makeNewFile(configFileName, defaultConfig);
  }
}

function token(authenticationCode) {
  let configFileName = 'mdstory.config.json';

  if (authenticationCode == undefined) {
    let config;
    try {
      let data = readFile(configFileName);
      config = JSON.parse(data);
    } catch (error) {
      console.error(`JSON parse error: ${error.message}`);
    }

    getAuthenticationCodeUrl = `https://www.tistory.com/oauth/authorize?client_id=${config.appID}&redirect_uri=https://${config.blogName}.tistory.com&response_type=code`;
    console.log('opening browser...');
    openBrowser(getAuthenticationCodeUrl);
  } else {
    try {
      let data = readFile(configFileName);
      config = JSON.parse(data);
    } catch (error) {
      console.error(`JSON parse error: ${error.message}`);
    }

    try {
      getAccessTokenUrl = `https://www.tistory.com/oauth/access_token?client_id=${config.appID}&client_secret=${config.secretKey}&redirect_uri=https://${config.blogName}.tistory.com&code=${authenticationCode}&grant_type=authorization_code`;
      res = getRequest(getAccessTokenUrl);
    } catch (error) {
      console.error(`get accessToken error: ${error.message}`);
    }

    let accessToken;
    try {
      accessToken = res.split('access_token=')[1];
    } catch (error) {
      console.error(`handle accessToken error: ${error.message}`);
    }

    try {
      let tokenFileName = '.mdstorytoken';
      setFile(tokenFileName, accessToken);
    } catch (error) {
      console.error(`save token error: ${error.message}`);
    }
  }
}

function write(filePath) {
  // get access token
  let tokenFileName = '.mdstorytoken';
  let accessToken = readFile(tokenFileName);

  let data = readFile(filePath);

  if (!isYAMLExist(data)) {
    console.log("error : this md file doesn't include YAML");
    return;
  }

  let YAMLdata = getYAML(data);

  let MDdata = getMD(data);

  let configFileName = 'mdstory.config.json';
  try {
    let data = readFile(configFileName);
    config = JSON.parse(data);
  } catch (error) {
    console.error(`JSON parse error: ${error.message}`);
  }

  let params = {
    access_token: accessToken,
    output: 'json',
    blogName: config.blogName,
    title: YAMLdata.title,
    content: parseMD(MDdata),
    visibility: YAMLdata.public ? 3 : 0,
    category: 0,
    tag: YAMLdata.tag ? YAMLdata.tag.join(',') : '',
  };
  let writePostUrl = `https://www.tistory.com/apis/post/write`;

  res = postRequest(writePostUrl, params);

  try {
    res = JSON.parse(res);
    if (res['tistory']['status'] == 200) {
      console.log(`update succeed! postId = ${res['tistory']['postId']}`);
    }
  } catch (error) {
    console.error(`error : ${error.message}`);
  }
}

function update(filePath, postId) {
  // get access token
  let tokenFileName = '.mdstorytoken';
  let accessToken = readFile(tokenFileName);

  let data = readFile(filePath);

  if (!isYAMLExist(data)) {
    console.log("error : this md file doesn't include YAML");
    return;
  }

  let YAMLdata = getYAML(data);

  let MDdata = getMD(data);

  let configFileName = 'mdstory.config.json';
  try {
    let data = readFile(configFileName);
    config = JSON.parse(data);
  } catch (error) {
    console.error(`JSON parse error: ${error.message}`);
  }

  let params = {
    access_token: accessToken,
    output: 'json',
    blogName: config.blogName,
    postId: postId,
    title: YAMLdata.title,
    content: parseMD(MDdata),
    visibility: YAMLdata.public ? 3 : 0,
    category: 0,
    tag: YAMLdata.tag.join(','),
  };
  let updatePostUrl = `https://www.tistory.com/apis/post/modify?`;

  res = postRequest(updatePostUrl, params);

  try {
    res = JSON.parse(res);
    if (res['tistory']['status'] == 200) {
      console.log(`update succeed! postId = ${res['tistory']['postId']}`);
    }
  } catch (error) {
    console.error(`error : ${error.message}`);
  }
}

exports.init = init;
exports.token = token;
exports.write = write;
exports.update = update;
