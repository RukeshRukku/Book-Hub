import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdRemoveCircle} from 'react-icons/md'

class Header extends Component {
  state = {homeClick: true, bookshelvesClick: false, hamBurgerClick: false}

  changeHomeClick = () => {
    const {homeClick} = this.state
    this.setState(
      {homeClick: !homeClick, hamBurgerClick: false},
      this.callBackFun,
    )
  }

  changeBookClick = () => {
    this.setState(prevState => ({
      bookshelvesClick: !prevState.bookshelvesClick,
    }))
    this.setState({hamBurgerClick: false}, this.callBackFun)
  }

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  changeHamBurger = () => {
    this.setState({homeClick: false, hamBurgerClick: true}, this.callBackFun)
  }

  removeHam = () => {
    this.setState({homeClick: true, hamBurgerClick: false}, this.callBackFun)
  }

  callBackFun = () => {
    const {hamBurgerClick} = this.state
    const {click} = this.props
    click(hamBurgerClick)
  }

  render() {
    const {homeClick, bookshelvesClick, hamBurgerClick} = this.state
    const homeClassName = homeClick ? 'color-change' : ''
    const bookClassName = bookshelvesClick ? 'color-change' : ''
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
                <Link to="/" className={`links-deco ${homeClassName}`}>
                  Home
                </Link>
              </li>
              <li className="list-li" onClick={this.changeBookClick}>
                <Link to="/shelf" className={`links-deco ${bookClassName}`}>
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
                  <Link to="/" className={`links-deco ${homeClassName}`}>
                    Home
                  </Link>
                </li>
                <li className="list-li" onClick={this.changeBookClick}>
                  <Link to="/shelf" className={`links-deco ${bookClassName}`}>
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
