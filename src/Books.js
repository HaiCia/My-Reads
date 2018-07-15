import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Books extends Component {
  

  render() {
      let selectedShelf = "move"

      
        return (
            <ol className="books-grid">
            {console.log(this.props.booksArr)}
            {this.props.booksArr
                .filter((book) => this.props.shelf === book.shelf)
                .map((book) => (
                <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.coverURL})`}}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={selectedShelf} onChange={(e) => this.props.shelfChanger(book, e.target.value)}>
                        <option value="move" disabled >Move to...</option>
                        <option value="Currently Reading">Currently Reading</option>
                        <option value="Want to Read">Want to Read</option>
                        <option value="Read">Read</option>
                        <option value="None">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
                </li>

            ))}
        </ol>)
    }

}

Books.propTypes = {
  booksArr: PropTypes.array.isRequired, 
  shelf: PropTypes.string,
}

export default Books