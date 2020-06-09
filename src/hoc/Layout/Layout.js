import React, {Component} from 'react';
import classes from './Layout.css';
import Header from '../../components/Header/Header'
import { connect } from 'react-redux'

class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <Header
          isAuthenticated={this.props.isAuthenticated}
        />

        <main>
          { this.props.children }
        </main>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)


