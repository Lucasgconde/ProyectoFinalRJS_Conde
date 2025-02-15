import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ItemDetail from "./ItemDetail";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const productRef = doc(db, "products", id);
        getDoc(productRef)
            .then((res) => {
                if (res.exists()) {
                    const productData = { id: res.id, ...res.data() };
                    console.log("Producto obtenido de Firestore:", productData);
                    setItem(productData);
                } else {
                    console.log("Producto no encontrado en Firestore.");
                    setItem(null);
                }
            })
            .catch((error) => console.error("Error al obtener el producto:", error))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div className="container text-center mt-5">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                    <ClipLoader color="#ff6600" size={50} />
                </div>
            ) : item ? (
                <ItemDetail item={item} />
            ) : (
                <p>Producto no encontrado.</p>
            )}
        </div>
    );
};

export default ItemDetailContainer;
