import { createFilterControl } from '../../input/inputFramework'
import {
  TO_NEXT_PAGE,
  TO_PREVIOUS_PAGE,
  BEER_LIST_SET_STATE,
  CONTROLS_SET_STATE,
  SET_ACTIVE_BEER
} from '../actions/actionTypes'

export const initialState = {
  beerList: [],
  controls: {
    navigation: {
      page: 1,
      per_page: 28,
    },
    filters: {
      beerName: createFilterControl('beer_name', 35, 'Beer name', false),
      minABV: createFilterControl('abv_gt', 123, 'Min ABV', { typeNumber: true }),
      maxABV: createFilterControl('abv_lt', 91, 'Max ABV', { typeNumber: true }),
      maxIBU: createFilterControl('ibu_lt', 892,  'Min IBU', { typeNumber: true }),
      minIBU: createFilterControl('ibu_gt', 87, 'Max IBU', { typeNumber: true }),
    },
  },
  activeBeer: {},
  loading: true
}

export default function beerReducer(state = initialState, action) {
  switch (action.type) {
    case TO_NEXT_PAGE:
      return {
        ...state, controls: {...state.controls, navigation: {...state.controls.navigation, page: state.controls.navigation.page + 1}}
      }
    case TO_PREVIOUS_PAGE:
      return {
        ...state, controls: {...state.controls, navigation: {...state.controls.navigation, page: state.controls.navigation.page - 1}}
      }
    case BEER_LIST_SET_STATE:
      return {
        ...state, beerList: action.beerList
      }
    case CONTROLS_SET_STATE:
      return {
        ...state, controls: action.controls
      }
    case SET_ACTIVE_BEER:
      return {
        ...state, activeBeer: action.beer, loading: false
      }
    default:
      return state
  }
}