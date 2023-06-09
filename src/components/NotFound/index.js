import './index.css'
import {Link} from 'react-router-dom'

const NotFound = props => {
  const goToHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-total">
      <div className="not-found-con">
        <img
          src="https://res.cloudinary.com/dkwmqsgbu/image/upload/v1679746436/Group_7484_2x_crnakl.png"
          className="not-found-img"
          alt="not found"
        />
        <h1 className="heading">Page Not Found</h1>
        <p className="sorry-msg">
          we are sorry, the page you requested could not be found. Please go
          back to the homepage.
        </p>
        <Link to="/">
          <button type="button" className="btn" onClick={goToHome}>
            Go Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
