import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

class Root extends Component {
  render() {
    return <App />;
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
