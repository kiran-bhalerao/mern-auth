import { ADD_USER, CLEAR_USER } from './types'
export const addUser = user => {
  return { type: ADD_USER, payload: user }
}

export const clearUser = () => {
  return { type: CLEAR_USER }
}
