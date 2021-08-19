import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksApi from './BooksAPI';
import SearchResult from './SearchResult';

class BooksSearch extends Component {
    
    state = {
        query: '',
        result: ''
    }
    handleChange(e){
        const value = e.target.value
        this.setState({
            result: ''
        })
        this.setState({
            query: value
        })

        if(value){
            const { myBooks } = this.props;
            var booksID = {
            currentlyReading: [],
            wantToRead: [],
            read:[]
            }
            Object.keys(myBooks).forEach(key=>{
                if(myBooks[key]){
                    myBooks[key].forEach(book=>{
                        booksID[book.shelf].push(book.id)
                    })
                }
            })
            BooksApi.search(value)
            .then(res=>{
                if(!res.error){
                    const data = res;
                    data.forEach(book=>{
                        for(var i in booksID["currentlyReading"]){
                            if(book.id===booksID["currentlyReading"][i]){book.shelf = "currentlyReading";break};
                        }
                        for(var j in booksID["wantToRead"]){
                            if(book.id===booksID["wantToRead"][j]){book.shelf = "wantToRead";break};
                        }
                        for(var k in booksID["read"]){
                            if(book.id===booksID["read"][k]){book.shelf = "read";break};
                        }
                    })
                    this.setState({
                        result: data
                    })
                } else {
                    this.setState({
                        result: 'not found'
                    })
                }
            })
        } else {
            this.setState({
                result: ''
            })
        }
    }

    updateSearchResult = (bookID,shelf)=>{
        const data = this.state.result;
        for(var i in data){
            if (data[i].id===bookID) data[i].shelf=shelf
            this.setState({
                result: data
            })
        }
    }

    render(){
        var books = this.state.result;
        var query = this.state.query;
        const { updateBooks } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e)=>{this.handleChange(e)}} />

                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                { this.state.query && !books ? <li>Searching</li>:<li></li> }
                {books && query &&
                        ( books!=='not found'? books.map(book=><SearchResult book={book} key={book.id} updateBooks={updateBooks} updateSearchResult={this.updateSearchResult}/>):<li>No Books Found</li>)
                    }
                </ol>
                </div>
            </div>
        )
    }

}

export default BooksSearch