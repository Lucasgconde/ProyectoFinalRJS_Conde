import React, { useState } from "react";

const ItemCount = ({ stock, onAdd }) => {
    const [count, setCount] = useState(1);

    const handleAdd = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    };

    const handleSubtract = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                <button className="btn btn-outline-secondary" onClick={handleSubtract}>-</button>
                <span className="fw-bold">{count}</span>
                <button className="btn btn-outline-secondary" onClick={handleAdd}>+</button>
            </div>
            <button 
                className="btn text-white fw-bold"
                style={{ backgroundColor: "#FF6600", borderColor: "#FF6600" }}
                onClick={() => onAdd(count)}
            >
                Agregar al carrito
            </button>
        </div>
    );
};

export default ItemCount;