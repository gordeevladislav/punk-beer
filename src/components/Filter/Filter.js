import React from 'react'
import classes from './Filter.css'
import Input from '../UI/Input/Input'

const Filter = props => {
  return (
    <div className={classes.Filter}>

      {
        Object.keys(props.filters).map(filterName => {
          const filter = props.filters[filterName]
          return (
            <Input
              key={filter.id}
              id={filterName}
              type={filter.type}
              label={filter.label}
              placeholder={filter.placeholder}
              onChange={props.onChange}
              valid={filter.valid}
              shouldValidate={!!filter.validation}
              touched={filter.touched}
              errorMessage={filter.errorMessage}
            />
          )
        })
      }
    </div>
  )
}

export default Filter