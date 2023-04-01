import './App.css'
import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import BookShelves from './components/BookShelves'
import BookDetails from './components/BookDetails'
import ActiveContext from './context/ActiveContext'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

class App extends Component {
  state = {active: 'Home'}

  change = value => {
    this.setState({active: value})
  }

  render() {
    const {active} = this.state
    return (
      <ActiveContext.Provider value={{active, changeActive: this.change}}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={BookShelves} />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ActiveContext.Provider>
    )
  }
}

export default App
