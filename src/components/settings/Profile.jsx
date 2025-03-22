import { useState, useContext } from "react";
import { User, Edit3, MapPin, Store, Smartphone, CheckCircle, XCircle, Save } from "lucide-react";
import SettingSection from "./SettingSection";
import { AuthContext } from "../../Context/AuthContext";
import instance from "../../api/apiInstances";

const Profile = () => {
	const { vendorInfo, setVendorInfo } = useContext(AuthContext);
	const parsedUser = vendorInfo ? vendorInfo.vendor : {};

	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: parsedUser.name || "",
		email: parsedUser.email || "",
		mobile: parsedUser.mobile || "",
		businessName: parsedUser.businessName || "",
		businessType: parsedUser.businessType || "",
	});

	// Handle input change
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Save Changes
	const handleSave = async () => {
		try {
			const response = await instance.put("/api/vendors/profile", formData);
			setVendorInfo({ vendor: response.data.vendor }); // Update AuthContext
			setIsEditing(false); // Exit edit mode
			alert("Profile updated successfully!");
		} catch (error) {
			console.error("Error updating profile:", error);
			alert("Failed to update profile.");
		}
	};

	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
				{/* Profile Image and Basic Info */}
				<div className="flex flex-col sm:flex-row items-center">
					{/* Profile Image with Fallback */}
					<div className="relative w-24 h-24">
						{parsedUser.profileImage ? (
							<img
								src={parsedUser.profileImage}
								alt="User"
								className="rounded-full w-full h-full object-cover border-2 border-green-500 shadow-md"
							/>
						) : (
							<div className="rounded-full w-full h-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-700 border-2 border-green-500">
								{parsedUser.name?.charAt(0).toUpperCase() || "U"}
							</div>
						)}
					</div>

					{/* Vendor Name & Email */}
					<div className="text-center sm:text-left sm:ml-6">
						<h3 className="text-xl font-bold text-gray-900">{parsedUser.name || "Vendor Name"}</h3>
						<p className="text-gray-500 flex items-center">
							{parsedUser.email || "vendor@example.com"}
							<button onClick={() => copyToClipboard(parsedUser.email)} className="ml-2 text-blue-500 text-sm">Copy</button>
						</p>
					</div>

				</div>

				{/* Business Info */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-gray-100 p-4 rounded-lg shadow">
						<h4 className="text-lg font-semibold flex items-center">
							<Store size={20} className="mr-2 text-green-500" />
							Business Info
						</h4>
						{isEditing ? (
							<>
								<input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="border p-2 w-full rounded-md mt-1" />
								<select name="businessType" value={formData.businessType} onChange={handleChange} className="border p-2 w-full rounded-md mt-2">
									<option value="moving">Moving</option>
									<option value="stationary">Stationary</option>
								</select>
							</>
						) : (
							<>
								<p className="text-gray-600"><strong>Name:</strong> {parsedUser.businessName}</p>
								<p className="text-gray-600"><strong>Type:</strong> {parsedUser.businessType}</p>
							</>
						)}
					</div>

					{/* Contact Info */}
					<div className="bg-gray-100 p-4 rounded-lg shadow">
						<h4 className="text-lg font-semibold flex items-center">
							<Smartphone size={20} className="mr-2 text-green-500" />
							Contact Info
						</h4>
						{isEditing ? (
							<input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="border p-2 w-full rounded-md" />
						) : (
							<p className="text-gray-600"><strong>Mobile:</strong> {parsedUser.mobile}</p>
						)}
					</div>
				</div>

				{/* Buttons */}
				<div className="flex justify-end">
					{isEditing ? (
						<button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-all shadow-md">
							<Save size={18} />
							Save Changes
						</button>
					) : (
						<button onClick={() => setIsEditing(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-all shadow-md">
							<Edit3 size={18} />
							Edit Profile
						</button>
					)}
				</div>
			</div>
		</SettingSection>
	);
};

export default Profile;
