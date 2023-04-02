import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BsXCircleFill} from 'react-icons/bs'
import ActiveContext from '../../context/ActiveContext'

const Header = props => (
  <ActiveContext.Consumer>
    {value => {
      const {
        active,
        changeActive,
        hamBurgerClick,
        changeHamBurgerClickWithClick,
      } = value
      const homeClass = active === 'Home' ? 'color-change' : 'color-link'
      const bookClass = active === 'Book' ? 'color-change' : 'color-link'
      const className = hamBurgerClick ? 'header-bottom' : 'none'

      const changeHome = () => {
        changeActive('Home')
        changeHamBurgerClickWithClick(false)
      }

      const changeBook = () => {
        changeActive('Book')
        changeHamBurgerClickWithClick(false)
      }

      const logout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        changeHamBurgerClickWithClick(false)
        history.replace('/login')
      }

      return (
        <div className="total-header">
          <div className="top-header">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746532/Group_7731_3x_vaunxw.png"
                alt="website logo"
                className="logo"
              />
            </Link>
            <button
              className="trans"
              type="button"
              onClick={() => changeHamBurgerClickWithClick(!hamBurgerClick)}
            >
              <GiHamburgerMenu className="icon" />
            </button>
          </div>
          <div className={className}>
            <ul className="home-un-order-list">
              <li onClick={changeHome} className="header-li">
                <Link className={homeClass} to="/">
                  Home
                </Link>
              </li>
              <li onClick={changeBook} className="header-li">
                <Link className={bookClass} to="/shelf">
                  Bookshelves
                </Link>
              </li>
              <li className="header-li">
                <button className="btn" type="button" onClick={logout}>
                  Logout
                </button>
              </li>
              <li className="header-li">
                <button
                  className="trans"
                  type="button"
                  onClick={() => changeHamBurgerClickWithClick(false)}
                >
                  <BsXCircleFill className="icon" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )
    }}
  </ActiveContext.Consumer>
)

export default withRouter(Header)
