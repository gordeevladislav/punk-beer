import axios from 'axios'
import {
  REMOVE_FAVOURITE_BEER,
  ADD_FAVOURITE_BEER,
  RESET_FAVOURITE_LIST,
  SET_FAVOURITE_LIST
} from './actionTypes'

export function onFavouriteToggle(favouriteItem) {
  return (dispatch, getState) => {
    const favouriteBeer = getState().favourite.favouriteBeer

    if (!favouriteBeer.length) {
      dispatch(addFavouriteBeer(favouriteItem))
      return
    }

    const isOnState = favouriteBeer.reduce((acc, beer) => (
      beer.id === favouriteItem.id ? acc + 1 : acc
    ), 0)

    if (isOnState) {
      dispatch(removeFavouriteBeer(favouriteItem))
    } else {
      dispatch(addFavouriteBeer(favouriteItem))
    }
    dispatch(saveFavouriteBeer())
  }
}

export function addFavouriteBeer(favouriteItem) {
  return {
    type: ADD_FAVOURITE_BEER,
    favouriteItem
  }
}

export function removeFavouriteBeer(favouriteItem) {
  return {
    type: REMOVE_FAVOURITE_BEER,
    favouriteItem
  }
}

export function saveFavouriteBeer() {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem('userId')

    const response = await axios.get('https://punk-beer-d3ab6.firebaseio.com/favouriteBeer.json')
    const favouriteLists = response.data

    if (response.data !== null) {
      Object.entries(favouriteLists).forEach(([ key, list ]) => {
          const listId = Object.keys(list)[0]

          if (listId === userId) {
            axios.delete(`https://punk-beer-d3ab6.firebaseio.com/favouriteBeer/${key}.json`)
          }
        })
    }

    const favouriteBeer = getState().favourite.favouriteBeer
    let data = {[userId]: []}

    if (favouriteBeer.length) {
      data = {[userId]: favouriteBeer}
    }
    await axios.post('https://punk-beer-d3ab6.firebaseio.com/favouriteBeer.json', data)

    // dispatch(resetFavouriteList())
  }
}

export function resetFavouriteList() {
  return {
    type: RESET_FAVOURITE_LIST
  }
}

export function fetchFavouriteBeer() {
  return async dispatch => {
    const userId = localStorage.getItem('userId')

    const response = await axios.get('https://punk-beer-d3ab6.firebaseio.com/favouriteBeer.json')
    const favouriteLists = response.data

    if (favouriteLists !== null) {
      Object.values(favouriteLists).forEach(list => {
        Object.keys(list).map(listId => {
          if (listId === userId) {
            dispatch(
              setFavouriteList( list[listId] )
            )
          }
        })
      })
    }
  }
}

export function setFavouriteList(favouriteBeer) {
  return {
    type: SET_FAVOURITE_LIST,
    favouriteBeer
  }
}