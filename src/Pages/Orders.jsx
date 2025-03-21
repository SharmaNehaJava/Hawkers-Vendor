import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Clock, CheckCircle, DollarSign, XCircle } from "lucide-react";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import OrdersTable from "../components/orders/OrdersTable";
import instance from "../api/apiInstances";
import { CanceledError } from "axios";

const OrdersPage = () => {
	const [orderStats, setOrderStats] = useState({
		totalOrders: 0,
		pendingOrders: 0,
		completedOrders: 0,
		failedOrders: 0,
		totalRevenue: 0,
	});

	// Exposing fetchOrders using useRef for external calls
	const fetchOrders = useRef(async () => {
		try {
			const vendorId = localStorage.getItem("vendorInfo._id");
			const { data } = await instance.get(`/api/vendors/orders-dashboard?vendorId=${vendorId}`);
			console.log(data);
			setOrderStats(data);
		} catch (error) {
			console.error("Error fetching orders:", error);
		}
	});

	useEffect(() => {
		fetchOrders.current(); // Initial load
	}, []);

	return (
		<div className='flex-1 relative z-10 overflow-auto bg-gray-100'>
			<Header title={"Orders"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Orders' icon={ShoppingBag} value={orderStats.totalOrders} color='#6366F1' />
					<StatCard name='Pending Orders' icon={Clock} value={orderStats.pendingOrders} color='#F59E0B' />
					<StatCard
						name='Completed Orders'
						icon={CheckCircle}
						value={orderStats.completedOrders}
						color='#10B981'
					/>
					<StatCard name='Failed Orders' icon={XCircle} value={orderStats.failedOrders} color='#EF4444' />
				</motion.div>

				<OrdersTable refreshStats={fetchOrders.current} />
			</main>
		</div>
	);
};

export default OrdersPage;