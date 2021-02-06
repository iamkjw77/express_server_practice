// 비순수 함수(todos에 의존하고 있다.)
// 비순수 함수가 되면 테스트가 어려워진다.
// const isDuplicatedId = id => todos.map(todo => todo.id).includes(id);

const isDuplicatedId = (arr, id) => arr.map(item => item.id).includes(id);

export default isDuplicatedId;