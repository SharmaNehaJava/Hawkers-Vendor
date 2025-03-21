import { useEffect, useState, useContext } from 'react';
import { motion } from "framer-motion";
import instance from '../api/apiInstances';

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, Package } from "lucide-react";
import ProductsTable from "../components/products/ProductsTable";

import { AuthContext } from '../Context/AuthContext';

const ProductsPage = () => {
	const { logout } = useContext(AuthContext);
  	const [dashboardData, setDashboardData] = useState({
    	totalProducts: 0,
    	lowStockCount: 0
  	});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await instance.get('/api/vendors/dashboard');
        // console.log(`data = ${JSON.stringify(data)}`);
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
		logout();
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-100'>
      <Header title='Products' />

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* STATS */}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard 
            name='Total Products' 
            icon={Package} 
            value={dashboardData.totalProducts} 
            color='#6366F1' 
          />
          <StatCard 
            name='Low Stock' 
            icon={AlertTriangle} 
            value={dashboardData.lowStockCount} 
            color='#F59E0B' 
          />
        </motion.div>

        <ProductsTable />
      </main>
    </div>
  );
};

export default ProductsPage;