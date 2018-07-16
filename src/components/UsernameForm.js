import React, { Component, Fragment } from 'react'

class UserForm extends Component {
  state = {
    username: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.username)
  }

  onChange = (e) => {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <Fragment>
        <h2>What is your username?</h2>
        <form onSubmit={this.onSubmit}>
          <input type="text"
            placeholder="Your full name"
            onChange={this.onChange}
          />
          
          <input type="submit"/>
        </form>
      </Fragment>
    )
  }
}

export default UserForm;