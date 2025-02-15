import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addItem = (item, quantity) => {
        const existingItem = cart.find((prod) => prod.id === item.id);

        if (existingItem) {
            if (existingItem.quantity + quantity <= item.stock) {
                setCart(prevCart => 
                    prevCart.map(prod => 
                        prod.id === item.id 
                            ? { ...prod, quantity: prod.quantity + quantity }
                            : prod
                    )
                );
            }
        } else {
            if (quantity <= item.stock) {
                setCart([...cart, { ...item, quantity }]);
            }
        }

        Swal.fire({
            title: "¡Producto agregado!",
            text: `${item.name} ha sido añadido al carrito.`,
            icon: "success",
            confirmButtonColor: "#ff6600",
            confirmButtonText: "Ok"
        });
    };

    const removeItem = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCartWithConfirmation = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará todos los productos del carrito.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, vaciar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                setCart([]);
                localStorage.removeItem("cart");

                Swal.fire({
                    title: "¡Carrito vacío!",
                    text: "Se han eliminado todos los productos.",
                    icon: "success",
                    confirmButtonColor: "#28a745",
                    confirmButtonText: "Ok"
                });
            }
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    const decreaseQuantity = (id) => {
        setCart((prevCart) => 
            prevCart
                .map(item => 
                    item.id === id 
                        ? { ...item, quantity: item.quantity - 1 } 
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const isInCart = (id) => {
        return cart.some((item) => item.id === id);
    };

    const cartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };

    const cartTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ 
            cart, 
            addItem, 
            removeItem, 
            decreaseQuantity,
            clearCart,
            clearCartWithConfirmation,
            cartQuantity, 
            cartTotal, 
            isInCart 
        }}>
            {children}
        </CartContext.Provider>
    );
};
