"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var fetchTodos = function fetchTodos() {
  // ajax.get('/todos', setTodos);
  axios.get('/todos').then(function (_ref3) {
    var _todos = _ref3.data;
    return setTodos(_todos);
  })["catch"](console.error);
};

var addTodo = function () {
  var generateId = function generateId() {
    return Math.max.apply(Math, _toConsumableArray(todos.map(function (todo) {
      return todo.id;
    })).concat([0])) + 1;
  };

  return function (content) {
    axios.post('/todos', {
      id: generateId(),
      content: content,
      completed: false
    }).then(function (_ref4) {
      var _todos = _ref4.data;
      return setTodos(_todos);
    })["catch"](console.error);
  };
}();

var removeTodo = function removeTodo(id) {
  axios["delete"]("/todos/".concat(id)).then(function (_ref5) {
    var _todos = _ref5.data;
    return setTodos(_todos);
  })["catch"](console.error);
};

var toggleTodo = function toggleTodo(id) {
  var completed = !todos.find(function (item) {
    return item.id === id;
  }).completed;
  axios.patch("/todos/".concat(id), {
    completed: completed
  }).then(function (_ref6) {
    var _todos = _ref6.data;
    return setTodos(_todos);
  })["catch"](console.error);
};

var toggleComplete = function toggleComplete(completed) {
  axios.patch('/todos', {
    completed: completed
  }).then(function (_ref7) {
    var _todos = _ref7.data;
    return setTodos(_todos);
  })["catch"](console.error);
};

var removeCompletedAll = function removeCompletedAll() {
  // ajax.delete('/todos/completed', setTodos);
  axios["delete"]('/todos/completed').then(function (_ref8) {
    var _todos = _ref8.data;
    return setTodos(_todos);
  })["catch"](console.error);
};

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