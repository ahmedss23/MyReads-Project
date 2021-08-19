import React , { Component } from 'react';
import * as BooksAPI from './BooksAPI'

class Book extends Component {
    
    selectChangeHandler(e,book){
        const { updateBooks } = this.props;
        const value = e.target.value; 
        BooksAPI.update(book,value)
        .then(()=>{
            updateBooks(book,value);
        })
    }
    render(){
        const { book , shelf } = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    { book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>:<div className="book-cover" style={{ width: 128, height: 193}}>NO IMAGE</div>}
                    <div className="book-shelf-changer">
                        <select defaultValue={`${shelf}`} onChange={e=>this.selectChangeHandler(e,book)}>
                        <option value="move" disabled>Move to...</option>
                        {shelf==="currentlyReading"? <option value="currentlyReading">&#x2714; Currently Reading</option>:<option value="currentlyReading">Currently Reading</option>}
                        {shelf==="wantToRead"? <option value="wantToRead">&#x2714; Want to Read</option>:<option value="wantToRead"> Want to Read</option>}
                        {shelf==="read"? <option value="read">&#x2714; Read</option>:<option value="read">Read</option>}
                        {shelf==="none"? <option value="none">&#x2714; None</option>:<option value="none">None</option>}
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

export default Book;