import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import {
    getOrders,
    updateOrder,
    deleteOrder,
    type Order,
} from "../api/order";

import { getCustomers } from "../api/customer";
import { getProducts } from "../api/product";

import OrdersTable from "../components/orders/OrdersTable";
import CreateOrderModal from "../components/orders/CreateOrderModal";

interface Customer {
    id: string;
    name: string;
    phone: string;
}

interface Product {
    id: string;
    name: string;
    selling_price: number;
    stock_quantity: number;
}

const OrdersPage: React.FC = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const fetchData = async () => {

        try {

            setLoading(true);

            const orderData =
                await getOrders();

            const customerData =
                await getCustomers();

            const productData =
                await getProducts();

            setOrders(orderData);

            setCustomers(customerData);

            setProducts(productData);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchData();

    }, []);

    const handleDelete = async (
        id: string
    ) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmed) {

            return;

        }

        try {

            await deleteOrder(id);

            fetchData();

        } catch (error) {

            console.error(error);

            alert("Failed to delete order.");

        }

    };

    const handleComplete = async (
        id: string
    ) => {

        try {

            await updateOrder(id, {
                status: "Completed",
            });

            fetchData();

        } catch (error) {

            console.error(error);

            alert("Failed to update order.");

        }

    };

    if (loading) {

        return (

            <div
                style={{
                    padding: "2rem",
                    textAlign: "center",
                }}
            >
                Loading orders...
            </div>

        );

    }

    return (

        <div
            style={{
                padding: "2rem",
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2rem",
                }}
            >

                <h1>Orders</h1>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        setIsModalOpen(true)
                    }
                >

                    <Plus size={18} />

                    Create Order

                </button>

            </div>

            <OrdersTable
                orders={orders}
                customers={customers}
                onDelete={handleDelete}
                onComplete={handleComplete}
            />

            <CreateOrderModal
                isOpen={isModalOpen}
                onClose={() =>
                    setIsModalOpen(false)
                }
                onOrderCreated={() => {

                    setIsModalOpen(false);

                    fetchData();

                }}
            />
            </div>

    );

};

export default OrdersPage;
