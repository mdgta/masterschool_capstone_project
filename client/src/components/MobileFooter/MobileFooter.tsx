import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BarChartIcon from '@mui/icons-material/BarChart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GitHubIcon from '@mui/icons-material/GitHub';
import {useNavigate} from "react-router-dom";

const MobileFooter = () => {

	const navigate = useNavigate();
	const user = false; // test

	return (
		<Box>
			{user ? (
				<BottomNavigation showLabels>
					<BottomNavigationAction label="Dashboard" icon={<BarChartIcon />} onClick={() => navigate("/dashboard")} />
					<BottomNavigationAction label="Logs" icon={<EventNoteIcon />} onClick={() => navigate("/logs")} />
					<BottomNavigationAction label="Account" icon={<PersonIcon />} onClick={() => navigate("/account")} />
				</BottomNavigation>
			) : (
				<BottomNavigation showLabels>
					<BottomNavigationAction label="Login" icon={<LoginIcon />} onClick={() => navigate("/login")} />
					<BottomNavigationAction label="Regsiter" icon={<PersonAddIcon />} onClick={() => navigate("/register")} />
					<BottomNavigationAction label="Repo" icon={<GitHubIcon />} onClick={() => open("https://github.com/mdgta/masterschool_capstone_project")} />
				</BottomNavigation>
			)}
		</Box>
	);
}

export default MobileFooter;