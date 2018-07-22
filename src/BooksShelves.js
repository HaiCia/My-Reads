import React from 'react'
import Books from './Books'
import PropTypes from 'prop-types'

function BooksShelves(props) {

  const { booksArr, shelf, shelfChanger } = props
  let updatedBooksArr = booksArr.filter((book) => shelf === book.shelf)

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.charAt(0).toUpperCase() + shelf.slice(1).replace(/([A-Z])/g, " $1")}</h2>
      <div className="bookshelf-books">
        <Books shelfChanger={shelfChanger} booksArr={ updatedBooksArr } shelf={shelf} />
      </div>
    </div>
    )
  }

BooksShelves.propTypes = {
    shelf: PropTypes.string.isRequired,
    shelfChanger: PropTypes.func.isRequired,
    booksArr: PropTypes.array.isRequired,
}

export default BooksShelves