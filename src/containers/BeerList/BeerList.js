import React, { Component } from 'react'
import classes from './BeerList.css'
import BeerItem from '../../components/BeerItem/BeerItem'
import { connect } from 'react-redux'
import { onFavouriteToggle } from '../../store/actions/favourite'


class BeerList extends Component {
  render() {
    return (
      this.props.list.length
        ? <ul className={classes.BeerList}>
            { this.props.list.map((beer) => {
              return (
                <BeerItem
                  item={beer}
                  key={beer.id}
                  onClick={item => this.props.onFavouriteToggle(item)}
                />
              )}
            )}
          </ul>
        : <h1 className={classes.Plug}>There is no such beer</h1>
    )
  }
}

function dispatchStateToProps(dispatch) {
  return {
    onFavouriteToggle: item => dispatch(onFavouriteToggle(item))
  }
}

export default connect(null, dispatchStateToProps)(BeerList)
