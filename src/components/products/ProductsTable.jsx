import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import axios from "../../api/apiInstances";

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
    description: "",
    image: null,
  });

  const categories = ['Fruits', 'Vegetables', 'Fast Food', 'Dairy', 'Other', 'Juices'];  // Add more categories as needed

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/vendors/products");
        setProducts(response.data.products); // Assuming backend returns { products: [...] }
      } catch (error) {
        console.error("Error fetching products:", error.response?.data?.message || error.message);
      }
    };
    fetchProducts();
  }, []);


  const handleSearch = (e) => {
    axios.get(`/products?search=${searchTerm}`)
      .then(response => setProducts(response.data.products))
      .catch(error => console.log(error));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );

  // Add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      formData.append(key, newProduct[key]);
    });

    try {
      const response = await axios.post("http://localhost:3000/api/vendors/add-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts([...products, response.data.product]);
      setNewProduct({ name: "", category: "", price: "", stock: "", description: "", image: null });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Update an existing product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", editingProduct._id);
    Object.keys(editingProduct).forEach((key) => {
      if (key !== "_id") {
        formData.append(key, editingProduct[key]);
      }
    });

    try {
      const response = await axios.put("/products/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedProducts = products.map((product) =>
        product._id === response.data.product._id ? response.data.product : product
      );
      setProducts(updatedProducts);
      setIsEditing(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete("/products/remove", { data: { productId } });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
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
          placeholder="Name"
          value={isEditing ? editingProduct.name : newProduct.name}
          onChange={(e) =>
            isEditing
              ? setEditingProduct({ ...editingProduct, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />
        <select
          className="p-2 hover:bg-green-300 rounded-md"
          value={isEditing ? editingProduct.category : newProduct.category}
          onChange={(e) =>
            isEditing
              ? setEditingProduct({ ...editingProduct, category: e.target.value })
              : setNewProduct({ ...newProduct, category: e.target.value })
          }
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
          value={isEditing ? editingProduct.price : newProduct.price}
          onChange={(e) =>
            isEditing
              ? setEditingProduct({ ...editingProduct, price: e.target.value })
              : setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />
        <input
          className="p-2 rounded-md hover:bg-green-300"
          type="number"
          placeholder="Stock"
          value={isEditing ? editingProduct.stock : newProduct.stock}
          onChange={(e) =>
            isEditing
              ? setEditingProduct({ ...editingProduct, stock: e.target.value })
              : setNewProduct({ ...newProduct, stock: e.target.value })
          }
          required
        />
        <input
          className="p-2 rounded-md hover:bg-green-300"
          type="text"
          placeholder="Description"
          value={isEditing ? editingProduct.description : newProduct.description}
          onChange={(e) =>
            isEditing
              ? setEditingProduct({ ...editingProduct, description: e.target.value })
              : setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <input type="file" className="p-1 hover:bg-green-300 rounded-md" onChange={handleFileChange} />
        <button type="submit" className="bg-indigo-500 text-white py-2 rounded-md">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Display Product List */}
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
