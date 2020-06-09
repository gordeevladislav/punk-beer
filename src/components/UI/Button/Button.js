import React from 'react'

const Button = props => {
  const cls = []

  if (props.type) {
    cls.push(props.type)
  }

  return (
    <button
      className={cls}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button