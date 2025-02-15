import React from 'react';
import Item from './Item';

function ItemList({ items }) {
    return (
        <div className="container">
            <div className="row justify-content-center">
                {items.map((item) => (
                    <Item key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
}

export default ItemList;