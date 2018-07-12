import React, { Component } from 'react'
import Books from './Books'

class BookShelves extends Component {
    render() {

        return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf}</h2>
            <div className="bookshelf-books">
            <Books booksArr={this.props.booksArr} shelf={this.props.shelf} />
            </div>
        </div>

        )
    }

}

export default BookShelves