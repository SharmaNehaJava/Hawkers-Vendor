import Header from "../components/common/Header.jsx";
import Profile from "../components/settings/Profile.jsx";
import PaymentSettings from "../components/settings/PaymentSettings.jsx"; // New
import DangerZone from "../components/settings/DangerZone.jsx";

const SettingsPage = () => {
	return (
		<div className='flex-1 relative z-10 bg-gray-100'>
			<Header title='Settings' />
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8 lg:pb-16 space-y-6'>
				<Profile />
				<PaymentSettings /> {/* Bank, UPI, PayPal Linking */}
				<DangerZone /> {/* Account Deletion, Logout */}
			</main>
		</div>
	);
};

export default SettingsPage;
