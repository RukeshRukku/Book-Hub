import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {data: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getData()
  }

  successDataGet = data => {
    const updatedData = {
      readStatus: data.read_status,
      rating: data.rating,
      id: data.id,
      title: data.title,
      authorName: data.author_name,
      coverPic: data.cover_pic,
      aboutBook: data.about_book,
      aboutAuthor: data.about_author,
    }
    this.setState({data: updatedData, apiStatus: apiStatusConstants.success})
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.successDataGet(data.book_details)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    const {
      title,
      readStatus,
      authorName,
      coverPic,
      rating,
      aboutAuthor,
      aboutBook,
    } = data
    return (
      <>
        <div className="list-inner1">
          <img src={coverPic} alt={title} className="img1" />
          <div className="card1">
            <h1 className="book-title head1">{title}</h1>
            <p className="author" style={{fontSize: '20px', color: '#475569'}}>
              {authorName}
            </p>
            <div style={{display: 'flex'}}>
              <p style={{fontSize: '20px', color: '#475569'}}>Avg Rating</p>
              <BsFillStarFill
                color="gold"
                size={30}
                style={{
                  alignSelf: 'center',
                  marginLeft: '20px',
                  marginRight: '20px',
                }}
              />
              <p
                className="rating"
                style={{fontSize: '20px', color: '#334155'}}
              >
                {rating}
              </p>
            </div>
            <div className="con1">
              <p className="status" style={{fontSize: '20px'}}>
                Status:
              </p>
              <p className="color-mod" style={{fontSize: '20px'}}>
                {readStatus}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <h1 className="book-title1">About Author</h1>
        <p className="para">{aboutAuthor}</p>
        <h1 className="book-title1">About Book</h1>
        <p className="para">{aboutBook}</p>
      </>
    )
  }

  refresh = () => {
    this.getData()
  }

  failureView = () => (
    <div className="loader-container1">
      <img
        src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746450/Group_7522_2x_qasadv.png"
        alt="failure view"
        className="home-failure-img"
      />
      <p className="home-para" style={{textAlign: 'center', marginTop: '20px'}}>
        Something went wrong, Please try again.
      </p>
      <button className="btn btn-fix" type="button" onClick={this.refresh}>
        Try Again
      </button>
    </div>
  )

  renderReturn = () => {
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

  successView = () => (
    <div className="details-bottom">
      <div className="details-card">{this.renderSuccessView()}</div>
      <Footer />
    </div>
  )

  loaderView = () => (
    <div className="loader-container1" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  render() {
    return (
      <>
        <Header />
        {this.renderReturn()}
      </>
    )
  }
}

export default BookDetails
