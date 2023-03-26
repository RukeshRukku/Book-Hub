import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import FilteredBookItem from '../FilteredBookItem'

const FilteredBooks = props => {
  const {details} = props
  const {id, title, readStatus, authorName, coverPic, rating} = details
  return (
    <li className="book-item">
      <Link to={`/books/${id}`} className="link-decoration">
        <div className="list-inner">
          <img src={coverPic} alt={title} className="img" />
          <div className="card">
            <h1 className="book-title">{title}</h1>
            <p className="author">{authorName}</p>
            <div className="rating-con">
              <p>Avg Rating</p>
              <BsFillStarFill
                color="gold"
                size={20}
                style={{alignSelf: 'center'}}
              />
              <p className="rating">{rating}</p>
            </div>
            <div className="con1">
              <p className="status">Status: </p>
              <p className="color-mod">{readStatus}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default FilteredBooks
