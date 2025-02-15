import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ItemList from "./ItemList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

const ItemListContainer = ({ greeting }) => {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoryNames = {
        "nuevos": "Nuevos",
        "ofertas": "Ofertas",
        "mas-vendidos": "Más Vendidos"
    };

    useEffect(() => {
        setLoading(true);

        const productsRef = collection(db, "products");
        const productsQuery = categoryId ? query(productsRef, where("category", "==", categoryId)) : productsRef;

        getDocs(productsQuery)
            .then((res) => {
                const productsData = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Productos obtenidos de Firestore:", productsData);
                setItems(productsData);
            })
            .catch((error) => console.error("Error al obtener los productos:", error))
            .finally(() => setLoading(false));
    }, [categoryId]);

    return (
        <div className="container text-center mt-5">
            {!categoryId && <h1 className="mb-4">¡Bienvenido a Sponsor Dios Shop!</h1>}
            <h2>{categoryId ? `Categoría: ${categoryNames[categoryId] || "Categoría no encontrada"}` : greeting}</h2>

            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                    <ClipLoader color="#ff6600" size={50} />
                </div>
            ) : (
                items.length > 0 ? <ItemList items={items} /> : <p>No hay productos en esta categoría.</p>
            )}
        </div>
    );
};

export default ItemListContainer;