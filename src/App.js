// I have used updateQuery function from udacity webinar walktrough

import React from 'react'
import BooksSearch from './BooksSearch'
import BooksShelves from './BooksShelves'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'


class BooksApp extends React.Component {
  state = {
    booksArr: []
  }
  
  // get books from provided by Udacity backEnd server
  componentDidMount() {
    BooksAPI.getAll()
    .then((response) => {
      this.setState({ booksArr: response }) 
    })
  }

  shelfChanger = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf

      var newBooks = this.state.booksArr
      .filter((item)=> item.id !== book.id)
        newBooks.push(book)
        this.setState({ booksArr: newBooks})
    })
  }
  
  render() {

    const { booksArr } = this.state

    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <BooksSearch shelf="none" shelfChanger={this.shelfChanger} booksArr={booksArr} />
          )}
        />
        <Route exact path='/' render={() => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BooksShelves shelfChanger={this.shelfChanger} booksArr={booksArr} shelf="currentlyReading" />
            <BooksShelves shelfChanger={this.shelfChanger} booksArr={booksArr} shelf="wantToRead" />
            <BooksShelves shelfChanger={this.shelfChanger} booksArr={booksArr} shelf="read" /> 
            <div className="open-search">
            <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
