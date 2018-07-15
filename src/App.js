import React from 'react'
import './App.css'
import BooksSearch from './BooksSearch'
import BooksShelves from './BooksShelves'
import * as BooksAPI from './BooksAPI'

// jezeli komponent ma tylko render() mozemy uzyc za to zwyklerj funkcji i props podajemy jako pierwszy argument lesson3 state managment film 1
  

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    
    booksArr: [],
    
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      this.setState({ booksArr: response })
      
    })
    }

  shelfChanger = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf

      var newBooks = this.state.booksArr.filter((item)=> item.id !== book.id)

      newBooks.push(book)
      this.setState({ booksArr: newBooks})
    })
  }
  
  

  render() {
    return (

      <div className="app">
        <BooksSearch shelfChanger={this.shelfChanger} booksArr={this.state.booksArr} />
        <BooksShelves shelfChanger={this.shelfChanger} booksArr={this.state.booksArr} shelf="Currently Reading" />
        <BooksShelves shelfChanger={this.shelfChanger} booksArr={this.state.booksArr} shelf="Want to Read" />
        <BooksShelves shelfChanger={this.shelfChanger} booksArr={this.state.booksArr} shelf="Read" /> 
        
        </div>

    )
  }
}

export default BooksApp
