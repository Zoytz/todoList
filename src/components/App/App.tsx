import './App.css'
import Todo from '../Todo/Todo'
import Form from '../Form/Form'
import { useAppSelector } from '../../hooks/redux'
import { useState } from 'react'

function App() {

  const todos = useAppSelector((state) => state.todos.todos)
  const [searchQuery, setSearchQuery] = useState<string>();
  const [activeFilter, setActiveFilter] = useState<'date' | 'name' | 'importance'>('date')

  return (
    <div className='page'>
      <main className='main'>
        <Form type='search' />
        <Form type='create' />
        <Form type='filter' />
        <ul className='todos'>
          {
            todos.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                />
              )
            })
          }
        </ul>
      </main>
    </div>
  )
}

export default App
