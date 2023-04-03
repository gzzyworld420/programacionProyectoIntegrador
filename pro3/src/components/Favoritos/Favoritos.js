import React, { Component } from 'react';
import AlbumDetail from '../AlbumDetail/AlbumDetail';

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: [],
    };
  }

  handleAddToFavorites = (album) => {
    this.setState((prevState) => ({
      favoritos: [...prevState.favoritos, album],
    }));
  };

  render() {
    const { favoritos } = this.state;

    const albumList = [
      { id: 1, title: 'Album 1', artist: 'Artista 1' },
      { id: 2, title: 'Album 2', artist: 'Artista 2' },
      { id: 3, title: 'Album 3', artist: 'Artista 3' },
    ];

    return (
      <div>
        <h1>Favoritos</h1>
        <div>
          <h2>Lista de álbumes</h2>
          {albumList.map((album) => (
            <AlbumDetail
              key={album.id}
              title={album.title}
              artist={album.artist}
              handleAddToFavorites={() => this.handleAddToFavorites(album)}
            />
          ))}
        </div>
        <div>
          <h2>Álbumes favoritos</h2>
          {favoritos.map((album) => (
            <div key={album.id}>
              <h3>{album.title}</h3>
              <p>{album.artist}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Favoritos;