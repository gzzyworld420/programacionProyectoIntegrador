// este va a ser el componente creado para los detalles de las canciones 
// para utilizarlo luego lo importo en el padre src/components/AlbumDetail/AlbumDetail.js

import React, { Component } from 'react';

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

  toggleFavorite = () => {
    const { song, isFavorite } = this.state;

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
      <div>
        <img src={song.album.cover} alt={song.title} />
        <h2>{song.title}</h2>
        <h3>{song.artist.name}</h3>
        <h4>{song.album.title}</h4>
        <audio src={song.preview} controls/>
        <button onClick={this.toggleFavorite}>
          {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
      </div>
    );
  }
}

export default SongDetail;
