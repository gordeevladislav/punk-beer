import React, { Component } from 'react'
import classes from './ActiveBeer.css'
import Loader from '../UI/Loader/Loader'
import BeerPropsTable from '../BeerPropsTable/BeerPropsTable'
import { connect } from 'react-redux'
import { fetchActiveBeer } from '../../store/actions/beer'

class ActiveBeer extends Component {
  componentDidMount() {
    this.props.fetchActiveBeer(this.props.match.params.id)
  }

  render () {
    const beer = this.props.beer
    const beerPropsName = ["abv", "ibu", "ebc", "srm"]

    return (
      this.props.loading
      ? <Loader />
      : <div className={classes.ActiveBeer}>
          <img src={beer.image_url} alt={beer.name} />
          <div>
            <h1>{beer.name}</h1>
            <p className={classes.Tagline}>{beer.tagline}</p>
            <p>First brewed: {beer.first_brewed}</p>
            <div>
              <h2>Description: </h2>
              {beer.description}
            </div>
            <BeerPropsTable
              beer={beer}
              beerProps={beerPropsName}
            />
            <h2>You can drink this beer with:</h2>
            <ul>
              {
              beer.food_pairing.map((pair, index) => {
                return (
                <li
                  key={index}
                >{pair}</li>
                )
              })
              }
            </ul>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    beer: state.beer.activeBeer,
    loading: state.beer.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchActiveBeer: id => dispatch(fetchActiveBeer(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ActiveBeer)