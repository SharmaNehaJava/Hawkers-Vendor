import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import instance from '../../api/apiInstances.js';

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    measurement: "",
    description: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const categories = ['Fruits', 'Vegetables', 'Fast Food', 'Dairy', 'Other', 'Juices'];
  const measurements = ['Kg', 'L', 'per piece', 'gm', 'ml', 'Dozen', 'Other'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get("/api/vendors/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.response?.data?.message || error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await instance.post("/api/vendors/get-signed-url", {
        filename: newProduct.image.name,
        filetype: newProduct.image.type,
        category: newProduct.category,
      });

      const { url, key } = data;

      await fetch(url, {
        method: 'PUT',
        body: newProduct.image,
        headers: {
          'Content-Type': newProduct.image.type,
        },
      });

      const response = await instance.post("/api/vendors/add-product", {
        ...newProduct,
        imageUrl: key,
      });

      setProducts([...products, response.data.product]);
      setNewProduct({ name: "", category: "", price: "", stock: "", measurement: "", description: "", image: null });
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000); // Hide popup after 3 seconds
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (isEditing) {
      setEditingProduct({ ...editingProduct, image: file });
    } else {
      setNewProduct({ ...newProduct, image: file });
    }
  };

  return (
    <motion.div
      className="bg-gray-300 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-300 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <form
        onSubmit={isEditing ? handleUpdateProduct : handleAddProduct}
        className="flex flex-col space-y-4"
      >
        <input
          className="p-2 hover:bg-green-300 rounded-md"
          type="text"
          placeholder="Product Name"
          name="name"
          value={isEditing ? editingProduct.name : newProduct.name}
          onChange={handleInputChange}
          required
        />
        <select
          className="p-2 hover:bg-green-300 rounded-md"
          name="category"
          value={isEditing ? editingProduct.category : newProduct.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input
          className="p-2 hover:bg-green-300 rounded-md"
          type="number"
          placeholder="Price"
          name="price"
          value={isEditing ? editingProduct.price : newProduct.price}
          onChange={handleInputChange}
          required
        />
        <input
          className="p-2 rounded-md hover:bg-green-300"
          type="number"
          placeholder="Stock"
          name="stock"
          value={isEditing ? editingProduct.stock : newProduct.stock}
          onChange={handleInputChange}
          required
        />
        <select
          className="p-2 hover:bg-green-300 rounded-md"
          name="measurement"
          value={isEditing ? editingProduct.measurement : newProduct.measurement}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Measurement</option>
          {measurements.map((measurement) => (
            <option key={measurement} value={measurement}>{measurement}</option>
          ))}
        </select>
        <input
          className="p-2 rounded-md hover:bg-green-300"
          type="text"
          placeholder="Description"
          name="description"
          value={isEditing ? editingProduct.description : newProduct.description}
          onChange={handleInputChange}
        />
        <input type="file" className="p-1 hover:bg-green-300 rounded-md" onChange={handleFileChange} />
        <button type="submit" className="bg-indigo-500 text-white py-2 rounded-md">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {showSuccessPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">
          Product added successfully!
        </div>
      )}

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.price}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                <td className="px-6 py-4 text-sm font-medium space-x-4">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditingProduct(product);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsTable;