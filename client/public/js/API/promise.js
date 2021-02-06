"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var ajax = function () {
  var req = function req(method, url, payload) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(payload));

      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error(xhr.status));
        }
      };
    });
  };

  return {
    get: function get(url) {
      return req('GET', url);
    },
    post: function post(url, payload) {
      return req('POST', url, payload);
    },
    patch: function patch(url, payload) {
      return req('PATCH', url, payload);
    },
    "delete": function _delete(url) {
      return req('DELETE', url);
    }
  };
}();

var _default = ajax;
exports["default"] = _default;