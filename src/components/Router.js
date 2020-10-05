import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import DashboardPage from "./dashboard/DashboardPage";

const Router = () => (

	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={DashboardPage}/>
		</Switch>
	</BrowserRouter>

);
export default Router;