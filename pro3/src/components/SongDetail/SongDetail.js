// este va a ser el componente creado para los detalles de las canciones 
// para utilizarlo luego lo importo en el padre src/components/AlbumDetail/AlbumDetail.js

import React, { Component } from 'react';
import './SongDetail.css';

class SongDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: null,
      // el estado de abajo es para crear la posibilidad de agregar a favoritos 
      isFavorite: false,
    };
  }

  async componentDidMount() {
    // Obtener el ID de la canción de los parámetros de la URL
    const songId = this.props.match.params.id;
    // Llamar a la API de Deezer para obtener detalles de la canción
    const response = await fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${songId}`);
    const songData = await response.json();
    this.setState({ song: songData });
  }

  //El método toggleFavorite lo creo dentro del componente SongDetail,
  //Este método es parte del componente SongDetail, ya que maneja la funcionalidad de agregar o eliminar la canción de favoritos
  // actualiza el estado del componente. 

  toggleFavorite = () => {
    const { song, isFavorite } = this.state;

    // los localStorage son la lógica de acuerdo con las necesidades de nuestra web
    // como manejar datos, como obtener la información de la canción desde la API. 
    // manejar los datos de favoritos en el almacenamiento adecuado.
    if (isFavorite) {
      // Eliminar la canción de favoritos
      localStorage.removeItem(`song-${song.id}`);
    } else {
      // Agregar la canción a favoritos 
      localStorage.setItem(`song-${song.id}`, JSON.stringify(song));
    }

    this.setState({ isFavorite: !isFavorite });
  }


  render() {
    // Renderizar información de la canción (si está disponible)
   const { song, isFavorite } = this.state;

    if (!song) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="song-detail-container">
      <img className="song-detail-cover" src={song.album.cover} alt={song.title} />
      <h2 className="song-detail-title">{song.title}</h2>
      <h3 className="song-detail-artist">{song.artist.name}</h3>
      <h4 className="song-detail-album">{song.album.title}</h4>
      <audio className="song-detail-controls" src={song.preview} controls/>
      <button className="song-detail-favorite-btn" onClick={this.toggleFavorite}>
        {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </button>
    </div>
    );
  }
}

export default SongDetail;
