"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var ajax = function () {
  var req = function req(method, url, callback, payload) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 201) {
        callback(JSON.parse(xhr.response));
      } else {
        console.error(xhr.status);
      }
    };
  }; // 메서드와 리소스를 나타내는 URL을 대부분 API라고 한다.


  return {
    get: function get(url, callback) {
      req('GET', url, callback);
    },
    post: function post(url, payload, callback) {
      req('POST', url, callback, payload);
    },
    patch: function patch(url, payload, callback) {
      req('PATCH', url, callback, payload);
    },
    "delete": function _delete(url, callback) {
      req('DELETE', url, callback);
    }
  };
}();

var _default = ajax;
exports["default"] = _default;