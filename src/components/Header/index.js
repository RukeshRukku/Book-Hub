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

  render() {
    const {hamBurgerClick} = this.state
    return (
      <>
        <nav className="header-nav-lg">
          <div className="header-nav-con">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746458/Group_7731_sn5dsk.png"
                alt="website logo"
                className="header-website-logo"
              />
            </Link>
            <ul className="header-links">
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
                <button type="button" className="btn" onClick={this.logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <nav className="header-nav-sm">
            <div className="header-nav-con">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746458/Group_7731_sn5dsk.png"
                  alt="website logo"
                  className="header-website-logo"
                />
              </Link>
              <GiHamburgerMenu
                size={30}
                color="#475569"
                className="icon"
                onClick={this.changeHamBurger}
              />
            </div>
          </nav>
          {hamBurgerClick && (
            <div className="sm-con">
              <ul className="header-links">
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
                <li className="list-li">
                  <MdRemoveCircle
                    size={30}
                    className="icon"
                    onClick={this.removeHam}
                  />
                </li>
              </ul>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default withRouter(Header)
