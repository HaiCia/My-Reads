import React, { Component } from 'react'

class Books extends Component {
  
  //  <p>{console.log(this.state.currentShelf)}</p>

  render() {
      let currentShelf = this.props.booksArr.filter((book) => this.props.shelf === book.shelf).map((book) => book.shelf)

      
        return (
            <ol className="books-grid">
            <p>{console.log(currentShelf)}</p>
            {this.props.booksArr
                .filter((book) => this.props.shelf === book.shelf)
                .map((book) => (
                <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.coverURL})`}}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(e) => this.props.shelfChanger(book, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
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

export default Books