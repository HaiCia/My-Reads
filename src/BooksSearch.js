import React from 'react'
import Books from './Books'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class BooksSearch extends React.Component {

  state = {
    query: '',
    results: []
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }

  clearQuery = (query) => {
    this.setState({
      query: ''
    })
  }

  booksSearch = () => {
    
    BooksAPI.search(this.state.query).then((data) => {
      console.log(this.state.results)
      this.setState({results: data})
    }) 
  }

  render() {

    const { query } = this.state
    const { booksArr } = this.props

    let showingBooks
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = booksArr.filter((book) => match.test(book.title || book.authors))
    } else {
      showingBooks = booksArr
    }

    showingBooks.sort(sortBy('name'))

    return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={this.clearQuery}>Close</a>
        <div className="search-books-input-wrapper">
              {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
              */}
          <input type="text" 
                  placeholder="Search by title or author" 
                  value={this.state.query}
                  onChange={(e)=> {
                    this.updateQuery(e.target.value)
                    this.booksSearch(query)}
                  }
              />

          {showingBooks.length !== booksArr.length && (
            <span>Found {showingBooks.length} books</span>
          )}

              <p>{JSON.stringify(this.state)}</p>
              <p>{console.log(showingBooks)}</p>

        </div>
      </div>
      <div className="search-books-results">
        <Books shelfChanger={this.props.shelfChanger} booksArr={ showingBooks } shelf={this.props.shelf} />
      </div>
      <div className="open-search">
          <a href='/search' onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    </div>
        
      )
  }
}

BooksSearch.propTypes ={
  shelfChanger: PropTypes.func.isRequired,
  booksArr: PropTypes.array.isRequired, 
}

export default BooksSearch 