import React from 'react';
import './header.css';

import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <nav className='navbar'>
            <div className='logo-home'>
                <img className='logo' src='../../img/logo.png'></img>
                <Link to='/'>Home</Link>
            </div>
            <div className="list-header">
                <Link to='/favoritos'>Favorite</Link>
                <Link to='/estrenos'>In Premiere</Link>
                <Link to='/populares'>Popular</Link>
            </div>
        </nav>
    )
}

export default Header