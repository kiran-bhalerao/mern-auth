import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Signin from './Signin'
import Signup from './Signup'
import Home from './Home'
import Navbar from './Navbar'
import Admin from './Admin'
import fromStore from '../utils/fromStore'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route
              path='/admin'
              render={() => {
                return fromStore('mern_auth_token') ? <Admin /> : <Signin />
              }}
            />
            <Route component={() => <p>404 not found</p>} />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}
export default App
