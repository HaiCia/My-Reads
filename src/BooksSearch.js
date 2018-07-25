import React from 'react'
import Books from './Books'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BooksSearch extends React.Component {

  state = {
    query: '',
    results: [],
    searchMessage: false
  }

  updateQuery = (query) => {
    this.setState({query: query})
    let results = []
      if(query) {
      console.log('query: ' + query);
        BooksAPI.search(query)
          .then((data) =>  { if(data.length > 0) {
            results = data.map(book => {
              const index = this.props.booksArr.findIndex(c => c.id === book.id)
              if( index >= 0) {
                return this.props.booksArr[index]
              } else {
                return book
              }
            })
          }
          if (this.state.query)
            this.setState({ results: results, searchMessage: true})

          console.log(query)
        })
      } else {
      console.log('no query');
         this.setState({ query: '', results:[], searchMessage: false})        
      }
    }

  render() {

    const { results, searchMessage } = this.state

    results.sort(sortBy('name'))

    return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to='/' className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" 
                  placeholder="Search by title or author" 
                  value={this.state.query}
                  onChange={(e)=> {
                    this.updateQuery(e.target.value)}
                  }/>
          {searchMessage === true && (
            <span>We found {results.length} books for You!</span>
          )}

        </div>
      </div>
      <div className="search-books-results">
        <Books shelfChanger={this.props.shelfChanger} booksArr={ results } />
      </div>
    </div>
        
      )
  }
}

BooksSearch.propTypes = {
  shelfChanger: PropTypes.func.isRequired,
  booksArr: PropTypes.array.isRequired, 
}

export default BooksSearch 