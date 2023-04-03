// este va a ser el componente creado para los detalles de los albumes 
// para utilizarlo luego lo importo en el padre src/components/AlbumDetail/AlbumDetail.js

import React, { Component } from 'react';
import './AlbumDetail.css';

class AlbumDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: null,
      genre: '',
      //  inico el estado isFavorite en el constructor y actualizarlo en función 
      // de si el álbum está en la lista de favoritos o no al cargar los datos del álbum.
      isFavorite: false, 
    };
  }
//Agrego la palabra clave 'async' antes de la función,
// con esto permito el uso de 'await' dentro de la funcion 
  async componentDidMount() {
    //dentro esta la lógica para obtener la información del álbum desde la API de Deezer
    // y actualizar el estado con esa información. 
    const albumId = this.props.match.params.id;
    const proxy = 'https://thingproxy.freeboard.io/fetch/';
    const albumUrl = `${proxy}https://api.deezer.com/album/${albumId}`;

    try {
      const response = await fetch(albumUrl);
      const data = await response.json();
      const isFavorite = this.isAlbumFavorite(data.id);

      if (data.genre_id) {
        const genreUrl = `${proxy}https://api.deezer.com/genre/${data.genre_id}`;
        const genreResponse = await fetch(genreUrl);
        const genreData = await genreResponse.json();
        this.setState({ genre: genreData.name });
      }

      this.setState({ album: data, isFavorite });
    } catch (error) {
      console.error('Error fetching album data:', error);
    }
  }

  isAlbumFavorite(albumId) {
    const favoriteAlbums = localStorage.getItem('favoriteAlbums');
    const parsedFavoriteAlbums = favoriteAlbums ? JSON.parse(favoriteAlbums) : {};
    return !!parsedFavoriteAlbums[albumId];
  }

  toggleFavorite = () => {
    const isFavorite = this.state.isFavorite;
    this.setState({ isFavorite: !isFavorite });

    const favoriteAlbumsKey = 'favoriteAlbums';
    let favoriteAlbums = localStorage.getItem(favoriteAlbumsKey);
    favoriteAlbums = favoriteAlbums ? JSON.parse(favoriteAlbums) : {};

    if (isFavorite) {
      // Eliminar el álbum de favoritos en localStorage
      delete favoriteAlbums[this.state.album.id];
    } else {
      // Agregar el álbum a favoritos en localStorage
      favoriteAlbums[this.state.album.id] = this.state.album;
    }

    localStorage.setItem(favoriteAlbumsKey, JSON.stringify(favoriteAlbums));
  };



  render() {
    // Renderizar información del álbum, si esta disponible 
        const { album, isFavorite } = this.state;
      
        if (!album) {
          return <div>Loading...</div>;
        }
      
        return (
          <div className="album-container">
          <img src={album.cover} alt={album.title} className="album-cover" />
          <div className="album-info">
            <h2 className="album-title">{album.title}</h2>
            <h3 className="album-artist">{album.artist.name}</h3>
            <h4 className="album-genre">{this.state.genre}</h4>
            <p className="album-release-date">{album.release_date}</p>
          </div>
          <ul className="track-list">
            {album.tracks.data.map((track) => (
              <li key={track.id} className="track-item">
                {track.title}
              </li>
            ))}
          </ul>
          <button className="favorite-button" onClick={this.toggleFavorite}>
            {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </button>
        </div>
        );
      }
      

}

export default AlbumDetail;
