import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdRemoveCircle} from 'react-icons/md'
import ActiveContext from '../../context/ActiveContext'

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
      <ActiveContext.Consumer>
        {value => {
          const {active, changeActive} = value
          const homeClass = active === 'Home' ? 'color-change' : ''
          const bookClass = active === 'Book' ? 'color-change' : ''

          const changeHome = () => {
            changeActive('Home')
          }
          const changeBook = () => {
            changeActive('Book')
          }
          return (
            <nav className="lg">
              <div className="flex-main">
                <ul className="flex-link-ham">
                  <li key="3">
                    <Link to="/">
                      <img
                        src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746458/Group_7731_sn5dsk.png"
                        alt="website logo"
                        className="header-website-logo"
                      />
                    </Link>
                  </li>
                  <li key="4">
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
                    <li className="li" key="1" onClick={changeHome}>
                      <Link to="/" className={`links-deco ${homeClass}`}>
                        Home
                      </Link>
                    </li>
                    <li className="li" key="2" onClick={changeBook}>
                      <Link to="/shelf" className={`links-deco ${bookClass}`}>
                        Bookshelves
                      </Link>
                    </li>
                  </ul>
                  <button
                    className="btn btn-fix"
                    type="button"
                    onClick={this.logout}
                  >
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
        }}
      </ActiveContext.Consumer>
    )
  }
}

export default withRouter(Header)
