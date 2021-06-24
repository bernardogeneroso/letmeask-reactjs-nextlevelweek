import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppProvider from "./hooks/contexts";

import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";
import Room from "./pages/Room";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AppProvider>
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/rooms/new" component={NewRoom} />
					<Route path="/rooms/:id" component={Room} />
				</Switch>
			</AppProvider>
		</BrowserRouter>
	);
};

export default App;
