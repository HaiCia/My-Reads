import React from 'react'
import PropTypes from 'prop-types'

function Books(props) {

  const { shelfChanger, booksArr } = props
  const noCover = "https://www.freeiconspng.com/uploads/no-image-icon-6.png"
  const noTitle = 'no title found'
    
  return (
    <ol className="books-grid">
      {booksArr
        .map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : noCover })`}}></div>
              <div className="book-shelf-changer">
                <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(e) => shelfChanger(book, e.target.value)}>
                <option value="move" disabled >Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
              </div>
              </div>
              <div className="book-title">{book.title ? book.title : noTitle }</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
    </ol>
  )
}

Books.propTypes = {
  booksArr: PropTypes.array.isRequired, 
  shelfChanger: PropTypes.func.isRequired
}

export default Books