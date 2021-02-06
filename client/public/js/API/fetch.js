"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var ajax = {
  get: function get(url) {
    return fetch(url);
  },
  post: function post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  },
  patch: function patch(url, payload) {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  },
  "delete": function _delete(url) {
    return fetch(url, {
      method: 'DELETE'
    });
  }
};
var _default = ajax;
exports["default"] = _default;