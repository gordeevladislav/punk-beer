import React, { Component } from 'react'
import classes from './Header.css'
import Logo from '../UI/Logo/Logo'
import NavigationList from '../Navigation/NavigationList/NavigationList'

class Header extends Component {
  render() {

    const links = [
      {to: "/", label: "Home"},
    ]

    if (this.props.isAuthenticated) {
      links.push({to: "/favourites", label: "Favourites"})
      links.push({to: "/logout", label: "Log out"})
    } else {
      links.push({to: "/auth", label: "Log in"})
    }

    return (
      <header className={classes.Header}>
        <Logo />
        <NavigationList
          links={links}
        />
      </header>
    )
  }
}

export default Header