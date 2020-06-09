import { AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT } from "../actions/actionTypes"

const initialState = {
  token: null,
  error: {
    value: false,
    message: ''
  }
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, token: action.token, error: { value: false, message: '' }
      }
    case AUTH_ERROR:
      return {
        ...state, error: {...state.error, value: true, message: action.message}
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null
      }
    default:
      return state
  }
}