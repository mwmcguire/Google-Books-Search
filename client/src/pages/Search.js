import React, { Component } from 'react';
import API from '../utils/API';
import Jumbotron from '../components/Jumbotron';
import SearchForm from '../components/SearchForm';
import BookCard from '../components/BookCard';

// Function to format the book results as they are returned from the API.  Allows for a single component 'BookCard'
// that can be used in both pages.
const formatBookResults = googleApiResults => {
  const bookArray = [];

  googleApiResults.map(book => {
    const formattedBook = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors
        ? book.volumeInfo.authors
        : ['No Author Listed.'],
      description: book.volumeInfo.description
        ? book.volumeInfo.description
        : 'No Description Listed.',
      googleBookId: book.id,
      thumbnail: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/170px-No_image_available.svg.png',
      link: book.volumeInfo.canonicalVolumeLink,
      pageCount: book.volumeInfo.pageCount,
      subtitle: book.volumeInfo.subtitle,
      publishedDate: book.volumeInfo.publishedDate
    };

    bookArray.push(formattedBook);
    return bookArray;
  });
  return bookArray;
};

class Search extends Component {
  state = {
    search: '',
    results: [],
    error: ''
  };

  // Method for saving a particular book to the database.
  saveBook = event => {
    const chosenBook = this.state.results.find(
      book => book.googleBookId === event.target.id
    );

    const newSave = {
      title: chosenBook.title,
      authors: chosenBook.authors,
      description: chosenBook.description,
      googleBookId: chosenBook.googleBookId,
      thumbnail: chosenBook.thumbnail,
      link: chosenBook.link,
      pageCount: chosenBook.pageCount,
      subtitle: chosenBook.subtitle,
      publishedDate: chosenBook.publishedDate
    };

    API.saveBook(newSave)
      .then(res => {
        console.log(res.status, res.statusText);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Method handling the change of the input field.
  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  // Method handling the submission of the Search form, makes a call to retrieve the results of the search
  // from Google Books API.
  handleFormSubmit = event => {
    event.preventDefault();
    // console.log(`Search for: ${this.state.search}`);
    API.getGoogleBooks(this.state.search)
      .then(res => {
        const formattedArray = formatBookResults(res.data.items);
        this.setState({ results: formattedArray });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className='container'>
        <Jumbotron
          title='Google Books Search'
          heading='Search Google Books API'
          image='https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1682&q=80'
        />
        <SearchForm
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <BookCard
          books={this.state.results}
          buttonAction={this.saveBook}
          buttonType='btn btn-success mt-2'
          buttonText='Save Book'
        />
      </div>
    );
  }
}

// Exporting Component Utilizing the Alerts.
export default Search;
