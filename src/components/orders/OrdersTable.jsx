import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Pencil, Check } from "lucide-react";
import instance from "../../api/apiInstances";
import { useNavigate} from "react-router-dom";

const OrdersTable = ({ refreshStats }) => {
    const Navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const [notification, setNotification] = useState(""); // Success/Failure message

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await instance.get("/api/vendors/orders");
                console.log(data);
                setOrders(data);
                setFilteredOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
        refreshStats(); 
    }, [setOrders, orders]);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = orders.filter(
            (order) =>
                order._id.toLowerCase().includes(term) ||
                order.user.toLowerCase().includes(term)
        );
        setFilteredOrders(filtered);
    };

    const handleEdit = (id, currentStatus) => {
        setEditingOrderId(id);
        setUpdatedStatus(currentStatus);
    };

    const handleUpdate = async (order) => {
        const orderId = order._id;
        setLoading(true); // Show loading state
        setNotification(""); // Clear previous messages

        try {
            await instance.put(`/api/vendors/update-order-status/${orderId}`, {
                status: updatedStatus,
                order: { vendor: order.vendor },
            });

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? { ...order, status: updatedStatus }
                        : order
                )
            );
            
            setNotification("Order status updated successfully ✅");
            Navigate('/orders');// Refresh the order list
        } catch (error) {
            console.error("Error updating order:", error);
            setNotification("Failed to update order status ❌");
        } finally {
            setLoading(false);
            setEditingOrderId(null);
            
            // Auto-hide notification after 3 seconds
            setTimeout(() => setNotification(""), 3000);
        }
    };

    return (
        <motion.div
            className='bg-gray-300 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            {/* Notification Popup */}
            {notification && (
                <div
                    className={`${
                        notification.includes("✅")
                            ? "bg-green-500"
                            : "bg-red-500"
                    } text-white text-center py-2 rounded-lg mb-4`}
                >
                    {notification}
                </div>
            )}

            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold'>Order List</h2>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Search orders...'
                        className='bg-gray-300 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
                    <thead>
                        <tr className='bg-gray-700 text-white'>
                            <th className='py-2 px-4'>User ID</th>
                            <th className='py-2 px-4'>Items</th>
                            <th className='py-2 px-4'>Status</th>
                            <th className='py-2 px-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <motion.tr
                                key={order._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className='bg-white hover:bg-gray-100 border-b'
                            >
                                <td className='py-3 px-4'>{order.user}</td>
                                <td className='py-3 px-4'>
                                    {order.items.map((item) => (
                                        <div
                                            key={item._id}
                                            className='flex items-center gap-2 border-b border-dashed py-1'
                                        >
                                            <span className='font-medium'>{item.name}</span>
                                            <span className='text-sm text-gray-500'>
                                                ({item.quantity} x ₹{item.price})
                                            </span>
                                        </div>
                                    ))}
                                </td>
                                <td className='py-3 px-4'>
                                    {editingOrderId === order._id ? (
                                        <select
                                            value={updatedStatus}
                                            onChange={(e) =>
                                                setUpdatedStatus(e.target.value)
                                            }
                                            className='p-2 border border-gray-400 rounded-lg'
                                        >
                                            <option value='placed'>Placed</option>
                                            <option value='processing'>Processing</option>
                                            <option value='shipped'>Shipped</option>
                                            <option value='delivered'>Delivered</option>
                                            <option value='failed'>Failed</option>
                                        </select>
                                    ) : (
                                        <span className='text-blue-500'>{order.status}</span>
                                    )}
                                </td>
                                <td className='py-3 px-4'>
                                    {editingOrderId === order._id ? (
                                        <button
                                            onClick={() => handleUpdate(order)}
                                            className={`text-green-500 hover:text-green-600 ${
                                                loading ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                            disabled={loading}
                                        >
                                            {loading ? "Updating..." : <Check size={18} />}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleEdit(order._id, order.status)
                                            }
                                            className='text-yellow-500 hover:text-yellow-600'
                                        >
                                            <Pencil size={18} />
                                        </button>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default OrdersTable;
