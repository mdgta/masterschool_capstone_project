import {ReactNode} from "react";
import Navigation from "../Navigation/Navigation";
import MobileFooter from "../MobileFooter/MobileFooter";
import Footer from "../Footer/Footer";

const ResponsiveLayout = ({children}: {children: ReactNode}) => {
	return (
		<div className="layout-container">
			<Navigation />
			{children}
			<Footer />
			<MobileFooter />
		</div>
	);
}

export default ResponsiveLayout;