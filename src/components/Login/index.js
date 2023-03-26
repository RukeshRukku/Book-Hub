import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {errorMsg: '', showErrorMsg: false, username: '', password: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  submitFailure = error => {
    this.setState({errorMsg: error, showErrorMsg: true})
  }

  submit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-total-lg">
          <img
            src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679789326/Rectangle_1467_2x_bannbh_yuldph.png"
            alt="website login"
            className="website-login"
          />
          <div className="form-con">
            <form onSubmit={this.submit} className="form">
              <img
                src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746532/Group_7731_3x_vaunxw.png"
                alt="login website logo"
                className="website-logo"
              />
              <label htmlFor="username" className="label">
                Username*
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Username"
                id="username"
                onChange={this.changeUsername}
              />
              <label htmlFor="password" className="label">
                Password*
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Password"
                id="password"
                onChange={this.changePassword}
              />
              {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="login-total-sm">
          <img
            src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746409/Ellipse_99_2x_wdjlvn.png"
            alt="website login"
            className="website-login"
          />
          <div className="form-con">
            <form onSubmit={this.submit} className="form">
              <img
                src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746532/Group_7731_3x_vaunxw.png"
                alt="login website logo"
                className="website-logo"
              />
              <label htmlFor="username" className="label">
                Username*
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Username"
                id="username"
                onChange={this.changeUsername}
              />
              <label htmlFor="password" className="label">
                Password*
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Password"
                id="password"
                onChange={this.changePassword}
              />
              {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login
