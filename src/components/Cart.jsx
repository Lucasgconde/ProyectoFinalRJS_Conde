import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
    const { cart, removeItem, clearCart, decreaseQuantity } = useContext(CartContext);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleClearCart = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se eliminarán todos los productos del carrito.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, vaciar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                localStorage.removeItem("cart");
                Swal.fire({
                    title: "¡Carrito vacío!",
                    text: "Todos los productos han sido eliminados.",
                    icon: "success",
                    confirmButtonColor: "#28a745",
                    confirmButtonText: "Ok"
                });
            }
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 fw-bold">🛒 Tu Carrito</h2>

            {cart.length === 0 ? (
                <div className="text-center">
                    <h5 className="text-danger fw-bold">Tu carrito está vacío.</h5>
                    <Link 
                        className="btn text-white fw-bold mt-3" 
                        to="/" 
                        style={{ backgroundColor: "#ff6600", borderColor: "#ff6600" }}
                    >
                        Volver a la tienda
                    </Link>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover table-striped table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th style={{ width: "40%" }}>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id} className="align-middle">
                                    <td className="d-flex align-items-center p-2">
                                        <img 
                                            src={item.img} 
                                            alt={item.name} 
                                            className="rounded border" 
                                            style={{ width: "60px", height: "60px", objectFit: "cover" }} 
                                        />
                                        <span className="fw-semibold ms-2 text-center w-100">{item.name}</span>
                                    </td>
                                    <td className="fw-semibold">${item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td className="fw-semibold">${item.price * item.quantity}</td>
                                    <td className="text-center align-middle">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button 
                                                className="btn btn-outline-secondary rounded-circle p-0"
                                                onClick={() => decreaseQuantity(item.id)}
                                                style={{ 
                                                    width: "35px", 
                                                    height: "35px", 
                                                    display: "flex", 
                                                    alignItems: "center", 
                                                    justifyContent: "center", 
                                                    margin: "auto" 
                                                }}
                                            >
                                                ➖
                                            </button>
                                            <button 
                                                className="btn btn-outline-danger rounded-circle p-0"
                                                onClick={() => removeItem(item.id)}
                                                style={{ 
                                                    width: "35px", 
                                                    height: "35px", 
                                                    display: "flex", 
                                                    alignItems: "center", 
                                                    justifyContent: "center", 
                                                    margin: "auto" 
                                                }}
                                            >
                                                ❌
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h3 className="fw-bold">Total: <span className="text-success">${totalPrice}</span></h3>

                        <div className="d-flex gap-3">
                            <button className="btn btn-danger fw-bold px-4 py-2" onClick={handleClearCart}>
                                🗑 Vaciar Carrito
                            </button>
                            <Link className="btn btn-success fw-bold px-4 py-2" to='/checkout'>
                                🏧 Ir a Pagar
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;