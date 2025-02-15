import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoSponsor-nav.jpg";
import CartWidget from "./CartWidget";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#ff6600" }}>
            <div className="container d-flex align-items-center">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img 
                        src={logo} 
                        alt="Sponsor Dios Shop Logo" 
                        style={{ height: "40px", width: "auto", marginRight: "15px" }} 
                    />
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-2">
                        <li className="nav-item">
                            <Link className="nav-link text-white fw-bold" to="/">🏠 Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/category/nuevos">Nuevos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/category/ofertas">Ofertas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/category/mas-vendidos">Más Vendidos</Link>
                        </li>
                    </ul>
                </div>

                <div className="ms-auto">
                    <CartWidget />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;