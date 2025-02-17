import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Profile = () => {
	 const { vendorInfo } = useContext(AuthContext);
	 const parsedUser = vendorInfo ? vendorInfo.vendor : {};
	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src='#'
					alt="User"
					className='rounded-full w-20 h-20 object-cover mr-4 bg-white border-2 border-green-500 text-center '
				/>

				<div>
					<h3 className='text-lg font-semibold '>{parsedUser.name}</h3>
					<p className='text-gray-400'>{parsedUser.email}</p>
				</div>
			</div>

			<button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
				Edit Profile
			</button>
		</SettingSection>
	);
};
export default Profile;