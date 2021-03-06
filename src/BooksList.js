import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const BooksList = (props) => {
        const { books , updateBooks } = props;
        var shelf = []
        for (var cat in books){
            shelf.push(<BookShelf key={cat} shelf={cat} books={books[cat]} updateBooks={updateBooks}/>)
        }
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelf}
                </div>
            </div>
            <Link className="open-search" to="/search"></Link>
          </div>
        )
}
 
export default BooksList;