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
      <>
        <nav className="header-nav-sm">
          <ul className="header-nav-con">
            <li>
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746458/Group_7731_sn5dsk.png"
                  alt="website logo"
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
          <ul className={`sm-con header-links ${className}`}>
            <li className="list-li" onClick={this.changeHomeClick}>
              <Link to="/" className="links-deco">
                Home
              </Link>
            </li>
            <li className="list-li" onClick={this.changeBookClick}>
              <Link to="/shelf" className="links-deco">
                Bookshelves
              </Link>
            </li>
            <li className="list-li">
              <button
                type="button"
                className="btn btn-fix"
                onClick={this.logout}
              >
                Logout
              </button>
            </li>
            <li className="list-li-icon">
              <MdRemoveCircle
                size={30}
                className="icon"
                onClick={this.removeHam}
              />
            </li>
          </ul>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
