import logo from "../assets/potion_5346325.png";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
	return (
		<div className="header">
			<ul>
				<div className="logo-name">
					<img src={logo} alt="potion icon" />
					<span>The Apothecary</span>
				</div>
				<li>
					<Link to="/">Inventory</Link>
				</li>
				<li>
					<Link to="/branches">Branches</Link>
				</li>
			</ul>
		</div>
	);
};

export default Header;
