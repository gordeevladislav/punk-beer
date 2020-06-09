import React from 'react'
import classes from './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const inputType = props.type || 'text'
  const cls = [classes.Input]

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={inputType}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      ></input>
      { isInvalid(props)
        ? <span>{ props.errorMessage || 'Введите верное значение' }</span>
        : null
      }
    </div>
  )
}

export default Input
