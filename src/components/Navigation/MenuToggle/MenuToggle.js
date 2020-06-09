import React from 'react'
import classes from './MenuToggle.css'

const MenuToggle = props => {
  const cls = [
    classes.MenuToggle,
    'fa'
  ]

  if (props.isOpen) {
    cls.push("fa-times")
  } else {
    cls.push("fa-bars")
  }

  return (
    <button
      className={cls.join(" ")}
      onClick={props.onClick()}
    />
  )
}

export default MenuToggle