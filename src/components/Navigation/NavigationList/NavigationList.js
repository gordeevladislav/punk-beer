import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavigationList.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import MenuToggle from '../MenuToggle/MenuToggle'

class NavigationList extends Component {
  state = {
    menu: false,
  }

  menuToggleHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }


  render() {
    const cls = [
      classes.NavigationList
    ]

    if (!this.state.menu) {
      cls.push(classes.close)
    }

    return (
      <Auxiliary>
        <ul className={cls.join(" ")}>
          {
            this.props.links.map((link, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={link.to}
                  >{link.label}</NavLink>
                </li>
              )
            })
          }
        </ul>
        <MenuToggle
          onClick={() => this.menuToggleHandler}
          isOpen={this.state.menu}
        />
      </Auxiliary>
    )
  }
}

export default NavigationList

