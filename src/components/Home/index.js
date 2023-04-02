import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import ActiveContext from '../../context/ActiveContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {data: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedBooksData()
  }

  successGetDataView = data => {
    const updatedData = data.books.map(each => ({
      id: each.id,
      title: each.title,
      authorName: each.author_name,
      coverPic: each.cover_pic,
    }))
    this.setState({data: updatedData, apiStatus: apiStatusConstants.success})
  }

  getTopRatedBooksData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.successGetDataView(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  refresh = () => {
    this.getTopRatedBooksData()
  }

  failureView = () => (
    <div className="home-failure">
      <img
        src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746450/Group_7522_2x_qasadv.png"
        alt="failure view"
        className="home-failure-img"
      />
      <p className="home-para" style={{textAlign: 'center', marginTop: '10px'}}>
        Something went wrong, Please try again.
      </p>
      <button className="btn btn-fix" type="button" onClick={this.refresh}>
        Try Again
      </button>
    </div>
  )

  loaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  success = () => {}

  renderReturnData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.inProgress:
        return this.loaderView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  replaceWindow = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  booksShelves = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  successView = () => {
    const {data} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div className="home-total-flex">
        <div>
          <div className="home-bottom">
            <h1 className="home-head">Find Your Next Favorite Books?</h1>
            <p className="home-para">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>

            <button
              className="btn btn-fix btn-flex"
              type="button"
              onClick={this.booksShelves}
            >
              Find Books
            </button>
          </div>
          <div className="color">
            <div className="carousel-card">
              <div className="home-flex">
                <h1 className="top-head">Top Rated Books</h1>
                <button
                  className="btn btn-fix btn-flex-carousel"
                  type="button"
                  onClick={this.replaceWindow}
                >
                  Find Books
                </button>
              </div>
              <div className="slick-container">
                <Slider {...settings}>
                  {data.map(eachLogo => {
                    const {id, coverPic, title, authorName} = eachLogo
                    return (
                      <div className="slick-item" key={id}>
                        <Link
                          to={`/books/${id}`}
                          className="link-decoration-remove"
                        >
                          <img
                            className="logo-image"
                            src={coverPic}
                            alt="company logo"
                          />
                          <h1 className="carousel-title top-head">{title}</h1>
                          <p className="carousel-para">{authorName}</p>
                        </Link>
                      </div>
                    )
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    return (
      <ActiveContext.Consumer>
        {value => {
          const {hamBurgerClick} = value
          return (
            <div className="total-home">
              <Header />
              {hamBurgerClick ? null : this.renderReturnData()}
            </div>
          )
        }}
      </ActiveContext.Consumer>
    )
  }
}

export default Home
