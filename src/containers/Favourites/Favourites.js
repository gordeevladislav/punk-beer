import React, {Component} from "react"
import BeerItem from "../../components/BeerItem/BeerItem"
import {connect} from 'react-redux'
import { onFavouriteToggle } from '../../store/actions/favourite'
import classes from './Favourites.css'

class Favourites extends Component {
  // componentDidMount() {
  //   this.props.fetchFavouriteList()
  // }

  render() {
    return (
      this.props.favouriteList.length
      ? <ul className={classes.Favourites}>
          {
            this.props.favouriteList.map((favItem, index) => {
              return (
                <BeerItem
                  item={favItem}
                  key={favItem.id + 'fav'}
                  onClick={item => this.props.onFavouriteToggle(item)}
                />
              )
            })
          }
        </ul>
      : <h1 className={classes.Plug}>Add beer to favourite</h1>
    )
  }
}

export function mapStateToProps(state) {
  return {
    favouriteList: state.favourite.favouriteBeer
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    // fetchFavouriteList: () => dispatch(fetchFavouriteBeer()),
    onFavouriteToggle: item => dispatch(onFavouriteToggle(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)