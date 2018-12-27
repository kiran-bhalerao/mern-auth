import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import fromStore from '../utils/fromStore'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Navbar extends Component {
  renderNavItem = () => {
    if (fromStore('mern_auth_token')) {
      return (
        <React.Fragment>
          <NavLink className='nav-link' to='/admin'>
            Admin
          </NavLink>
          <Link
            className='nav-link'
            to='/'
            onClick={() => {
              localStorage.clear()
              this.props.clearUser()
            }}
          >
            Logout
          </Link>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <NavLink className='nav-link' to='/signin'>
            Signin
          </NavLink>
          <NavLink className='nav-link' to='/signup'>
            Signup
          </NavLink>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <a className='navbar-brand' href='/'>
          MERN<span style={{ color: 'red' }}>_Auth</span>
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto mr-3'>
            <NavLink exact className='nav-link' to='/'>
              Home
            </NavLink>
            {this.renderNavItem()}
          </ul>
        </div>
      </nav>
    )
  }
}
const mapStateToProps = state => {
  return {
    ...state.UserReducer
  }
}
export default connect(
  mapStateToProps,
  actions
)(Navbar)
