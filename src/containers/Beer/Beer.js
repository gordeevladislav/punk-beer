import React, { Component } from 'react'
import classes from './Beer.css'
import Filter from '../../components/Filter/Filter'
import BeerList from '../BeerList/BeerList'
import Pagination from '../../components/UI/Pagination/Pagination'
import { connect } from 'react-redux'
import { toNextPage, toPrevPage, fetchBeerList, filterChangeHandler } from '../../store/actions/beer'
import { fetchFavouriteBeer } from '../../store/actions/favourite'

class Beer extends Component {
  isLogin() {
    return this.props.token === null ? false : true
  }

  componentDidUpdate(prevProps) {
    if (this.props.controls !== prevProps.controls) {
      this.props.fetchBeerList()
    }
    if (this.props.token !== prevProps.token) {
      this.props.fetchFavouriteBeer()
    }
  }

  componentDidMount() {
    this.props.fetchBeerList()
  }

  render() {
    return (
      <div className={classes.Beer}>
        <Filter
          filters={this.props.filters}
          onChange={e => this.props.filterChangeHandler(e)}
        />

        <BeerList
          list={this.props.beerList}
        />

        <Pagination
          pages={this.props.pages}
          nextPage={() => this.props.toNextPage()}
          prevPage={() => this.props.toPrevPage()}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    beerList: state.beer.beerList,
    controls: state.beer.controls,
    navigation: state.beer.controls.navigation,
    filters: state.beer.controls.filters,
    token: state.auth.token
  }
}

function dispatchStateToProps(dispatch) {
  return {
    toNextPage: () => dispatch(toNextPage()),
    toPrevPage: () => dispatch(toPrevPage()),
    fetchBeerList: () => dispatch(fetchBeerList()),
    filterChangeHandler: e => dispatch(filterChangeHandler(e)),
    fetchFavouriteBeer: () => dispatch(fetchFavouriteBeer())
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(Beer)