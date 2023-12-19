import './Todo.css'
import { TodoType, todoDelete, todoEdit } from '../../store/reducers/todos/todosSlice'
import { ChangeEvent, FC, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'

type PropsType = {
  todo: TodoType
}

const Todo: FC<PropsType> = ({ todo }) => {

  const dispatch = useAppDispatch()

  const { title, isDone, id } = todo

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>()

  const handleDeleteTodo = () => {
    dispatch(todoDelete(id))
  }

  const handleCompleteTodo = () => {
    const updatedTodo = { ...todo, isDone: true }
    dispatch(todoEdit(updatedTodo))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleStartEditingTodo = () => {
    setIsEditing(true)
  }

  const handleEditTodo = () => {
    if (inputValue?.trim()) {
      const updatedTodo = { ...todo, title: inputValue }
      dispatch(todoEdit(updatedTodo))
      setIsEditing(false)
      setInputValue('')
    } else {
      alert('Заголовок не может быть пустым')
    }
  }

  return (
    <li className='todo'>
      <p className='todo__status'>{isDone ? 'Выполнено' : 'Не выполнено'}</p>
      <div className='todo__content'>
        {
          isEditing ?
            <input
              value={inputValue || ''}
              onChange={handleChange}
              type='text'
              className='todo__input' />
            :
            <h3 className='todo__title'>{title}</h3>
        }
        { 
          isDone ? 
          null :
          isEditing ?
            <button
              className='todo__save-button todo__button'
              onClick={handleEditTodo}
            ></button>
            :
            <button
              className='todo__edit-button todo__button'
              onClick={handleStartEditingTodo}
            ></button>
        }
        <button
          onClick={handleDeleteTodo}
          className='todo__delete-button todo__button'
        ></button>
        {
          isDone ?
            null :
            <button
              onClick={handleCompleteTodo}
              className='todo__done-button todo__button'
            ></button>
        }
      </div>
    </li>
  )
}

export default Todo