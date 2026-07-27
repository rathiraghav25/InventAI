import React from "react";
import { Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface Props {
    orders: any[];
    customers: any[];
    onDelete: (id: string) => void;
    onComplete: (id: string) => void;
}

const OrdersTable: React.FC<Props> = ({
    orders,
    customers,
    onDelete,
    onComplete,
}) => {

    const formatINR = (amt: number) =>
        `₹${amt.toLocaleString("en-IN")}`;

    return (
        <div className="card" style={{ padding: 0 }}>
            <div className="table-container">
                <table className="table">

                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {orders.map(order => {

                            const customer =
                                customers.find(
                                    c => c.id === order.customer_id
                                );

                            return (

                                <tr key={order.id}>

                                    <td>{order.id}</td>

                                    <td>
                                        {new Date(
                                            order.order_date
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        {customer?.name}
                                    </td>

                                    <td>
                                        {formatINR(order.total_amount)}
                                    </td>

                                    <td>
                                        <StatusBadge
                                            status={order.status}
                                        />
                                    </td>

                                    <td>

                                        {order.status === "Pending" && (

                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    onComplete(order.id)
                                                }
                                            >
                                                Complete
                                            </button>

                                        )}

                                        <button
                                            className="btn btn-ghost"
                                            style={{
                                                color: "red",
                                                marginLeft: "8px",
                                            }}
                                            onClick={() =>
                                                onDelete(order.id)
                                            }
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                    </td>

                                </tr>

                            );

                        })}

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default OrdersTable;