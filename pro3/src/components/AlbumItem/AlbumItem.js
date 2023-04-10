// Este componente AlbumItem es un componente funcional que recibe 
// title, artist y handleAddToFavorites como props y muestra la información básica 
// del álbum junto con un botón para agregar el álbum a favoritos. 
// Cuando el botón se hace clic, se llama a la función handleAddToFavorites que se pasa desde el componente Favoritos.
// el componente "AlbumItem", permanece en la carpeta "components", ya que es un componente reutilizable que puede ser utilizado en diferentes pantallas.

import React from 'react';
import './AlbumItem.css';

const AlbumItem = ({ title, artist, cover, onClick }) => {
  return (
    <div className="album-item-container" onClick={onClick}>
      <img src={cover} alt={title} className="album-item-cover" />
      <div className="album-item-info">
        <h2 className="album-item-title">{title}</h2>
        <h3 className="album-item-artist">{artist}</h3>
      </div>
    </div>
  );
};

export default AlbumItem;