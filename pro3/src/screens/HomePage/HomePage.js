//Este archivo HomePage.js contiene la lógica para realizar la búsqueda de álbumes utilizando la API de Deezer. 
// El resultado de la búsqueda se muestra en una cuadrícula utilizando el componente AlbumItem. 
// Cuando se hace clic en un álbum, se navega a la página de detalles del álbum correspondiente.

import React, { Component } from 'react';
import AlbumItem from '../../components/AlbumItem/AlbumItem';
import './HomePage.css';

//Implemento el manejo de cambios en el campo de búsqueda y la función de búsqueda en sí.
// La función de búsqueda deberá realizar una llamada a la API de Deezer utilizando el endpoint de búsqueda

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchQuery: '',
          searchResults: [],
        };
      }

handleSearchInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearchSubmit = async (event) => {
    event.preventDefault();

    const { searchQuery } = this.state;
    if (!searchQuery) return;

    const response = await fetch(
      `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search/album?q=${searchQuery}`
    );
    const data = await response.json();
    this.setState({ searchResults: data.data });
  };

// En el componente HomePage, agrego un campo de búsqueda (input)
//  y un contenedor para los resultados de búsqueda.

render() {
    const { searchResults } = this.state;

    return (
      <div className="home-container">
        <h1>Buscador de álbumes</h1>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar álbumes..."
            onChange={this.handleSearchInputChange}
          />
          <button type="submit">Buscar</button>
        </form>
        <div className="search-results-container">
          {searchResults.map((album) => (
            <AlbumItem
              key={album.id}
              album={album}
              onAlbumClick={() => this.props.history.push(`/albums/${album.id}`)}
            />
          ))}
        </div>
      </div>
    );
  }
}


export default HomePage;
