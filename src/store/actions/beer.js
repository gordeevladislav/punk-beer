import { controlValidate } from '../../input/inputFramework'
import {
  TO_NEXT_PAGE,
  TO_PREVIOUS_PAGE,
  BEER_LIST_SET_STATE,
  CONTROLS_SET_STATE,
  SET_ACTIVE_BEER
} from './actionTypes'

import axios from '../../axios/axios-beer'

export function toNextPage() {
  return {
    type: TO_NEXT_PAGE
  }
}

export function toPrevPage() {
  return (dispatch, getState) => {
    const page = getState().beer.controls.navigation.page
    if (page > 1) {
      dispatch(prevPage())
    }
  }
}

export function prevPage() {
  return {
    type: TO_PREVIOUS_PAGE
  }
}

function getURL(state) {
  const filterParameters = []
  Object.values(state.controls.filters)
    .map(control => {
      if (control.valid) {
        filterParameters.push(Object.values(control))
      }
    })

  const navigationParameters = Object.entries(state.controls.navigation)

  const filterURL = filterParameters
    .reduce((url, [parameterName, value]) => {
      return value ? `${url}&${parameterName}=${value}` : url
    }, "?")

  return navigationParameters
    .reduce((url, [parameterName, value]) => {
      return `${url}&${parameterName}=${value}`
    }, filterURL)
}

export function fetchBeerList() {
  return async (dispatch, getState) => {
    const url = getURL(getState().beer)

    const response = await axios.get(url)

    dispatch(beerListSetState(response.data))
  }
}

export function beerListSetState(beerList) {
  return {
    type: BEER_LIST_SET_STATE,
    beerList
  }
}

export function filterChangeHandler(e) {
  return (dispatch, getState) => {
    const filters = getState().beer.controls.filters
    const control = filters[e.target.id]

    control.value = e.target.value
    control.value === ''
      ? control.touched = false
      : control.touched = true
    control.valid = controlValidate(control.value, control.validation)

    filters[e.target.id] = control
    dispatch(filterSetState({
      filters,
      navigation: {
        page: 1,
        per_page: 27,
      }
    }))
  }
}

export function filterSetState(controls) {
  return {
    type: CONTROLS_SET_STATE,
    controls
  }
}

export function fetchActiveBeer(id) {
  return async (dispatch) => {
    const response = await axios.get(`/${id}`)
    const beer = response.data[0]

    dispatch(setActiveBeer(beer))
  }
}

export function setActiveBeer(beer) {
  return {
    type: SET_ACTIVE_BEER,
    beer
  }
}