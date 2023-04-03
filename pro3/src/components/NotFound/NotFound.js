import React, { Component } from 'react';
import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="notfound-container">
        <h1 className="notfound-title">Página no encontrada</h1>
        <p className="notfound-message">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
      </div>
    );
  }
}

export default NotFound;

