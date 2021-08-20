import React , { Component } from 'react';
import * as BooksAPI from './BooksAPI'

class BookResult extends Component {
    
    selectChangeHandler(e,book){
        const value = e.target.value; 
        BooksAPI.update(book,value)
        .then(()=>{
            this.props.updateBooks();
            this.props.updateSearchResult(book.id,value);
        })
    }
    render(){
        const { book  } = this.props;
        const shelf = book.shelf;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    { book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>:<div className="book-cover" style={{ width: 128, height: 193}}>NO IMAGE</div>}
                    <div className="book-shelf-changer">
                        <select defaultValue={shelf?`${shelf}` : "none"} onChange={e=>this.selectChangeHandler(e,book)}>
                        <option value="move" disabled>Move to...</option>
                        {shelf==="currentlyReading"? <option value="currentlyReading">&#x2714; Currently Reading</option>:<option value="currentlyReading">Currently Reading</option>}
                        {shelf==="wantToRead"? <option value="wantToRead">&#x2714; Want to Read</option>:<option value="wantToRead"> Want to Read</option>}
                        {shelf==="read"? <option value="read">&#x2714; Read</option>:<option value="read">Read</option>}
                        {!shelf ? <option value="none">&#x2714; None</option>:<option value="none">None</option>}
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }

}

export default BookResult;