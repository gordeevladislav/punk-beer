import React from 'react'
import classes from './BeerPropsTable.css'
// import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

const BeerPropsTable = props => {

  // const tdGenerator = (propArray, value) => {
  //   return (
  //     propArray.map((name, index) => {
  //       return (

  //       )
  //     })
  //   )
  // }

  return (
    <table className={classes.BeerPropsTable}>
      <tbody>
          <tr>
            {
              props.beerProps.map((propName, index) => {
                return (
                  <td
                    key={index}
                    className={classes.BeerPropTitle}
                  >{ propName }
                  </td>
                )
              })
            }
          </tr>
          <tr>
            {
              props.beerProps.map((propName, index) => {
                return (
                  <td
                    key={index}
                    className={classes.BeerPropValue}
                  >{ props.beer[propName] }
                  </td>
                )
              })
            }
          </tr>
      </tbody>
    </table>
  )
}

export default BeerPropsTable