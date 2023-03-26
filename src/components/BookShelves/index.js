import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import BookShelvesList from '../BookShelvesList'
import FilteredBooks from '../FilteredBooks'

import Header from '../Header'
import Footer from '../Footer'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    activeId: bookshelvesList[0].id,
    activeValue: bookshelvesList[0].value,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    data: [],
  }

  componentDidMount() {
    this.getBooksList()
  }

  successDataView = data => {
    const updatedData = data.map(each => ({
      readStatus: each.read_status,
      rating: each.rating,
      id: each.id,
      title: each.title,
      authorName: each.author_name,
      coverPic: each.cover_pic,
    }))
    this.setState({data: updatedData})
  }

  getBooksList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, activeValue} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeValue}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.successDataView(data.books)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeActiveIdAndValue = (id, value) => {
    this.setState({activeId: id, activeValue: value}, this.getBooksList)
  }

  changeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  clickToSearch = () => {
    this.getBooksList()
  }

  render() {
    const {activeId, data, searchInput} = this.state
    return (
      <div>
        <Header />

        <div className="bookShelves-bottom">
          <div className="container-sm">
            <div className="container2">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                values={searchInput}
                onChange={this.changeInput}
              />
              <div className="container3">
                <button
                  type="button"
                  className="transparent-button"
                  onClick={this.clickToSearch}
                >
                  <BsSearch />
                </button>
              </div>
            </div>
          </div>
          <div className="un-order-lis-width">
            <h1 className="un-order-head">Bookshelves</h1>
            <ul className="un-order-lis">
              {bookshelvesList.map(each => (
                <BookShelvesList
                  details={each}
                  key={each.id}
                  check={each.id === activeId}
                  click={this.changeActiveIdAndValue}
                />
              ))}
            </ul>
          </div>
          <div className="books">
            <div>
              <div className="container1">
                <h1 className="shelf-head">Want to Read Books</h1>
                <div className="container2">
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    values={searchInput}
                    onChange={this.changeInput}
                  />
                  <div className="container3">
                    <button
                      type="button"
                      className="transparent-button"
                      onClick={this.clickToSearch}
                    >
                      <BsSearch />
                    </button>
                  </div>
                </div>
              </div>
              <ul className="un-order-lis lis-flex">
                {data.map(each => (
                  <FilteredBooks details={each} key={each.id} />
                ))}
              </ul>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
