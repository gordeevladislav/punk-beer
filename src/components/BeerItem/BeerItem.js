import React, { Component } from 'react'
import classes from './BeerItem.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import { connect } from 'react-redux'

class BeerItem extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.favouriteBeerList !== prevProps.favouriteBeerList) {
      this.render()
    }
  }

  starClasses = []

  isFavourite = () => {
    return (
      this.props.favouriteBeerList.reduce((acc, favItem) => {
        return favItem.id === this.props.item.id
          ? acc + 1
          : acc
      }, 0)
    )
  }

  render() {
    this.isFavourite()
      ? this.starClasses = [classes.StarButton, "fa-star", "fa"]
      : this.starClasses = [classes.StarButton, "fa-star", "far"]

      const favouriteButton = (
        <button
          className={this.starClasses.join(" ")}
          onClick={() => this.props.onClick(this.props.item)}
        />
      )

    const {
      name, image_url, image_alt,
      description, id, tagline,
      abv, srm, ibu
    } = this.props.item;

    if (window.location.pathname === "/favourites") {
      return (
        <li className={classes.BeerItemWrapper__Favourite}>
          <h2>{name}</h2>
          {
            image_url
              ? <img src={image_url} alt={image_alt} />
              : <div>No image</div>
          }
          <p>{description}</p>
          <div className={classes.ButtonWrapper}>
            <NavLink to={"/beer/" + id}>More</NavLink>
            <button
              type="button"
              onClick={() => this.props.onClick(this.props.item)}
            >
              Remove</button>
          </div>
        </li>
      )
    } else {
      return (
        <li className={classes.BeerItemWrapper}>
          <NavLink to={"/beer/" + id} className={classes.BeerItem}>
            {
              image_url
                ? <img src={image_url} alt={image_alt} />
                : <div className={classes.ImagePlug}>No image</div>
            }
            <div>
              <h2>{name}</h2>
              <p>{tagline}</p>
              <div className={classes.Table}>
                <div>
                  <p>ABV</p>
                  { abv
                    ? <p>{abv}%</p>
                    : <p>–</p>
                  }
                </div>
                <div>
                  <p>SRM</p>
                  { srm
                    ? <p>{srm}</p>
                    : <p>–</p>
                  }
                </div>
                <div>
                  <p>IBU</p>
                  { ibu
                    ? <p>{ibu}</p>
                    : <p>–</p>
                  }
                </div>
              </div>
            </div>
          </NavLink>
          { this.props.token !== null ? favouriteButton : null }
        </li>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    favouriteBeerList: state.favourite.favouriteBeer,
    token: state.auth.token
  }
}

export default connect(mapStateToProps)(BeerItem)