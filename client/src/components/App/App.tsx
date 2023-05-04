import {Routes, Route} from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import LogoutPage from "../LogoutPage/LogoutPage";
import AccountPage from "../AccountPage/AccountPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import LogsPage from "../LogsPage/LogsPage";
import "./App.css";
import ResponsiveLayout from "../ResponsiveLayout/ResponsiveLayout";

function App() {


	return (
		<ResponsiveLayout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/logout" element={<AccountPage />} />
				<Route path="/logout" element={<DashboardPage />} />
				<Route path="/logout" element={<LogsPage />} />
			</Routes>
		</ResponsiveLayout>
	);
}

export default App;