import React from "react";
import { Link } from "react-router-dom";
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
                </li>
                )
            }
        </ul>
    </nav>
)
}

export default Navbar;