import { ChangeEvent, FC, FormEvent, useState } from 'react'
import './Form.css'
import { useAppDispatch } from '../../hooks/redux'
import { todoCreate } from '../../store/reducers/todos/todosSlice'

type PropsType = {
  type: string
  handleSetSearchQuery?: (arg: string) => void
  handleSetFilter?: (arg: 'date' | 'name' | 'importance') => void
  activeFilter?: 'date' | 'name' | 'importance'
}

const Form: FC<PropsType> = ({ type, handleSetSearchQuery, handleSetFilter, activeFilter }) => {

  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleCreateTodo = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue?.trim()) {
      const newTodo = {
        title: inputValue,
        id: Date.now(),
        createdAt: Date.now(),
        isDone: false
      }
      dispatch(todoCreate(newTodo))
      setInputValue('')
    } else {
      alert('Поле не может быть пустым')
    }
  }

  const handleSearchQuerySubmit = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue && handleSetSearchQuery) handleSetSearchQuery(inputValue)
  }

  const handleFormSubmit = type == 'create' ? handleCreateTodo : handleSearchQuerySubmit

  return (
    <form onSubmit={handleFormSubmit} className='form'>
      {
        type == 'filter' ?
          <select
            value={activeFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSetFilter && handleSetFilter(e.target.value as 'date' | 'name' | 'importance')}
            name='filter'
            className='form__select'
          >
            <option className='form__option' value='date'>По дате</option>
            <option className='form__option' value='name'>По имени</option>
            <option className='form__option' value='importance'>По важности</option>
          </select>
          :
          <>
            <input
              value={inputValue || ''}
              onChange={handleChange}
              type='text'
              className='form__input'
            />
            <button
              type='submit'
              className={`form__button ${type === 'search' ? 'form__button_type_search' : 'form__button_type_create'}`}>
            </button>
          </>
      }

    </form>
  )
}

export default Form