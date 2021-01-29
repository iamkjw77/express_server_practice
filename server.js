// require는 import와 같은 의미
// express는 node_modules 안에 존재하는데, path를 적어줄 필요없이 express만 적어도 알아서 찾아온다.
// 우리가 만든 모듈은 path를 적어주어야 한다.

// const express = require('express');
// const cors = require('cors');

import express from 'express';
import cors from 'cors';

import isEmptyObject from './utils/isEmptyObject.js';
import isDuplicatedId from './utils/isDuplicatedId.js';

// 기본적으로 import 하면 let으로 선언했어도, const이다.(read only이다.)
// 바꿀수 없다. 바꾸는 경우 모듈로 빼면 안된다.
let todos = [
  { id: 3, content: 'JS', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

// express는 함수이다.
const app = express();

// 우리가 설정한 cors를 사용하겠다.
app.use(cors());

// 루트 디렉토리 설정(public을 자동으로 찾아가도록 설정)
app.use(express.static('public'))

// json으로 이루어진 Request body 파싱을 위해 설정
app.use(express.json());

// app.get, app.post, app.patch, app.delete 등을 라우터라고 한다.

// 클라이언트가 todos URL을 get 방식으로 요청하면 콜백함수를 호출하겠다.
// 콜백함수의 인수로 req, res를 꼭 써주어야 한다.
// req에는 클라이언트가 요청한 정보, res에는 response 처리한 정보를 넣어준다.
app.get('/todos', (req, res) => {
  // send 안에서 알아서 JSON.stringify해서 보내준다.
  res.send(todos);
});

// 하나의 데이터를 요청했을 때는 :id를 붙여준다.
// :id는 변수의 의미
// :id는 요청한 정보에 포함되어 있어서, req에 params에 들어있다.
app.get('/todos/:id', (req, res) => {
  res.send(todos.filter(todo => todo.id === +req.params.id));
});

// payload는 req.body에 있다.
app.post('/todos', (req, res) => {
  // payload가 없으면 req.body는 {}(빈 객체)
  const newTodo = req.body;
  
  // 페이로드가 없는 경우
  if (isEmptyObject(newTodo)) {
    // .status(번호)를 통해 에러번호를 보낼 수 있다.
    return res.status(400).send({
      error: true, 
      reason: 'Payload does not exist.'
    });
  }
  
  // id가 중복된 경우
  if (isDuplicatedId(todos, newTodo.id)) {
    return res.status(400).send({
      error: true,
      reason: `${newTodo.id} is a duplicate ID.`
    });
  }
  
  // 데이터가 변경, 추가되면 전체 데이터를 보내자
  todos = [newTodo, ...todos];
  res.send(todos);
});

// payload를 못받으면 무시함(아무 값도 보내지 않음)
// 만약, DB를 쓴다면 DB서버에서 에러를 보내줌
app.patch('/todos/:id', (req, res) => {
  // id는 문자열이다.(랜선을 타고오는 것은 기본적으로 다 문자열)
  const id = +req.params.id;
  const completed = req.body;

  todos = todos.map(todo => (todo.id === id ? { ...todo, ...completed } : todo));
  res.send(todos);
})

// /todos 전체 completed 값을 다 바꾸는 작업
// 모든 것을 다 바꾸는 작업은 주의하자!(잘못하면 테이블 전체가 바뀜)
app.patch('/todos', (req, res) => {
  const completed = req.body;
  todos = todos.map(todo => ({...todo, ...completed}));
  res.send(todos);
});

// /todos/:id로 써주면 Clear completed 버튼을 위한 코드를 아래 코드보다 위에 위치시켜야 한다.
// id가 없는 값을 삭제하면 무시(아무 값도 보내지 않음)
app.delete(/\/todos\/(\d+)$/, (req, res) => {
  const id = +req.params[0];
  if (!todos.find(todo => todo.id === id)) {
    res.send({
      error: true,
      message: 'ID does not exist.'
    });
  }
  todos = todos.filter(todo => todo.id !== id);
  res.send(todos);
});

// Clear completed 버튼
// 모든 것을 다 삭제하는 경우는 주의하자!(잘못하면 DB 테이블 전체가 날아감)
// completed을 써주면 id로 인식할 수도 있기때문에 위에 :id{정규표현식}을 써준다.
app.delete('/todos/completed', (req, res) => {
  todos = todos.filter(todo => !todo.completed);
  res.send(todos);
});

// listen은 서버를 기동시킴
// 7070은 port 번호
// 서버가 정상적으로 작동하면 2번째 콜백함수가 호출됨
app.listen('7070', () => {
  console.log('Server is listening on http://localhost:7070');
});