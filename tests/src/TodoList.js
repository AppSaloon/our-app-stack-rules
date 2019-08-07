import React, { useState, useRef } from 'react'
import './TodoList.css'

let counter = 0
function getId () {
  return counter++
}

function TodoList ({initialTodos = []}) {
  if ( !Array.isArray(initialTodos) )
    throw new TypeError(`Expected todos to be an array, but is was ${Object.prototype.toString.apply(initialTodos).slice(8, -1)}`)

  const [todos, setTodos] = useState(initialTodos)
  const inputRef = useRef()

  function addTodo (e) {
    e.preventDefault()
    const todo = {
      text: inputRef.current.value,
      id: getId()
    }
    setTodos([...todos, todo])
  }

  function removeTodo (id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function toggleTodo (id) {
    setTodos(todos.map(todo => {
      if ( todo.id === id )
        return {
          ...todo,
          finished: !todo.finished
        }
      return todo
    }))
  }

  function clearTodos () {
    setTodos([])
  }

  return (
    <div className="TodoList">
      <div className="TodoList-head">
        <form onSubmit={addTodo}>
          <label htmlFor="todo-input">New todo:</label>
          <input id="todo-input" type="text" ref={inputRef} />
          <button type="submit">Add</button>
        </form>
        <button onClick={clearTodos}>Clear</button>
      </div>
      <ul title="Todos">
        {
          todos.map(todo =>
            <Todo key={todo.id} todo={todo} deleteMe={() => removeTodo(todo.id)} toggleMe={() => toggleTodo(todo.id)} />
          )
        }
      </ul>
    </div>
  )
}

function Todo ({todo, deleteMe, toggleMe}) {
  return <li className="Todo">
    <input title="Toggle todo" type="checkbox" checked={todo.finished || false} onChange={toggleMe} />
    <p className={todo.finished ? 'finished' : ''}>{todo.text}</p>
    <button title="Delete todo" onClick={deleteMe} >X</button>
  </li>
}

export default TodoList
