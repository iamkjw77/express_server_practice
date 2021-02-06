"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// 날짜
var $day = document.querySelector('.date__day');
var $date = document.querySelector('.date__date');
var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var today = new Date();
$day.textContent = week[today.getDay()];
$date.textContent = today.toString().slice(4, 15); // 할 일 추가

var $form = document.querySelector('.todo__form');
var $todo_input = document.querySelector('.form__input');
var $label = document.querySelector('.form__label');
var $ul = document.querySelector('.todo__todos-list');
var $allDone = document.getElementById('complete-all');
var $clear_done_btn = document.querySelector('.clear-complete__btn');
var $completed_todos = document.querySelector('.btn__completed-todos');
var $remain_todos = document.querySelector('.todo__remain-todos');
var $btn_list = document.querySelector('.todos-btn__list');
var todos = [];
var btnState = 'all';

var render = function render() {
  var _todos = todos.filter(function (_ref) {
    var completed = _ref.completed;
    return btnState === 'all' ? true : btnState === 'active' ? !completed : completed;
  });

  $ul.innerHTML = _todos.map(function (_ref2) {
    var id = _ref2.id,
        content = _ref2.content,
        completed = _ref2.completed;
    return "<li id=\"".concat(id, "\">\n      <input id=\"ck-").concat(id, "\" type=\"checkbox\" ").concat(completed ? "checked" : '', " />\n      <label class=").concat(completed ? "checked" : '', " for=\"ck-").concat(id, "\">").concat(content, "</label>\n      <button>x</button>\n    </li>");
  }).join('');
  var countCompleted = todos.filter(function (todo) {
    return todo.completed;
  }).length;
  var countLeft = todos.filter(function (todo) {
    return !todo.completed;
  }).length;
  $completed_todos.textContent = countCompleted;
  $remain_todos.textContent = countLeft;
};

var setTodos = function setTodos(_todos) {
  todos = _todos;
  render();
};

var fetchTodos = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var res, _todos;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return axios.get('/todos');

          case 3:
            res = _context.sent;
            _context.next = 6;
            return res.data();

          case 6:
            _todos = _context.sent;
            setTodos(_todos);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function fetchTodos() {
    return _ref3.apply(this, arguments);
  };
}();

var addTodo = function () {
  var generateId = function generateId() {
    return Math.max.apply(Math, _toConsumableArray(todos.map(function (todo) {
      return todo.id;
    })).concat([0])) + 1;
  };

  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(content) {
      var res, _todos;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return ajax.post('/todos', {
                id: generateId(),
                content: content,
                completed: false
              });

            case 3:
              res = _context2.sent;
              _context2.next = 6;
              return res.json();

            case 6:
              _todos = _context2.sent;
              setTodos(_todos);
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 10]]);
    }));

    return function (_x) {
      return _ref4.apply(this, arguments);
    };
  }();
}();

var removeTodo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var res, _todos;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return ajax["delete"]("/todos/".concat(id));

          case 3:
            res = _context3.sent;
            _context3.next = 6;
            return res.json();

          case 6:
            _todos = _context3.sent;
            setTodos(_todos);
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));

  return function removeTodo(_x2) {
    return _ref5.apply(this, arguments);
  };
}();

var toggleTodo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
    var completed, res, _todos;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            completed = !todos.find(function (item) {
              return item.id === id;
            }).completed;
            _context4.prev = 1;
            _context4.next = 4;
            return ajax.patch("/todos/".concat(id), {
              completed: completed
            });

          case 4:
            res = _context4.sent;
            _context4.next = 7;
            return res.json();

          case 7:
            _todos = _context4.sent;
            setTodos(_todos);
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](1);
            console.error(_context4.t0);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 11]]);
  }));

  return function toggleTodo(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var toggleComplete = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(completed) {
    var res, _todos;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return ajax.patch('/todos', {
              completed: completed
            });

          case 3:
            res = _context5.sent;
            _context5.next = 6;
            return res.json();

          case 6:
            _todos = _context5.sent;
            setTodos(_todos);
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function toggleComplete(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

var removeCompletedAll = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var res, _todos;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return ajax["delete"]('/todos/completed');

          case 3:
            res = _context6.sent;
            _context6.next = 6;
            return res.json();

          case 6:
            _todos = _context6.sent;
            setTodos(_todos);
            _context6.next = 13;
            break;

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0);

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 10]]);
  }));

  return function removeCompletedAll() {
    return _ref8.apply(this, arguments);
  };
}();

var changeBtn = function changeBtn(id) {
  _toConsumableArray($btn_list.children).forEach(function ($item) {
    $item.classList.toggle('active', $item.id === id);
  });

  btnState = id;
  render();
}; // 이벤트


document.addEventListener('DOMContentLoaded', fetchTodos);

$form.onsubmit = function (e) {
  e.preventDefault();
  var content = $todo_input.value;
  if (!content) return;
  addTodo(content);
  $todo_input.value = '';
  $todo_input.focus();
};

$ul.onclick = function (e) {
  if (!e.target.matches('.todo__todos-list > li > button')) return;
  removeTodo(+e.target.parentNode.id);
};

$ul.onchange = function (e) {
  if (!e.target.matches('.todo__todos-list > li > input[type=checkbox]')) return;
  toggleTodo(+e.target.parentNode.id);
};

$allDone.onchange = function (e) {
  toggleComplete(e.target.checked);
};

$clear_done_btn.onclick = function () {
  removeCompletedAll();
};

$btn_list.onclick = function (_ref9) {
  var target = _ref9.target;
  // if (target.classList.contains('todos-btn__list')) return;
  if (target === $btn_list) return;
  changeBtn(target.parentNode.id); // $btn_list.querySelector('.active').classList.remove('active');
  // target.parentNode.classList.add('active');
}; // label 이벤트


$todo_input.onfocus = function () {
  $label.textContent = '';
};

$todo_input.onblur = function () {
  if ($todo_input.value) return;
  $label.textContent = 'Add a task...';
};