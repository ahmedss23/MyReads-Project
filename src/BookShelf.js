import React , { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {

    render(){
        const { books , shelf , updateBooks } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books && 
                        books.map(book=><Book book={book} key={book.id} shelf={book.shelf} updateBooks={updateBooks}/>)
                    }
                </ol>
                </div>
            </div>
        )
    }

}

export default BookShelf;