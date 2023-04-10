// el componentes "Navbar" deben permanecer en la carpeta "components", ya que es un componente reutilizable que puede ser utilizado en diferentes pantallas.

import React from "react";
import { Link } from "react-router-dom";
import './styles.css'
const menuNav = [
    {
        nombre: "Home",
        path: "./"
    },
    {
        nombre: "Favoritos",
        path: "./"
    },
    {
        nombre: "Ver todas",
        path: "./"
    }
]
function Navbar (){
return(
    <nav>
        <ul className="mainNav">    
            {
                menuNav.map((unNav, idx) => <li>
                    <Link to = {unNav.idx}>
                        {unNav.nombre} 
                    </Link>
                </li>)
            }
        </ul>
        <ul className="logo">
            <li>
                <img src= "./img/logoPag.jpeg"/> 
            </li>
        </ul>
    </nav>
)
}

export default Navbar;