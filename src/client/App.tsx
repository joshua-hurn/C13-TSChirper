import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NewChirp from "./components/NewChirp";
import AdminOptions from "./components/AdminOptions";

const App: React.FC<AppProps> = (props: AppProps) => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/add" component={NewChirp} />
				<Route exact path="/chirp/:id" component={AdminOptions} />
			</Switch>
		</Router>
	);
};

interface AppProps { }

export default App;