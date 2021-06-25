import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import AppProvider from "./hooks/contexts";

import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom/";
import Room from "./pages/Room";
import AdminRoom from "./pages/AdminRoom";

import light from "./styles/themes/light";
import dark from "./styles/themes/dark";

import GlobalStyle from "./styles/global";

const App: React.FC = () => {
	const [theme, setTheme] = useState(() => {
		const storageTheme = localStorage.getItem("Letmeask::Theme");

		if (storageTheme) {
			return storageTheme;
		}

		return "light";
	});

	const handleToggleTheme = () => {
		setTheme((state) => (state === "light" ? "dark" : "light"));
	};

	useEffect(() => {
		localStorage.setItem("Letmeask::Theme", theme);
	}, [theme]);

	return (
		<BrowserRouter>
			<AppProvider>
				<ThemeProvider theme={theme === "dark" ? dark : light}>
					<GlobalStyle />
					<Switch>
						<Route path="/" exact>
							<Home switchTheme={handleToggleTheme} />
						</Route>
						<Route path="/rooms/new">
							<NewRoom switchTheme={handleToggleTheme} />
						</Route>
						<Route path="/rooms/:id">
							<Room switchTheme={handleToggleTheme} />
						</Route>

						<Route path="/admin/rooms/:id">
							<AdminRoom switchTheme={handleToggleTheme} />
						</Route>
					</Switch>
				</ThemeProvider>
			</AppProvider>
		</BrowserRouter>
	);
};

export default App;
