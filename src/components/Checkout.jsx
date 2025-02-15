import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { addDoc, collection, serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Checkout = () => {
    const [user, setUser] = useState({ name: "", lastname: "", email: "", address: "" });
    const [validateMail, setValidateMail] = useState("");
    const [orderId, setOrderId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (cart.length === 0 && !orderId) {
            navigate("/");
        }
    }, [cart, orderId, navigate]);

    const userData = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const validarFormulario = () => {
        if (!user.name || !user.lastname || !user.email || !user.address) {
            setError("Todos los campos son obligatorios.");
            return false;
        } else if (user.email !== validateMail) {
            setError("Los correos electrónicos deben coincidir.");
            return false;
        }
        return true;
    };

    const finalizarCompra = async (e) => {
        e.preventDefault();
        setError("");

        if (!validarFormulario()) return;

        setLoading(true);

        let orden = {
            buyer: user,
            shop: cart,
            total: cartTotal(),
            date: serverTimestamp(),
        };

        try {
            const ventas = collection(db, "orders");
            const res = await addDoc(ventas, orden);
            setOrderId(res.id);

            await Promise.all(
                cart.map(async (item) => {
                    const docRef = doc(db, "products", item.id);
                    const dbDoc = await getDoc(docRef);
                    if (dbDoc.exists()) {
                        const nuevoStock = dbDoc.data().stock - item.quantity;
                        await updateDoc(docRef, { stock: nuevoStock });
                    }
                })
            );

            clearCart();
        } catch (error) {
            console.error("Error en la compra:", error);
            setError("Hubo un problema al procesar la compra.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        {orderId ? (
                            <div className="text-center">
                                <h4 className="text-success fw-bold">¡Orden generada con éxito! 🙌</h4>
                                <h5>Tu ID de compra es: <span className="fw-bold">{orderId}</span></h5>
                                <Link 
                                    className="btn fw-bold mt-3"
                                    to="/"
                                    style={{ backgroundColor: "#ff6600", borderColor: "#ff6600", color: "white", padding: "10px 20px", fontSize: "16px" }}
                                >
                                    Volver a Home
                                </Link>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-center fw-bold mb-4">Completa con tus datos</h2>

                                {error && <div className="alert alert-danger text-center">{error}</div>}

                                <form onSubmit={finalizarCompra}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Nombre</label>
                                        <input className="form-control" type="text" name="name" placeholder="Tu nombre" onChange={userData} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Apellido</label>
                                        <input className="form-control" type="text" name="lastname" placeholder="Tu apellido" onChange={userData} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Dirección</label>
                                        <input className="form-control" type="text" name="address" placeholder="Tu dirección" onChange={userData} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Correo Electrónico</label>
                                        <input className="form-control" type="email" name="email" placeholder="Tu email" onChange={userData} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Repetir Correo Electrónico</label>
                                        <input className="form-control" type="email" name="second-email" placeholder="Confirma tu email" onChange={(e) => setValidateMail(e.target.value)} />
                                    </div>

                                    <div className="d-grid">
                                        <button className="btn btn-success fw-bold" type="submit" disabled={loading}>
                                            {loading ? <Spinner animation="border" size="sm" /> : "Finalizar Compra"}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;