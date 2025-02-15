import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center">
            <div className="card shadow-sm" style={{ width: "18rem" }}>
                <div style={{ width: "100%", height: "auto" }}>
                    <img 
                        src={product.img} 
                        className="card-img-top" 
                        alt={product.name} 
                        style={{ width: "100%", height: "auto" }} 
                    />
                </div>
                <div className="card-body d-flex flex-column justify-content-between text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="fw-bold">${product.price}</p>
                    <Link to={`/item/${product.id}`} className="btn" style={{ backgroundColor: "#FF6600", color: "white" }}>
                        Ver Más
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Item;