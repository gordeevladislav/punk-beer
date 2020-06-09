import React from 'react';
import classes from './Logo.css'

const Logo = props => {
  return (
    <a
      className={classes.Logo}
      href="/"
      aria-label="Beer Punk Logo"
    >
      Punk Beer
    </a>
  )
}

export default Logo