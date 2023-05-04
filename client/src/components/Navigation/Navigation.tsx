import {AppBar, Box, Toolbar} from "@mui/material";

const Navigation = () => {
	return (
		<Box sx={{flexGrow:1}}>
			<AppBar position="static">
					<Toolbar>
						navbar
					</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Navigation;