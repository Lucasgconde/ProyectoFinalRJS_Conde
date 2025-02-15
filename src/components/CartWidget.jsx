import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

const CartWidget = () => {
    const { cartQuantity } = useContext(CartContext);

    return (
        <Link to="/cart" className="position-relative me-4">
            <BsCart3 className="fs-3 text-white" />
            {cartQuantity() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartQuantity()}
                </span>
            )}
        </Link>
    );
};

export default CartWidget;