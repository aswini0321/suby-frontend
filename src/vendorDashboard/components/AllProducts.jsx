import React, { useState, useEffect } from 'react';
import { API_Path } from '../data/ApiPath';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const deleteProductById = async (productId) => {
        try {
            const response = await fetch(`${API_Path}/product/delete/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setProducts(products.filter((product) => product._id !== productId));
                confirm("Are you sure you want to delete the product?");
                alert('Product deleted successfully');
            }
        } catch (error) {
            alert('Failed to delete product');
            console.log('Failed to delete');
        }
    };

    const productsHandler = async () => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_Path}/product/getproduct/${firmId}`);
            const newProductsData = await response.json();
            setProducts(Array.isArray(newProductsData.products) ? newProductsData.products : []);
            console.log("Products State:", newProductsData.products);
        } catch (error) {
            console.error("Failed to fetch products", error);
            alert('Failed to fetch products');
        }
    };

    useEffect(() => {
        productsHandler();
        console.log("This is useEffect");
    }, []);

    return (
        <>
            <div className="allpages"></div>
            <div>
                {Array.isArray(products) && products.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.productName}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        {item.image && (
                                            <img
                                                src={`${API_Path}/uploads/${item.image}`}
                                                alt={item.productName}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => deleteProductById(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default AllProducts;
