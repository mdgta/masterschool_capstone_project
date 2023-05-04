import React from "react";
import {Provider as ReduxProvider} from "react-redux";
import ReactDOM from "react-dom/client";
import {store} from "./app/store";
import App from "./components/App/App.tsx";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ReduxProvider store={store}>
				<App />
			</ReduxProvider>
		</BrowserRouter>
	</React.StrictMode>
);
