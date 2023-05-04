import {Provider} from "react-redux";
import {store} from "../src/app/store";
import localStorage from "../src/util/localStorage";


const Homepage =() => {
	return (
		<Provider store={store}>
			<div>
				main page
			</div>
		</Provider>
	);
}

export default Homepage;