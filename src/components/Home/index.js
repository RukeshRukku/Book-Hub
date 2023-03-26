import './index.css'
import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import TopRatedBooksSlick from '../TopRatedBooksSlick'

class Home extends Component {
  state = {hamBurgerClick: false}

  hamClick = value => {
    this.setState({hamBurgerClick: value})
  }

  render() {
    const {hamBurgerClick} = this.state
    return (
      <div className="total-home">
        <Header click={this.hamClick} />
        {hamBurgerClick === false && (
          <div className="home-total-flex">
            <div>
              <div className="home-bottom">
                <h1 className="home-head">Find Your Next Favorite Books?</h1>
                <p className="home-para">
                  You are in the right place. Tell us what titles or genres you
                  have enjoyed in the past, and we will give you surprisingly
                  insightful recommendations.
                </p>

                <button className="btn btn-fix btn-flex" type="button">
                  Find Books
                </button>
              </div>
              <div className="color">
                <div className="carousel-card">
                  <TopRatedBooksSlick />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </div>
    )
  }
}

export default Home
