import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Favoritos.css';

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: [],
    };
  }
  componentDidMount() {
    const favoriteAlbums = localStorage.getItem('favoriteAlbums');
    const parsedFavoriteAlbums = favoriteAlbums ? JSON.parse(favoriteAlbums) : {};
    this.setState({ favoritos: parsedFavoriteAlbums });
  }

  removeFromFavorites = (albumId) => {
    const { favoritos } = this.state;
    delete favoritos[albumId];
    this.setState({ favoritos });

    const favoriteAlbums = JSON.stringify(favoritos);
    localStorage.setItem('favoriteAlbums', favoriteAlbums);
  };

  render() {
    const { favoritos } = this.state;

    return (
      <div className="favoritos-container">
        <h1 className="favoritos-title">Favoritos</h1>
        <div className="favorite-albums-container">
          <h2 className="section-title">Álbumes favoritos</h2>
          {Object.values(favoritos).map((album) => (
            <div key={album.id} className="album-item">
              <Link to={`/album/${album.id}`}>
                <h3>{album.title}</h3>
                <p>{album.artist.name}</p>
              </Link>
              <button onClick={() => this.removeFromFavorites(album.id)}>
                Eliminar de favoritos
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Favoritos;