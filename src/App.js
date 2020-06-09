import React, {Component} from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import Beer from './containers/Beer/Beer'
import Favourites from './containers/Favourites/Favourites'
import ActiveBeer from './components/ActiveBeer/ActiveBeer'
import Auth from './containers/Auth/Auth'
import { connect } from 'react-redux'
import { autoLogin } from './store/actions/auth'
import Logout from './components/Logout/Logout'

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/beer/:id" component={ActiveBeer} />
        <Route path="/" exact component={Beer} />
        <Redirect to={"/"} />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/favourites" component={Favourites} />
          <Route path="/beer/:id" component={ActiveBeer} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Beer} />
          <Redirect to={"/"} />
        </Switch>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
