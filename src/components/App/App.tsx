import './App.css'
import Todo from '../Todo/Todo'
import Form from '../Form/Form'
import { useAppSelector } from '../../hooks/redux'
import { useEffect, useState } from 'react'
import { TodoType } from '../../store/reducers/todos/todosSlice'

function App() {

  const todos = useAppSelector((state) => state.todos.todos)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'date' | 'name' | 'importance'>('date')
  const [todosForRender, setTodosForRender] = useState<TodoType[] | []>(todos)

  const handleFilterTodos = (todosArr: TodoType[] | []) => {
    if(activeFilter == 'date' && todosArr.length > 1) {
      return [...todosArr].sort((a, b) => a.createdAt - b.createdAt)
    } else if(activeFilter == 'name' && todosArr.length > 1) {
      return [...todosArr].sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
    } else if(activeFilter == 'importance' && todosArr.length > 1) {
      return [...todosArr.filter(todo => todo.isDone), ...todosArr.filter(todo => !todo.isDone)]
    } else {
      return todosArr
    }
  }

  useEffect(() => {
    const filteredTodos = handleFilterTodos(todos)
    .filter(todo => todo.title.includes(searchQuery))
    setTodosForRender(filteredTodos)
  }, [todos, searchQuery, activeFilter])

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query)
  }

  const handleSetFilter = (filter: 'date' | 'name' | 'importance') => {
    setActiveFilter(filter)
  }

  return (
    <div className='page'>
      <main className='main'>
        <Form
          type='search'
          handleSetSearchQuery={handleSetSearchQuery}
        />
        <Form
          type='create'
        />
        <Form
          type='filter'
          handleSetFilter={handleSetFilter}
          activeFilter={activeFilter}
        />
        <ul className='todos'>
          {
            [...todosForRender].reverse().map((todo) => {
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
