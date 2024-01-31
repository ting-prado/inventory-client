/* eslint-disable react/prop-types */
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./actionCell.css";

const ActionCell = ({ handleModifyProduct, row }) => {
	return (
		<div className="actions">
			<span onClick={() => handleModifyProduct("edit", "product", row)}>
				<FaPencilAlt />
			</span>
			<span onClick={() => handleModifyProduct(undefined, "delete", row)}>
				<RiDeleteBin6Line />
			</span>
		</div>
	);
};

export default ActionCell;
