import Header from "./layout/Header";
import AppRouter from "./routes/Router";
import "./app.css";

function App() {
	return (
		<div className="App">
			<Header />
			<div className="content">
				<AppRouter />
			</div>
		</div>
	);
}

export default App;
