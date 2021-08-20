import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import BooksList from './BooksList';
import BooksSearch from './BooksSearch';

class BooksApp extends React.Component {

  state = {
    currentlyReading: null,
    wantToRead: null,
    read: null
  }

  UpdateBooks = ()=>{
      // const oldShelf = book.shelf;
      // const newShelf = value;
      // book.shelf=newShelf;
      // this.setState(prevState=>({
      //     [oldShelf]: prevState[oldShelf].filter((data)=>data.id!==book.id),
      //     [newShelf]: [...this.state[newShelf],book]
      // }))
      BooksAPI.getAll()
      .then(data =>{
          this.setState(prevState=>({
              currentlyReading: data.filter((data)=>data.shelf === "currentlyReading"),
              wantToRead: data.filter((data)=>data.shelf === "wantToRead"),
              read: data.filter((data)=>data.shelf === "read")
          }))
      })
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then(data =>{
        this.setState(prevState=>({
            currentlyReading: data.filter((data)=>data.shelf === "currentlyReading"),
            wantToRead: data.filter((data)=>data.shelf === "wantToRead"),
            read: data.filter((data)=>data.shelf === "read")
        }))
    })
  }

  render() {
    
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/">
            <BooksList books={this.state} updateBooks={this.UpdateBooks}/>
          </Route>
          <Route exact path="/search">
            <BooksSearch myBooks={this.state} updateBooks={this.UpdateBooks}/>
          </Route>
          <Route>
            <div><h1><center>404: Page Not Found</center></h1></div>
          </Route>
        </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
