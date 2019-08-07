import React, { useState, useCallback } from 'react'
import './App.css'
import TodoList from './TodoList.js'

function App ({initialCount}) {
  const [clicked, setClicked] = useState(initialCount || 0)

  const handleClick = useCallback(() => {
    setClicked(x => x + 1)
  }, [])

  return (
    <div className="App">
      <div className="App-button">
        <div>{`Button has been clicked ${clicked} time${clicked === 1 ? '' : 's'}`}</div>
        <button onClick={handleClick}>+1</button>
      </div>
      <TodoList />
    </div>
  )
}

export default App
