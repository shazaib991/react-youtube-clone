import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import navbarReducer from "./states/NavbarStates.jsx";

const store = configureStore({reducer: {navbar: navbarReducer}});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
