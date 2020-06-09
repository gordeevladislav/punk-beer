import React, { Component } from 'react'
import classes from './Pagination.css'
import Button from '../Button/Button'
import { connect } from 'react-redux'

class Pagination extends Component {
  render() {
    return (
      this.props.beerList.length >= this.props.perPage
        ? <div className={classes.Pagination}>
            <Button
              type='button'
              onClick={this.props.prevPage}
              classes={classes.Button}
            >Back</Button>
            <Button
              type='button'
              onClick={this.props.nextPage}
              classes={classes.Pagination}
            >Next</Button>
          </div>
        : null
    )
  }
}

function mapStateToProps(state) {
  return {
    beerList: state.beer.beerList,
    perPage: state.beer.controls.navigation.per_page
  }
}

export default connect(mapStateToProps)(Pagination)