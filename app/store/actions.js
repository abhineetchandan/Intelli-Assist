// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_TASK = 'UPDATE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const CHANGE_SHOW = 'CHANGE_SHOW'
export const ADD_NOTE = 'ADD_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
export const FIRST_OPENED = 'FIRST_OPENED'
export const REMOVE_USER = 'REMOVE_USER'


// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const firstopened = update => ({
  type: FIRST_OPENED,
  payload: update
})

export const updateTask = update => {
  return ({
  type: UPDATE_TASK,
  payload: update,
})}

export const addTask = newTask => ({
  type: ADD_TASK,
  payload: newTask,
})

export const deleteTask = id => ({ 
  type: DELETE_TASK,
  payload: id 
})

export const addNote = params => ({
  type: ADD_NOTE,
  payload: params
})

export const updateNote = params => ({
  type: UPDATE_NOTE,
  paload: params,
})

export const deleteNote = id => ({
  type: DELETE_NOTE,
  payload: id
})

export const removeUser = bool => ({
  type: REMOVE_USER,
  payload: bool
})
