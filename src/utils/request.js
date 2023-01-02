var request = require('sync-request');

function getRequest(url) {
  let res = request('GET', url);

  return res.getBody().toString();
}

function postRequest(url, params) {
  let res = request('POST', url, {
    json: params,
  });

  return res.getBody().toString();
}

exports.getRequest = getRequest;
exports.postRequest = postRequest;
