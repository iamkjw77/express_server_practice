// 날짜
const $day = document.querySelector('.date__day');
const $date = document.querySelector('.date__date');
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date();

$day.textContent = week[today.getDay()];
$date.textContent = today.toString().slice(4, 15);

// 할 일 추가
const $form = document.querySelector('.todo__form');
const $todo_input = document.querySelector('.form__input');
const $label = document.querySelector('.form__label');
const $ul = document.querySelector('.todo__todos-list');

const $allDone = document.getElementById('complete-all');
const $clear_done_btn = document.querySelector('.clear-complete__btn');
const $completed_todos = document.querySelector('.btn__completed-todos')
const $remain_todos = document.querySelector('.todo__remain-todos')

const $btn_list = document.querySelector('.todos-btn__list');

let todos = [];
let btnState = 'all';

const render = () => {
  const _todos = todos.filter(({ completed }) => (btnState === 'all' ? true : btnState === 'active' ? !completed : completed));

  $ul.innerHTML = _todos.map(({ id, content, completed }) => 
    `<li id="${id}">
      <input id="ck-${id}" type="checkbox" ${completed ? "checked" : ''} />
      <label class=${completed ? "checked" : ''} for="ck-${id}">${content}</label>
      <button>x</button>
    </li>`
  ).join('');

  const countCompleted = todos.filter(todo => todo.completed).length;
  const countLeft = todos.filter(todo => !todo.completed).length;

  $completed_todos.textContent = countCompleted;
  $remain_todos.textContent = countLeft;
};

const fetchTodos = () => {
  // TODO: 서버로부터 todos 데이터를 취득(잠정처리)
  // todos = [
  //   { id: 1, content: 'HTML', completed: true },
  //   { id: 2, content: 'CSS', completed: false },
  //   { id: 3, content: 'JS', completed: true },
  // ];

  todos = [...todos].sort((todo1, todo2) => todo2.id - todo1.id);
  render();
};

const addTodo = (() => {
  const generateId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;
  
  return content => {
    todos = [{ id: generateId(), content, completed: false }, ...todos];
    render();
  }
})();

const removeTodo = id => {
  todos = todos.filter(todo => todo.id !== id);
  render();
};

const toggleTodo = id => {
  todos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed } : todo);
  render();
};

const toggleComplete = () => {
  todos = todos.map(todo => ({ ...todo, completed: $allDone.checked }));
  render();
};

const removeCompletedAll = () => {
  todos = todos.filter(todo => !todo.completed);
  render();
}

const changeBtn = id => {
  [...$btn_list.children].forEach($item => {
    $item.classList.toggle('active', $item.id === id);
  });

  btnState = id;
  render();
}

// 이벤트
document.addEventListener('DOMContentLoaded', fetchTodos);

$form.onsubmit = e => {
  e.preventDefault();
  const content = $todo_input.value;
  if (!content) return;
  addTodo(content);

  $todo_input.value = '';
  $todo_input.focus();
}

$ul.onclick = e => {
  if (!e.target.matches('.todo__todos-list > li > button')) return;
  removeTodo(+e.target.parentNode.id);
};

$ul.onchange = e => {
  if(!e.target.matches('.todo__todos-list > li > input[type=checkbox]')) return;
  toggleTodo(+e.target.parentNode.id);
}

$allDone.onchange = toggleComplete;

$clear_done_btn.onclick = () => {
  removeCompletedAll();
}

$btn_list.onclick = ({ target }) => {
  // if (target.classList.contains('todos-btn__list')) return;
  if (target === $btn_list) return;
  changeBtn(target.parentNode.id);

  // $btn_list.querySelector('.active').classList.remove('active');
  // target.parentNode.classList.add('active');
};

// label 이벤트
$todo_input.onfocus = () => {
  $label.textContent = '';
};

$todo_input.onblur = () => {
  if ($todo_input.value) return;
  $label.textContent = 'Add a task...';
};