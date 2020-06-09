import {
  REMOVE_FAVOURITE_BEER,
  ADD_FAVOURITE_BEER,
  RESET_FAVOURITE_LIST,
  SET_FAVOURITE_LIST
} from '../actions/actionTypes'

const initialState = {
  favouriteBeer: []
}

export default function favouriteReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_FAVOURITE_BEER:
      return {
        ...state, favouriteBeer: [...state.favouriteBeer.filter(beer => beer.id !== action.favouriteItem.id)]
      }
    case ADD_FAVOURITE_BEER:
      return {
        ...state, favouriteBeer: [...state.favouriteBeer, action.favouriteItem]
      }
    case SET_FAVOURITE_LIST:
      return {
        ...state, favouriteBeer: action.favouriteBeer
      }
    case RESET_FAVOURITE_LIST:
      return {
        ...state, favouriteBeer: []
      }
    default:
      return state
  }
}
