import { ADD_USER, CLEAR_USER } from '../actions/types'
import fromStore from '../utils/fromStore'

const INITAIL_STATE = {
  ...JSON.parse(fromStore('mern_auth_user'))
}

export default (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...action.payload }
    case CLEAR_USER:
      return { ...JSON.parse(fromStore('mern_auth_user')) }
    default:
      return state
  }
}
