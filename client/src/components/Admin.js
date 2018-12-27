import React, { Component } from 'react'
import axios from 'axios'
import fromStore from '../utils/fromStore'

class Admin extends Component {
  state = {
    err: null,
    users: null
  }
  componentWillMount = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/users',
      headers: {
        Authorization: fromStore('mern_auth_token')
      }
    })
      .then(res => {
        console.log(res.data.users)

        this.setState({ users: res.data.users })
      })
      .catch(err => {
        this.setState({ err: err.message })
      })
  }
  renderList = () => {
    return this.state.users.map(user => {
      return (
        <li className='list-group-item' key={user._id}>
          {user.username}
        </li>
      )
    })
  }
  render() {
    return (
      <React.Fragment>
        {this.state.err && <p>{this.state.err}</p>}
        {this.state.users && (
          <ul className='list-group mt-4'>{this.renderList()}</ul>
        )}
        {!this.state.users && <p>Loading...</p>}
      </React.Fragment>
    )
  }
}
export default Admin
