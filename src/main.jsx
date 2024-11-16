import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import reducer from "./states/States1.jsx";
import reducer2 from "./states/States2.jsx";
import reducer3 from "./states/States3.jsx";
import reducer4 from "./states/States4.jsx";

const store = configureStore({
	reducer: {states: reducer, states2: reducer2, states3: reducer3, states4: reducer4},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
