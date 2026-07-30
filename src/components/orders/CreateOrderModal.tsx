import React, { useEffect, useState } from "react";

import { createOrder } from "../../api/order";
import { getCustomers } from "../../api/customer";
import { getProducts } from "../../api/product";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onOrderCreated: () => void;
}

interface Customer {
    id: string;
    name: string;
}

interface Product {
    id: string;
    name: string;
    selling_price: number;
    stock_quantity: number;
}

const CreateOrderModal: React.FC<Props> = ({
    isOpen,
    onClose,
    onOrderCreated,
}) => {

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [customerId, setCustomerId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(false);

    const selectedProduct =
        products.find((p) => p.id === productId);

    const total =
        selectedProduct
            ? selectedProduct.selling_price * quantity
            : 0;

    useEffect(() => {

        if (!isOpen) return;

        fetchData();

    }, [isOpen]);

    const fetchData = async () => {

        try {

            const customerData = await getCustomers();

            const productData = await getProducts();

            setCustomers(customerData);

            setProducts(productData);

        } catch (err) {

            console.error(err);

        }

    };
    
    const resetForm = () => {

        setCustomerId("");
        setProductId("");
        setQuantity(1);

    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!customerId || !productId) {

            alert("Please select both customer and product.");

            return;

        }

        if (quantity <= 0) {

            alert("Quantity must be greater than zero.");

            return;

        }

        try {

            setLoading(true);

            await createOrder({

                customer_id: customerId,
                product_id: productId,
                quantity,

            });


            resetForm();

            onClose();

            onOrderCreated();

        }

        catch (error: any) {

            if (error.response?.data?.detail) {

                alert(error.response.data.detail);

            } else {

                alert("Failed to create order.");

            }

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (!isOpen) {

        return null;

    }

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >

            <div
                className="card"
                style={{
                    width: "100%",
                    maxWidth: "500px",
                    padding: "2rem",
                }}
            >

                <h2 style={{ marginBottom: "1.5rem" }}>
                    Create New Order
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label className="input-label">
                            Customer
                        </label>

                        <select
                            className="input-field"
                            value={customerId}
                            onChange={(e) =>
                                setCustomerId(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Select Customer
                            </option>

                            {customers.map((customer) => (

                                <option
                                    key={customer.id}
                                    value={customer.id}
                                >
                                    {customer.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="input-group">

                        <label className="input-label">
                            Product
                        </label>

                        <select
                            className="input-field"
                            value={productId}
                            onChange={(e) =>
                                setProductId(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Select Product
                            </option>

                            {products.map((product) => (

                                <option
                                    key={product.id}
                                    value={product.id}
                                    disabled={
                                        product.stock_quantity === 0
                                    }
                                >
                                    {product.name}
                                    {" - ₹"}
                                    {product.selling_price}
                                    {" (Stock: "}
                                    {product.stock_quantity}
                                    {")"}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="input-group">

                        <label className="input-label">
                            Quantity
                        </label>

                        <input
                            className="input-field"
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                            required
                        />

                    </div>
            
                    <div
                        style={{
                            marginTop: "1.5rem",
                            marginBottom: "2rem",
                            padding: "1rem",
                            borderRadius: "8px",
                            backgroundColor: "#f5f5f5",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <span
                            style={{
                                fontWeight: 600,
                            }}
                        >
                            Total Amount
                        </span>

                        <span
                            style={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                color: "#2563eb",
                            }}
                        >
                            ₹{total.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "1rem",
                        }}
                    >
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => {

                                resetForm();

                                onClose();

                            }}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Order"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default CreateOrderModal;
    