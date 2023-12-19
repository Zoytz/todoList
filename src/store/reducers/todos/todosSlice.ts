import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TodoType = {
  id: number
  title: string
  createdAt: number
  isDone: boolean
}

type InitialStateType = {
  todos: TodoType[] | []
}

const initialState: InitialStateType = {
  todos: [],
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoCreate: (state, action: PayloadAction<TodoType>) => {
      state.todos = [...state.todos, action.payload]
    },
    todoEdit: (state, action: PayloadAction<TodoType>) => {
      state.todos = state.todos.map((todo) => todo.id == action.payload.id ? action.payload : todo)
    },
    todoDelete: (state, action: PayloadAction<number>) => {
      state.todos = state.todos?.filter((todo) => todo.id !== action.payload)
    },
  },
})

export const { 
  todoCreate, 
  todoEdit, 
  todoDelete } = todosSlice.actions

export default todosSlice.reducer