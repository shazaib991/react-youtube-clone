import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import reducer from "./states/States1.jsx";

const store = configureStore({reducer: {states: reducer}});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
