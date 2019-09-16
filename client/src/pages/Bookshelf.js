import React, { Component } from 'react';
import API from '../utils/API';
import Jumbotron from '../components/Jumbotron';
import BookCard from '../components/BookCard';

class Bookshelf extends Component {
  state = { books: [] };

  // Method to Query the API/Database to GET all the books in the database.
  loadBookshelf = () => {
    API.getBookshelf()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  // Method to DELETE a book from the database.
  deleteBook = event => {
    API.deleteBook(event.target.id)
      .then(res => this.loadBookshelf())
      .catch(err => console.log(err));
  };

  // Lifecycle Method - once the Bookshelf Component mounts it runs the 'loadBookshelf' method.
  componentDidMount() {
    this.loadBookshelf();
  }

  render() {
    return (
      <div className='container'>
        <Jumbotron
          title='Bookshelf'
          image='https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
        />
        <BookCard
          books={this.state.books}
          buttonAction={this.deleteBook}
          buttonType='btn btn-danger mt-2'
          buttonText='Delete Book'
        />
      </div>
    );
  }
}

export default Bookshelf;
