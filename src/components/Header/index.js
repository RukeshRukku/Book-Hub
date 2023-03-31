import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdRemoveCircle} from 'react-icons/md'

class Header extends Component {
  state = {hamBurgerClick: false}

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  changeHamBurger = () => {
    this.setState({hamBurgerClick: true})
  }

  removeHam = () => {
    this.setState({hamBurgerClick: false})
  }

  changeHomeClick = () => {
    this.setState({hamBurgerClick: false})
  }

  changeBookClick = () => {
    this.setState({hamBurgerClick: false})
  }

  render() {
    const {hamBurgerClick} = this.state
    const className = hamBurgerClick ? 'flex' : 'none'
    return (
      <nav className="lg">
        <div className="flex-main">
          <ul className="flex-link-ham">
            <li>
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746458/Group_7731_sn5dsk.png"
                  className="header-website-logo"
                />
              </Link>
            </li>
            <li>
              <GiHamburgerMenu
                size={30}
                color="#475569"
                className="icon"
                onClick={this.changeHamBurger}
              />
            </li>
          </ul>
          <div className={`links-con ${className}`}>
            <ul className="un-order">
              <li className="li">
                <Link to="/" className="links-deco">
                  Home
                </Link>
              </li>
              <li className="li">
                <Link to="/shelf" className="links-deco">
                  Bookshelves
                </Link>
              </li>
            </ul>
            <button className="btn btn-fix" type="button" onClick={this.logout}>
              Logout
            </button>
            <MdRemoveCircle
              size={30}
              className="icon"
              onClick={this.removeHam}
            />
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
