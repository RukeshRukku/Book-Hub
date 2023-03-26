import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRatedBooksSlick extends Component {
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

  failureView = () => (
    <div className="home-failure">
      <img
        src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746450/Group_7522_2x_qasadv.png"
        alt="home-failure"
        className="home-failure-img"
      />
      <p className="home-para" style={{textAlign: 'center', marginTop: '10px'}}>
        Something went wrong, Please try again.
      </p>
      <button className="btn btn-fix" type="button">
        Retry
      </button>
    </div>
  )

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

  loaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

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
      <Slider {...settings}>
        {data.map(eachLogo => {
          const {id, coverPic, title, authorName} = eachLogo
          return (
            <div className="slick-item" key={id}>
              <img className="logo-image" src={coverPic} alt="company logo" />
              <h1 className="carousel-title top-head">{title}</h1>
              <p className="carousel-para">{authorName}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

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

  render() {
    return (
      <>
        {' '}
        <div className="home-flex">
          <h1 className="top-head">Top Rated Books</h1>
          <button className="btn btn-fix btn-flex-carousel" type="button">
            Find Books
          </button>
        </div>
        <div className="slick-container">{this.renderReturnData()}</div>
      </>
    )
  }
}

export default TopRatedBooksSlick
