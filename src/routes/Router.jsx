import { Route, Routes } from "react-router";
import Branches from "../pages/Branches/Branches";
import Inventory from "../pages/Inventory/Inventory";

const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Inventory />} />
			<Route path="/branches" element={<Branches />} />
		</Routes>
	);
};

export default AppRouter;
