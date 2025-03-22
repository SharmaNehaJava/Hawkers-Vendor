import { motion } from "framer-motion";
import { Trash2, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import instance from "../../api/apiInstances";
import { useNavigate } from "react-router-dom";

const DangerZone = () => {
  const { logout, vendorInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Delete Account Function
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete your account? This action cannot be undone!"
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await instance.delete(`/api/vendors/delete-account/${vendorInfo.vendor._id}`);
      alert("✅ Account deleted successfully!");
      logout();
      navigate("/signin");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("❌ Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout Function
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <motion.div
      className="bg-red-300 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <Trash2 className="text-white mr-3" size={24} />
        <h2 className="text-xl font-semibold text-white">Danger Zone</h2>
      </div>
      <p className="text-white mb-4">
        Delete Account: Permanently delete your account and all associated data.
      </p>
	  <p className="text-white mb-4">
        Sign Out: Makes You log out.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Delete Account Button */}
        <button
          onClick={handleDeleteAccount}
          className={`bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md transition-all flex items-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          <Trash2 size={18} />
          {loading ? "Deleting..." : "Delete Account"}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md transition-all flex items-center gap-2"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </motion.div>
  );
};

export default DangerZone;
