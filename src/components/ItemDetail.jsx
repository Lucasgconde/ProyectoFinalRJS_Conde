import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";

const ItemDetail = ({ item }) => {
    const { addItem, isInCart } = useContext(CartContext);
    const [added, setAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAdd = (quantity) => {
        if (quantity <= item.stock) {
            addItem(item, quantity);
            setAdded(true);
        } else {
            alert("No hay suficiente stock para agregar esa cantidad.");
        }
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="card shadow-lg p-0" style={{ width: "350px", overflow: "hidden" }}>
                <img 
                    src={item.img} 
                    alt={item.name} 
                    className="card-img-top"
                    style={{ objectFit: "cover", width: "100%", height: "100%" }} 
                />
                <div className="card-body text-center">
                    <h3 className="fw-bold">{item.name}</h3>
                    <p className="text-muted">{item.description}</p>
                    <h5 className="fw-bold">Precio: <span>${item.price}</span></h5>
                    <p>Stock disponible: {item.stock}</p>

                    {!added ? (
                        <ItemCount 
                            stock={item.stock} 
                            initial={1} 
                            onAdd={handleAdd} 
                        />
                    ) : (
                        <Link to="/cart" className="btn text-white fw-bold mt-2" 
                            style={{ backgroundColor: "#FF6600", borderColor: "#FF6600" }}>
                            Ir al carrito
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;